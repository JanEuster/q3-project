import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { saveArtboard } from "./components/Canvas/util/ArtboardFileInteraction";
import GLOBALS from "./Globals";
import SaveFileModal from "./components/Modals/Canvas/SaveFileModal";
import SettingsModal from "./components/Modals/Canvas/SettingsModal";
import ExportModal from "./components/Modals/Canvas/ExportModal";
import exportAsImage from "./components/Canvas/util/Export";

const MOBILE_WIDTH = 800;

const Nav = styled.nav`
  position: fixed;
  width: 100vw;
  height: fit-content;
  background-color: var(--light-orange);
  display: flex;
  justify-content: space-between;
  ${(props) => (props.side === "bottom" ? "bottom: 0;" : "")}
`;
const NavNav = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--light-light-grey);
`;
const NavButton = styled.div`
  color: var(--light-light-grey);
  cursor: pointer;
`;

const NavText = styled.div`
  font-family: Iosevka;
  font-size: 2rem;
  color: var(--light-light-grey);
  margin: 0 1vw;
  transition: transform ease-out 200ms;

  position: relative;

  &::before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0%;
    left: calc(0% - 1vw);
    transform-origin: -50%;
    width: calc(100% + 2vw);
    height: 100%;
    background-color: var(--light-orange);
    transition: transform ease-out 300ms;
  }

  ${(props) =>
    props.current
      ? `  

    &::before {
    background-color: var(--mid-orange);
    }
     
    `
      : ""}
  &::after {
    content: "";
    position: absolute;
    top: 85%;
    left: 0%;
    transform: scaleY(0);
    transform-origin: -50%;
    width: 100%;
    height: 15%;
    background-color: var(--light-light-grey);
    transition: transform ease-out 300ms;
  }

  &:hover {
    transform: translateY(-10%);
  }
  &:hover::after {
    transform: scaleY(1);
  }
`;

const NavLeft = styled.div`
  display: flex;
`;
const NavRight = NavLeft;
const NavDocumentOptionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: var(--light-light-grey);
  padding: 0 0.5vw;
`;
const NavDocuments = styled.div`
  display: flex;

  @media (max-width: ${MOBILE_WIDTH}px) {
    display: none;
  }
`;
const DocContainer = styled.div`
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;
const BigDivider = styled.div`
  width: 1vw;
  max-width: 15px;
  background-color: ${(props) =>
    props.color ? `${props.color}` : "var(--light-light-grey)"};
`;
const SmallDivider = styled.div`
  width: 4px;
  transform: scaleY(0.8);
  background-color: var(--light-light-grey);
`;

const HomeContainer = styled.div`
  padding: 0 1vw;
  background-color: var(--mid-orange);
  @media (max-width: ${MOBILE_WIDTH}px) {
    padding: 0 2vw;
  }
`;
const HomeText = styled.div`
  font-family: Iosevka heavy;
  font-size: 2rem;
  transform: scale(1.2);
  color: var(--dark-grey);

  @media (max-width: ${MOBILE_WIDTH}px) {
    font-size: 3rem;
  }
`;
const HomeLink = (props) => {
  return (
    <NavLink to="/">
      <HomeContainer>
        <HomeText>HOME</HomeText>
      </HomeContainer>
    </NavLink>
  );
};

const NavDoc = (props) => {
  return (
    <>
      {props.index > 0 ? <SmallDivider /> : null}

      <DocContainer onClick={() => props.switchDoc(props.doc)}>
        <NavText current={props.current}>{props.title}</NavText>
      </DocContainer>
    </>
  );
};

const IconContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 2px;
  user-select: none;
`;
const Icon = styled.img`
  height: 1.75rem;
  aspect-ratio: 1;
  transform: scale(1.5);
  margin: 0 0.25rem;

  @media (max-width: 800px) {
    height: 3rem;
  }
`;
const NavIcon = (props) => {
  return (
    <NavButton onClick={props.onClick} style={{ transform: `rotate(${props.rotate ?? 0}deg) scale(${props.scale ?? 0.93})` }}>
      <IconContainer>
        <Icon src={process.env.PUBLIC_URL + props.src} alt=""></Icon>
      </IconContainer>
    </NavButton>
  );
};

