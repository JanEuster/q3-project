import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GLOBALS from "../../Globals";

const ModalBox = styled.div`
  position: fixed;
  display: block;
  z-index: 1000;
  background-color: ${GLOBALS.COLORS.lightgrey};
  outline-style: solid;
  outline-color: ${GLOBALS.COLORS.darkgrey};
  outline-width: 1.2vh;
  width: 70vw;
  heigh: 50vh;
  min-width: 75vw;
  max-width: 95vw;
  max-height: 95vh;
  aspect-ratio: 2;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  @media (max-aspect-ratio: 4/3) {
    aspect-ratio: 1/2;
  }
`;
const ModalTitle = styled.div`
  font-family: Iosevka Extended Heavy;
  font-size: calc(12px + ${({ size }) => size || 4}vh);
  color: ${GLOBALS.COLORS.darkgrey};
  margin-top: 3vh;
  user-select: none;
`;

const ModalTextButtonStyle = styled.button`
  // ${({ side }) => (side == "right" ? `left: 40%;` : `left: 5%;`)};
  // top: 100px;
  background-color: ${GLOBALS.COLORS.grey};
  color: ${GLOBALS.COLORS.darkgrey};
  font-size: 1vh;
  border: 4px solid ${GLOBALS.COLORS.darkgrey};
  aspect-ratio: 2;
  font-family: Iosevka bold;
  font-size: calc(12px + 1.5vw);
  height: calc((12px + 1.5vw) * 1.6);
  user-select: none;

  &:hover {
    cursor: pointer;
    border: 4px solid ${GLOBALS.COLORS.lightorange};
  }
  &:focus {
    border: 4px solid ${GLOBALS.COLORS.lightorange};
  }
`;

const ModalTextButton = (props) => {
  if (props.redirect && !props.func) {
    return (
      <div style={props.style}>
        <ModalTextButtonStyle side={props.side}>
          <Link
            to={props.redirect}
            style={{ margin: "0.2vw", fontFamily: "inherit", color: "inherit" }}
            onClick={() => {}}
          >
            {props.text}
          </Link>
        </ModalTextButtonStyle>
      </div>
    );
  } else if (!props.redirect && props.func) {
    return (
      <div style={props.style}>
        <ModalTextButtonStyle side={props.side}>
          <div
            style={{ margin: "0.2vw", fontFamily: "inherit", color: "inherit" }}
            onClick={() => props.func()}
          >
            {props.text}
          </div>
        </ModalTextButtonStyle>
      </div>
    );
  } else {
    return (
      <div>
        <ModalTextButtonStyle side={props.side}>
          <div
            style={{ margin: "0.2vw", fontFamily: "inherit", color: "inherit" }}
            onClick={() => {}}
          >
            {props.text}
          </div>
        </ModalTextButtonStyle>
      </div>
    );
  }
};

const BaseModal = (props) => {
  if (props.isOpen === "true") {
    return (
      <ModalBox>
        <ModalTextButton text="Back" side="left" func={props.func} />
      </ModalBox>
    );
  } else {
    return <></>;
  }
};

export default BaseModal;
export { ModalBox, ModalTextButton, ModalTitle, ModalTextButtonStyle };
