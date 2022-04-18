import React, { useRef } from "react";
import {
  ModalBox,
  ModalEntry,
  ModalTextButton,
  ModalButtonsLeftRight,
  ModalTitle,
} from "../BaseModal";

const ExportModal = (props) => {
  const documentName = useRef("");

  if (props.isOpen) {
    return (
      <ModalBox>
        <ModalTitle> Export Document </ModalTitle>
        <ModalButtonsLeftRight>
          <ModalTextButton
            text="Back"
            side="right"
            func={props.func}
          ></ModalTextButton>
          <ModalTextButton
            text="Export"
            side="left"
            func={() => props.appCallback()}
          />
        </ModalButtonsLeftRight>
      </ModalBox>
    );
  } else {
    return <></>;
  }
};

export default ExportModal;
