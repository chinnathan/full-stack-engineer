import { Container, Table } from "semantic-ui-react";

type T = Record<string, any>;

export const FindingsTable = (data: T) => {
  function renderRows() {
    return data.findings?.map((e: T) => {
      return (
        <Table.Row key={e.id}>
          <Table.Cell>{e.ruleId}</Table.Cell>
          <Table.Cell>{e.metadata?.description}</Table.Cell>
          <Table.Cell>{e.metadata?.severity}</Table.Cell>
          <Table.Cell>
            {e.location?.path} : line {e.location?.positions?.begin?.line}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  return (
    <Container>
      <Table striped selectable sortable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>RuleId</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Severity</Table.HeaderCell>
            <Table.HeaderCell>Path Name : line number</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{renderRows()}</Table.Body>
      </Table>
    </Container>
  );
};
