import React, { useState } from "react";
import styled from "styled-components";
import { ModalBox, ModalTextButton, ModalTitle } from "../BaseModal";
import Dropdown from "./components/DropDown";
import { useEffect } from "react";
import HVSelector from "./components/HVSelector";
import DocTypeSelector from "./components/DocTypes";
import { useRef } from "react";

import GLOBALS from "../../../Globals";
import RGBSelector from "./components/RGBSelector";

const TextDiv = styled.div`
  float: left;
  transform: translateY(0.3vw);
  margin-right: 0.2vw;
  font-family: Iosevka heavy;
  font-size: 2vw;
  color: GLOBALS.COLORS.darkgrey;
  user-select: none;
  user-drag: none;
`;

const FilesTypesSelection = (props) => {
  const svgWidth = "18vw";

  return (
    <div>
      <div style={{ display: "grid", width: "100%", justifyItems: "center" }}>
        <DocTypeSelector
          docTypes={GLOBALS.DOC_TYPES}
          setDocType={props.setDocType}
          width={svgWidth}
        />
        <div style={{ position: "relative", width: "60%", gridColumn: 1 }}>
          <TextDiv>Din</TextDiv>
          <Dropdown
            onChange={props.setFormat}
            width="4vw"
            default={GLOBALS.DOC_FORMATS[0]}
            options={GLOBALS.DOC_FORMATS}
            style={{
              float: "right",
            }}
          />

          <HVSelector onChange={props.setOrientation} />
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gridColumn: 2,
            gridRow: 3,
          }}
        >
          <TextDiv>Background</TextDiv>
          <div
            style={{
              // width: "100%",
              // height: "100%",
              backgroundColor: GLOBALS.COLORS.lightgrey,
              // border: ".6vw solid " + GLOBALS.COLORS.darkgrey,
            }}
          >
            <input
              type="color"
              value={props.bgColor}
              style={{
                width: "6vw",
                height: "4vw",
                boxSizing: "border-box",
                backgroundColor: GLOBALS.COLORS.darkgrey,
                // border: ".6vw solid " + GLOBALS.COLORS.darkgrey,
              }}
              onChange={(e) => props.setBG(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [docType, setDocType] = useState(GLOBALS.DOC_TYPES[0]);
  const [format, setFormat] = useState(GLOBALS.DOC_FORMATS[0]);
  const [orientation, setOrientation] = useState(GLOBALS.DOC_ORIENTATIONS[0]);
  const [bgColor, setBG] = useState("#FFFFFF");

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
            setDocType={setDocType}
            setFormat={setFormat}
            setOrientation={setOrientation}
            bgColor={bgColor}
            setBG={setBG}
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
              func={() =>
                props.appCallback(docType, format, orientation, bgColor)
              }
            />
          </ButtonContainerDiv>
        </div>
      </ModalBox>
    );
  } else {
    return <></>;
  }
};

export default NewFileModal;
