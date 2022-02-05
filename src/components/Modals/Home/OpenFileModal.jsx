import React from "react";
import {
  ModalBox,
  ModalButtonsLeftRight,
  ModalTextButton,
  ModalTitle,
} from "../BaseModal";

const OpenFileModal = (props) => {
  if (props.isOpen) {
    return (
      <ModalBox>
        <ModalTitle> Open Document </ModalTitle>
        <ModalButtonsLeftRight>
          <ModalTextButton text="Back" side="left" func={props.func} />
          <ModalTextButton text="Open" func={props.appCallback} />
        </ModalButtonsLeftRight>
      </ModalBox>
    );
  } else {
    return <></>;
  }
};

export default OpenFileModal;
