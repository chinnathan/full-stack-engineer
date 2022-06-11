import dayjs from "dayjs";
import { useState, useEffect, SyntheticEvent, MouseEvent } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  GridColumn,
  GridRow,
  Label,
  TextArea,
} from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import { callAPINoAuth as callAPI } from "src/utils/rest-api";
import "react-toastify/dist/ReactToastify.css";

const template = `{
  "status": "Queued",
  "repositoryName": "Example Repo",
  "findings": [
    {
      "type": "sast",
      "ruleId": "F401",
      "location": {
        "path": "connectors/apigateway.go",
        "positions": {
          "begin": {
            "line": 100
          }
        }
      },
      "metadata": {
        "severity": "HIGH",
        "description": "TLS InsecureSkipVerify set true."
      }
    },
    {
      "type": "sast",
      "ruleId": "F402",
      "location": {
        "path": "util/util.go",
        "positions": {
          "begin": {
            "line": 64
          }
        }
      },
      "metadata": {
        "severity": "LOW",
        "description": "Use of weak random number generator (math/rand instead of crypto/rand)"
      }
    }
  ],
  "queuedAt": "2022-06-21T00:00:00.000Z",
  "scanningAt": "2022-06-21T00:00:00.000Z",
  "finishedAt": "2022-06-21T00:00:00.000Z"
}`;

type T = Record<string, any>;

export const FormContainer = () => {
  const [jsonText, setJsonText] = useState<string>("");

  useEffect(() => {
    setJsonText(template);
  }, []);

  function handleChange(event: SyntheticEvent, data: T) {
    setJsonText(data.value);
  }

  function handleLoadTemplate() {
    setJsonText(template);
  }

  function validateSchema() {
    //TO-DO: check and validate json schema
    //check and iterate through jsonText (If I had time, will do it later)
    // toast.error(`Security Scan Result schema is invalid! Correct it and try again.`);
    return true;
  }

  function handleAdd() {
    if (!validateSchema()) {
      return;
    }

    callAPI("POST", "results", {}, JSON.parse(jsonText))
      .then((res) => {
        console.log("result", res);
        const json = JSON.parse(jsonText);
        const status = json?.status;
        toast.success(
          `Security Scan Result has been added successfully. 🧭 Status: (${status})`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <Label>Queued</Label>
      <Label>In Progress</Label>
      <Label>Success</Label>
      <Label>Failure</Label>
      <span style={{ paddingLeft: "4px" }}></span>
      are valid string for attribute "status" (No validation on frontend so far)
      <span style={{ paddingLeft: "12px" }}></span>
      <br></br>
      Hint: "findings" attribute, it can be pushed/inserted with one or multiple
      elements/members.
      <Divider />
      <Form>
        <TextArea
          rows={30}
          placeholder="Modify the value on this JSON template and then perform adding."
          value={jsonText}
          onChange={(event: SyntheticEvent, data: any) =>
            handleChange(event, data)
          }
        />
      </Form>
      <Divider />
      <Grid container>
        <GridRow>
          <GridColumn computer={5}>
            <Button
              onClick={(e: MouseEvent<HTMLElement>) => handleLoadTemplate()}
            >
              Load Template
            </Button>
            (Reset to Default)
          </GridColumn>
          <GridColumn computer={6} textAlign="center" verticalAlign="middle">
            Current Timestamp: {dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")}
          </GridColumn>
          <GridColumn computer={5} textAlign="right">
            (New Result)
            <span style={{ paddingLeft: "6px" }}></span>
            <Button onClick={(e: MouseEvent<HTMLElement>) => handleAdd()}>
              <span style={{ paddingLeft: "20px" }} />
              ADD
              <span style={{ paddingLeft: "20px" }} />
            </Button>
          </GridColumn>
        </GridRow>
      </Grid>
      <ToastContainer closeOnClick={false} />
    </Container>
  );
};
