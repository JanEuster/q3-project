import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { NavbarContext } from "./App";

const Nav = styled.nav`
  position: fixed;
  width: 100vw;
  height: fit-content;
  background-color: var(--light-orange);
  display: flex;
  justify-content: space-between;
  ${(props) => (props.side === "bottom" ? "bottom: 0;" : "")}
`;
const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--light-light-grey);
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
const NavDocuments = styled.div`
  display: flex;

  @media (max-width: 600px) {
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
  background-color: var(--light-light-grey);
`;
const SmallDivider = styled.div`
  width: 4px;
  transform: scaleY(0.8);
  background-color: var(--light-light-grey);
`;

const HomeContainer = styled.div`
  padding: 0 1vw;
  background-color: var(--mid-orange);
  @media (max-width: 600px) {
    padding: 0 2vw;
  }
`;
const HomeText = styled.div`
  font-family: Iosevka black;
  font-size: 2rem;
  transform: scale(1.2);
  color: var(--dark-grey);

  @media (max-width: 600px) {
    font-size: 3rem;
  }
`;
const HomeButton = (props) => {
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
`;
const Icon = styled.img`
  height: 2rem;
  aspect-ratio: 1;
  transform: scale(1.5);
  margin: 0 0.3rem;

  @media (max-width: 600px) {
    height: 3rem;
  }
`;
const NavIcon = (props) => {
  return (
    <Link to={props.link}>
      <IconContainer>
        <Icon src={process.env.PUBLIC_URL + props.src} alt=""></Icon>
      </IconContainer>
    </Link>
  );
};

function Navbar(props) {
  return (
    <Nav side={props.side}>
      <NavLeft>
        <HomeButton />
        <BigDivider />
        <NavDocuments>
          <NavbarContext.Consumer>
            {(value) =>
              value.documents.map((doc, i) => {
                let current = false;
                if (doc === value.currentDoc) {
                  current = true;
                }
                return (
                  <NavDoc
                    key={i}
                    current={current}
                    link="/"
                    title={doc.name !== undefined ? doc.name : "Unsaved"}
                    index={i}
                    doc={doc}
                    switchDoc={props.switchDoc}
                  />
                );
              })
            }
          </NavbarContext.Consumer>
        </NavDocuments>
      </NavLeft>
      <NavRight>
        <NavIcon link="/" src={"/assets/icons/ui/settings.svg"} />
      </NavRight>
    </Nav>
  );
}

export default Navbar;
