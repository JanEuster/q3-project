import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GLOBALS from "./Globals";

const StyledNavBar = styled.nav`
  ${(props) => (props.side === "top" ? "top: 0" : "bottom: 0")};
  position: fixed;
  width: 100%;
  background-color: var(--light-orange);
  color: var(--light-light-grey);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.3vw;
  height: calc(30px + 1vw);
  max-height: 70px;

  @media (max-aspect-ratio: 1 / 1) {
    height: 10vw;
  }
`;

const NavElements = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
`;

const NavElement = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  color: ${GLOBALS.COLORS.lightlightgrey};
  padding: 0 0.5vw;
  margin: auto;
  height: inherit;
  font-size: calc(25px + 0.6vw);

  @media (max-aspect-ratio: 1 / 1) {
    font-size: calc(8vw);
    margin-top: 0vw;
  }
`;

const NavIcon = styled.img`
  height: calc(30px + 1.4vw);
  max-height: 72px;

  // transform: scale(1);
  @media (max-aspect-ratio: 1 / 1) {
    position: absolute;
    top: 0;
    right: 0;
    height: calc(10vw);
  }
`;

const DocsLinkContainer = styled.div`
  display: inherit;
  height: inherit;
  ${(props) => (props.hide ? "transform: scale(0);" : "")}
`;

const HomeH1 = styled.h1`
  position: relative;
  font-family: Iosevka black;
  font-size: calc(35px + 0.6vw);
  font-stretch: condensed;
  margin-right: 3vh;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 110%;
    height: 70%;
    background-color: ${GLOBALS.COLORS.midorange};
    z-index: -1;
    filter: blur(5px);
    border-radius: 15px;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 120%;
    width: 10%;
    height: 100%;
    background-color: ${GLOBALS.COLORS.lightlightgrey};
  }
`;

function NavLink(props) {
  return (
    <NavElement>
      <Link
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
          fontFamily: "inherit",
          fontSize: "inherit",
          color: GLOBALS.COLORS.lightlightgrey,
        }}
        to={props.link}
      >
        {props.title ? props.title : props.children}
      </Link>
    </NavElement>
  );
}

function Navbar(props) {
  const navRef = useRef();
  const [hideDocs, setHideDocs] = useState(false);
  const [documents, setDocuments] = useState([
    "Unsaved",
    "Document1",
    "Document2",
  ]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth / window.innerHeight <= 1) {
        setHideDocs(true);
      } else if (window.innerWidth / window.innerHeight > 1) {
        setHideDocs(false);
      }
    }

    handleResize();
    window.addEventListener("resize", (e) => handleResize());

    return (_) => window.removeEventListener("resize", (e) => handleResize());
  }, []);

  const docs = documents.map((doc) => <NavLink link="/" title={doc} />);

  return (
    <StyledNavBar ref={navRef} side={props.side}>
      <NavElements side="left">
        <NavLink link="/">
          <HomeH1>HOME</HomeH1>
        </NavLink>
        <DocsLinkContainer hide={hideDocs}>{docs}</DocsLinkContainer>
      </NavElements>
      <NavElements>
        <NavLink link="/">
          <NavIcon
            src={process.env.PUBLIC_URL + "/assets/icons/ui/settings.svg"}
            alt=""
          ></NavIcon>
        </NavLink>
      </NavElements>
    </StyledNavBar>
  );
}

export default Navbar;
