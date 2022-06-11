import { MouseEvent } from "react";
import { Button, Label, Modal } from "semantic-ui-react";
import { FindingsTable } from "./FindingsTable";

type T = Record<string, any>;
type Props = {
  data: T;
  showModal: boolean;
  handleClose: () => void;
};

export const FindingsModal = (props: Props) => {
  return (
    <Modal
      closeIcon
      size="large"
      onClose={(e: MouseEvent<HTMLElement>) => props.handleClose()}
      open={props.showModal}
    >
      <Modal.Header>
        <span
          style={{ paddingRight: "10px", fontSize: "0.8em", color: "#5d9972" }}
        >
          Findings Detail
        </span>
        <Label>{props.data.repositoryName}</Label>
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description></Modal.Description>
        <FindingsTable {...props.data} />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={(e: MouseEvent<HTMLElement>) => props.handleClose()}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
};