const DocumentOptions = (props) => {
  return (
    <NavDocumentOptionsContainer>
      <>
        <NavIcon
          onClick={props.callbacks.closeDoc}
          src={"/assets/icons/ui/close.svg"}
          alt="close"
        />
        <NavIcon
          onClick={() => props.setModalOpen("save")}
          src={"/assets/icons/ui/save.svg"}
          alt="save"
        />
        <NavIcon
          onClick={() => props.setModalOpen("export")}
          src={"/assets/icons/ui/upload.svg"}
          rotate={90}
          alt="export"
        />
        <NavIcon
          onClick={() => { }}
          src={"/assets/icons/ui/redo.svg"}
          alt="redo"
        />
        <NavIcon
          onClick={() => { }}
          src={"/assets/icons/ui/undo.svg"}
          alt="undo"
        />
        <NavIcon
          onClick={() => { }}
          src={"/assets/icons/ui/previous_page.svg"}
          alt="previous page"
        />
        <NavIcon
          onClick={() => { }}
          src={"/assets/icons/ui/next_page.svg"}
          alt="next page"
        />
      </>
    </NavDocumentOptionsContainer>
  );
};

function Navbar(props) {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (props.appState.currentDoc === undefined && isModalOpen !== false) {
      setModalOpen(false);
    }
  }, [props.appState.currentDoc, isModalOpen]);
  return (
    <>
      <SaveFileModal
        isOpen={props.appState.currentDoc && isModalOpen === "save"}
        currentDoc={props.appState.currentDoc}
        appCallback={({ name }) => {
          props.appState.currentDoc.name = name;
          saveArtboard(props.appState.currentDoc);
        }}
        func={() => setModalOpen(false)}
      />
      <SettingsModal
        isOpen={props.appState.currentDoc && isModalOpen === "settings"}
        currentDoc={props.appState.currentDoc}
        appCallback={({ name }) => {
          props.appState.currentDoc.name = name;
          setModalOpen(false);
        }}
        func={() => setModalOpen(false)}
      />
      <ExportModal
        isOpen={props.appState.currentDoc && isModalOpen === "export"}
        currentDoc={props.appState.currentDoc}
        appCallback={(format) => {
          exportAsImage(props.appState.currentDoc, format).then(() => {
            setModalOpen(false);
          })
        }}
        func={() => setModalOpen(false)}
      />
      <Nav side={props.side}>
        <NavNav>
          <NavLeft>
            <HomeLink />
            <BigDivider />
            <NavDocuments>
              {props.appState.documents.map((doc, i) => {
                let current = false;
                if (doc === props.appState.currentDoc) {
                  current = true;
                }
                return (
                  <NavDoc
                    key={i}
                    current={current}
                    link="/"
                    title={doc.name !== undefined ? doc.name : "Untitled"}
                    index={i}
                    doc={doc}
                    switchDoc={props.callbacks.switchDoc}
                  />
                );
              })}
            </NavDocuments>
          </NavLeft>
          <NavRight>
            <NavIcon
              onClick={() => setModalOpen("settings")}
              src={"/assets/icons/ui/settings.svg"}
            />
          </NavRight>
        </NavNav>
        <BigDivider color={GLOBALS.COLORS.darkgrey} />
        {useLocation().pathname !== "/" ? (
          <>
            <DocumentOptions
              currentDoc={props.appState.currentDoc}
              callbacks={props.callbacks}
              setModalOpen={setModalOpen}
            />
            <BigDivider color={GLOBALS.COLORS.darkgrey} />
          </>
        ) : null}
      </Nav>
    </>
  );
}

export default Navbar;
