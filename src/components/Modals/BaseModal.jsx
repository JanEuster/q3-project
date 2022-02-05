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
const ModalText = styled.div`
  font-family: Iosevka semibold;
  font-size: calc(9px + ${({ size }) => size || 3}vh);
  color: ${GLOBALS.COLORS.darkgrey};
  user-select: none;
  margin: 0.8rem 2rem;
`;

const ModalButtonsLeftRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1vw 2vw;
`;

const ModalTextButtonStyle = styled.button`
  background-color: ${GLOBALS.COLORS.grey};
  color: ${GLOBALS.COLORS.darkgrey};
  font-size: 1vh;
  border: 4px solid ${GLOBALS.COLORS.darkgrey};
  aspect-ratio: 2.4;
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

const StyledInput = styled.input`
  border: 4px solid ${GLOBALS.COLORS.darkgrey};
  border-radius: 0;
  height: 4vw;
  font-family: Iosevka semibold;
  font-size: 2vw;
  padding: 0.2rem;
  background-color: ${GLOBALS.COLORS.lightlightgrey};
`;
const EntryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalEntry = React.forwardRef((props, ref) => {
  return (
    <EntryContainer>
      <ModalText>{props.children}</ModalText>
      <StyledInput ref={ref} defaultValue={props.defaultValue} />
    </EntryContainer>
  );
});

const ModalTextButton = (props) => {
  if (props.redirect && !props.func) {
    return (
      <ModalTextButtonStyle side={props.side}>
        <Link
          to={props.redirect}
          style={{ margin: "0.2vw", fontFamily: "inherit", color: "inherit" }}
          onClick={() => {}}
        >
          {props.text}
        </Link>
      </ModalTextButtonStyle>
    );
  } else if (!props.redirect && props.func) {
    return (
      <ModalTextButtonStyle side={props.side}>
        <div
          style={{ margin: "0.2vw", fontFamily: "inherit", color: "inherit" }}
          onClick={() => props.func()}
        >
          {props.text}
        </div>
      </ModalTextButtonStyle>
    );
  } else {
    return (
      <ModalTextButtonStyle side={props.side}>
        <div
          style={{ margin: "0.2vw", fontFamily: "inherit", color: "inherit" }}
          onClick={() => {}}
        >
          {props.text}
        </div>
      </ModalTextButtonStyle>
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
export {
  ModalBox,
  ModalTextButton,
  ModalTitle,
  ModalTextButtonStyle,
  ModalEntry,
  ModalButtonsLeftRight,
};
