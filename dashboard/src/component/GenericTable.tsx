import dayjs from "dayjs";
import _ from "lodash";
import { useState, useEffect } from "react";
import { Container, Divider, Icon, Label, Table } from "semantic-ui-react";
import { callAPINoAuth as callAPI } from "src/utils/rest-api";
import { SSRStatus } from "../constant";
import { FindingsModal } from "./FindingsModal";

import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

type T = Record<string, any>;

export const GenericTable = () => {
  const [itemList, setItemList] = useState<T[]>([]);
  const [item, setItem] = useState<T>({});
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    callAPI("GET", "results")
      .then((res) => {
        setItemList(_.orderBy(res, ["id"], ["desc"]));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleFindings(e: T) {
    setItem(e);
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  function renderRows() {
    return itemList.map((e) => {
      let dt = e.updatedAt;
      if (e.status === SSRStatus.QUEUED) {
        dt = e.queuedAt;
      } else if (e.status === SSRStatus.IN_PROGRESS) {
        dt = e.scanningAt;
      } else if (
        e.status === SSRStatus.SUCCESS ||
        e.status === SSRStatus.FAILURE
      ) {
        dt = e.finishedAt;
      }
      return (
        <Table.Row key={e.id} onClick={() => handleFindings(e)}>
          <Table.Cell>{e.repositoryName}</Table.Cell>
          <Table.Cell>{e.status}</Table.Cell>
          <Table.Cell>
            <Icon name="search" color="grey" />
            {e.findings.map((i: T) => {
              return (
                <Label key={i.ruleId}>
                  {i.ruleId} ({i.metadata?.severity})
                </Label>
              );
            })}
          </Table.Cell>
          <Table.Cell>{dayjs.utc(dt).format("YYYY-MM-DD HH:mm:ss")}</Table.Cell>
        </Table.Row>
      );
    });
  }

  return (
    <Container>
      <Table striped selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Repository Name</Table.HeaderCell>
            <Table.HeaderCell>Scan Status</Table.HeaderCell>
            <Table.HeaderCell>Findings</Table.HeaderCell>
            <Table.HeaderCell>Timestamp</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{renderRows()}</Table.Body>
      </Table>
      <FindingsModal
        data={item}
        showModal={showModal}
        handleClose={handleClose}
      />
      <Divider />
    </Container>
  );
};
