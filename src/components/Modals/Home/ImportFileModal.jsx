import React from "react";
import {
  ModalBox,
  ModalButtonsLeftRight,
  ModalTextButton,
  ModalTitle,
} from "../BaseModal";

const ImportFileModal = (props) => {
  if (props.isOpen) {
    return (
      <ModalBox>
        <ModalTitle> Import File </ModalTitle>
        <ModalButtonsLeftRight>
          <ModalTextButton text="Back" side="left" func={props.func} />
          <ModalTextButton text="Import" func={props.appCallback} />
        </ModalButtonsLeftRight>
      </ModalBox>
    );
  } else {
    return <></>;
  }
};

export default ImportFileModal;
