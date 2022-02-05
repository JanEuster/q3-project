import React, { useRef } from "react";
import {
  ModalBox,
  ModalEntry,
  ModalTextButton,
  ModalButtonsLeftRight,
  ModalTitle,
} from "../BaseModal";

const SettingsModal = (props) => {
  const documentName = useRef("");

  if (props.isOpen) {
    return (
      <ModalBox>
        <ModalTitle> Document Settings </ModalTitle>
        <ModalEntry ref={documentName} defaultValue={props.currentDoc.name}>
          Document Name
        </ModalEntry>
        <ModalButtonsLeftRight>
          <ModalTextButton
            text="Back"
            side="right"
            func={props.func}
          ></ModalTextButton>
          <ModalTextButton
            text="Save"
            side="left"
            func={() => props.appCallback({ name: documentName.current.value })}
          />
        </ModalButtonsLeftRight>
      </ModalBox>
    );
  } else {
    return <></>;
  }
};

export default SettingsModal;
