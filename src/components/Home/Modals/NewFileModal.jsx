import React, {useState} from 'react'
import styled from 'styled-components';
import { ModalBox, ModalTextButton, ModalTitle } from './BaseModal'
import Dropdown from './components/DropDown';
import { useEffect } from 'react';
import HVSelector from './components/HVSelector';
import DocTypeSelector from './components/DocTypes';
import { useRef } from 'react';

const colors = require('../../colors.json')


const FilesTypesSelection = (props) => {
  const docType = props.docType;
  const formats = props.formats;
  const orientation = props.orientation;
  const svgWidth = "18vw";

  
  return (
    <div>
      <div style={{ display: "grid", width: "100%", justifyItems: "center" }}>
        <DocTypeSelector
          docTypes={props.docTypes}
          setDocType={props.setDocType}
          width={svgWidth}
        />
        <div style={{ position: "relative", width: "60%", gridColumn: 1 }}>
          <div
            style={{
              float: "left",
              transform: "translateY(.3vw)",
              marginRight: "0.2vw",
              fontFamily: "Iosevka heavy",
              fontSize: "2vw",
              color: colors.darkgrey,
              userSelect: "none",
              userDrag: "none",
            }}
          >
            Din
          </div>
          <Dropdown
            onChange={props.setFormat}
            width="4vw"
            default={formats[0]}
            options={formats}
            style={{
              float: "right",
            }}
          />

          <HVSelector onChange={ props.setOrientation }/>
        </div>
      </div>
    </div>
  );
}

const ButtonContainerDiv = styled.div`
  display: inline-block;
  position: relative;
  bottom: 0;
  width: 100%;
  height: auto;
  margin-top: 2vh;
  margin-bottom: 1vh;
`;

const NewFileModal = (props) => {
  const docTypes = ["regular", "infinite-scroll", "infinite"]
  const formats = ["A4", "A3", "A2", "A1"]
  const orientations = ["vertical", "horizontal"]
  const [docType, setDocType] = useState(docTypes[0])
  const [format, setFormat] = useState(formats[0])
  const [orientation, setOrientation] = useState(orientations[0]);

  
  if (props.isOpen === "true") {
      return (
        <ModalBox style={{ overflowY: "scroll" }}>
          <ModalTitle> Create New Document </ModalTitle>

          <div
            style={{
              height: "83%",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "space-between",
            }}
          >
            <FilesTypesSelection
              docTypes={docTypes}
              formats={formats}
              orientations={orientations}
              setDocType={setDocType}
              setFormat={setFormat}
              setOrientation={setOrientation}
              modalRef
            />
            <ButtonContainerDiv>
              <ModalTextButton
                style={{ float: "left", transform: "translate(1.5vw)" }}
                text="Back"
                side="left"
                func={props.func}
              />
              <ModalTextButton
                style={{ float: "right", transform: "translate(-2vw)" }}
                text="Create"
                side="right"
                redirect={props.redirect}
              />
            </ButtonContainerDiv>
          </div>
        </ModalBox>
      );
  }
  else {
      return ( <></> )
  }
}


export default NewFileModal;