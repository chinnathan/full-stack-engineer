import { MouseEvent, useState } from "react";
import { Container, Grid, Icon, Label, Menu } from "semantic-ui-react";
import { GenericTable } from "./component/GenericTable";
import { FormContainer } from "./component/FormContainer";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

type Props = Record<string, any>;

export const App = (props: Props) => {
  const [activeItem, setActiveItem] = useState<string>("additem");

  function handleItemClick(name: string) {
    setActiveItem(name);
  }

  return (
    <Container>
      <Grid container columns={16}>
        <Grid.Row>
          <Grid.Column computer={1}>
            <img
              src="/asset/image/logo.svg"
              alt="logo"
              width={64}
              height={64}
            />
          </Grid.Column>
          <Grid.Column computer={15} verticalAlign="middle">
            <Label>GUARDRAILS</Label>
            <span style={{ paddingLeft: "20px", color: "#5d9972" }}>
              ({props.title})
            </span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={16}>
            <Menu stackable>
              <Menu.Item>
                <Icon
                  name="user secret"
                  size="large"
                  color="grey"
                  circular
                ></Icon>
              </Menu.Item>

              <Menu.Item
                name="additem"
                active={activeItem === "additem"}
                onClick={(e: MouseEvent<HTMLElement>) => handleItemClick("additem")}
              >
                <span
                  style={{
                    fontSize: "1.4em",
                    color: "#666",
                  }}
                >
                  Add
                </span>
                <span
                  style={{
                    paddingLeft: "10px",
                    color: "#aaa",
                  }}
                >
                  <Icon name="plus" size="large"></Icon>
                </span>
              </Menu.Item>

              <Menu.Item
                name="listitem"
                active={activeItem === "listitem"}
                onClick={(e: MouseEvent<HTMLElement>) => handleItemClick("listitem")}
              >
                <span
                  style={{
                    fontSize: "1.4em",
                    color: "#666",
                  }}
                >
                  List
                </span>
                <span
                  style={{
                    paddingLeft: "10px",
                    color: "#aaa",
                  }}
                >
                  <Icon name="list ul" size="large"></Icon>
                </span>
              </Menu.Item>

              <Menu.Item
                name="info"
                active={activeItem === "info"}
                onClick={(e: MouseEvent<HTMLElement>) => handleItemClick("info")}
              >
                <span
                  style={{
                    fontSize: "1.3em",
                    color: "#666",
                  }}
                >
                  More
                </span>
                <span
                  style={{
                    paddingLeft: "4px",
                    color: "#aaa",
                  }}
                >
                  <Icon name="info" size="small" circular></Icon>
                </span>
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={16}>
            {activeItem === "additem" && <FormContainer />}
            {activeItem === "listitem" && <GenericTable />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default App;
