import React, { useState, useEffect } from "react";
import GLOBALS from "../../../Globals";
import {
  ModalBox,
  ModalEntry,
  ModalTextButton,
  ModalButtonsLeftRight,
  ModalTitle,
  ModalRowContainer,
  ModalText,
} from "../BaseModal";
import Dropdown from "../components/DropDown";


const ExportModal = (props) => {
  const [format, setFormat] = useState(GLOBALS.EXPORT_FORMATS[0])

  useEffect(() => console.log(format), [format])
  if (props.isOpen) {
    return (
      <ModalBox>
        <ModalTitle> Export Document </ModalTitle>
        <ModalRowContainer>
          <ModalText>Format</ModalText>
          <Dropdown width="15vw" height="4vw" onChange={(opt) => setFormat(opt)} default={format} options={GLOBALS.EXPORT_FORMATS} />
        </ModalRowContainer>
        <ModalButtonsLeftRight>
          <ModalTextButton
            text="Back"
            side="right"
            func={props.func}
          ></ModalTextButton>
          <ModalTextButton
            text="Export"
            side="left"
            func={() => props.appCallback(format)}
          />
        </ModalButtonsLeftRight>
      </ModalBox>
    );
  } else {
    return <></>;
  }
};

export default ExportModal;
