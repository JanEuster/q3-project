import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NewFileModal from "../Modals/Home/NewFileModal";
import ImportFileModal from "../Modals/Home/ImportFileModal";
import OpenFileModal from "../Modals/Home/OpenFileModal";
import { ReactComponent as LogoSVG } from "../../logo.svg";
import "./Home.css";

import GitInfo from "react-git-info/macro";
const gitInfo = GitInfo();



const Blurred = styled.div`
  filter: blur(${(props) => (props.blur !== false ? "20" : "0")}px);
  transition: filter ease-in 50ms;
`;

function Home(props) {
  const [isModalOpen, setModalOpen] = useState(false);

  // const prevOpenFiles = [];
  const prevOpenFiles = [
    // "11111.???",
    // "2222222.???",
    // "33333333.???",
    // "4444.???",
    // "55555.???",
  ];
  var belowContent;
  if (prevOpenFiles && prevOpenFiles.length > 0) {
    let smallButtons = [];
    prevOpenFiles.forEach((f, i) => {
      smallButtons.push(<SmallButton key={i} title={f} link="/" />);
    });
    belowContent = (
      <>
        <div className="small-buttons">{smallButtons}</div>
      </>
    );
  } else {
    belowContent = <NewUserWelcome />;
  }

  useEffect(() => {
    props.unsetCurrentDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NewFileModal
        isOpen={isModalOpen === "new"}
        redirect="new"
        appCallback={props.createCallback}
        func={() => {
          setModalOpen(false);
        }}
      />
      <OpenFileModal
        isOpen={isModalOpen === "open"}
        redirect=""
        appCallback={props.openCallback}
        func={() => {
          setModalOpen(false);
        }}
      />
      <ImportFileModal
        isOpen={isModalOpen === "import"}
        redirect=""
        appCallback={props.importCallback}
        func={() => {
          setModalOpen(false);
        }}
      />
      <Blurred blur={isModalOpen}>
        <div className="home">
          <div className="main-buttons">
            <MainButton
              title="New Document"
              subtitle="fileformat"
              svgTranslate={-13}
              src={process.env.PUBLIC_URL + "/assets/icons/ui/new_file.svg"}
              onClick={() => {
                setModalOpen("new");
              }}
            />
            <MainButton
              title="Open"
              subtitle="fileformat"
              src={process.env.PUBLIC_URL + "/assets/icons/ui/open_file.svg"}
              svgScale={1.3}
              svgTranslate={-20}
              onClick={() => {
                setModalOpen("open");
              }}
            />
            <MainButton
              title="Import"
              subtitle="pdf png jgp flipchart"
              src={process.env.PUBLIC_URL + "/assets/icons/ui/import_file.svg"}
              svgTranslate={-13}
              onClick={() => {
                setModalOpen("import");
              }}
            />
          </div>
          {belowContent}
          <Contact />
        </div>

        <footer style={{ background: "#393939" }}>
          <div style={{ display: "inline-block", background: "#f3aa59" }}>
            <pre style={{ textDecoration: "underline black", textUnderlineOffset: "2px" }}>  expanded-board v0.2.0  </pre>
            <pre style={{ textDecoration: "underline black", textUnderlineOffset: "3px", textDecorationStyle: "dashed", marginBottom: "2px" }}>{gitInfo.branch} -- {gitInfo.commit.shortHash}</pre>
            <pre style={{ fontSize: "0.8rem" }}>{gitInfo.commit.date}</pre>
          </div>
        </footer>
      </Blurred>
    </>
  );
}

const MainButton = (props) => {
  const translate = props.svgTranslate ? props.svgTranslate : -20;
  const scale = props.svgScale ? props.svgScale * 100 : 100;

  return (
    <div className="main-file-button" onClick={props.onClick}>
      <div className="main-file-button-top">
        <img
          src={props.src}
          style={{
            height: `${scale}%`,
            transform: `translateY(${translate}%)`,
          }}
          alt=""
        />
        <h1> {props.title} </h1>
      </div>
      <div className="main-file-button-bottom">
        <h3> {props.subtitle} </h3>
      </div>
    </div>
  );
};

const SmallButtonPreview = (props) => {
  return (
    <div className="small-file-button-top">
      <div>
        <img src={props.src} alt="" />
      </div>
    </div>
  );
};

const SmallButton = (props) => {
  return (
    <Link to={props.link} className="small-file-button">
      <SmallButtonPreview src={props.previewSrc} />
      <div className="small-file-button-bottom">
        <h3> {props.title} </h3>
      </div>
    </Link>
  );
};

const Contact = (props) => {
  return (
    <div style={{ backgroundColor: "var(--light-grey)", margin: "10px", padding: "7px" }}>
      <h3 style={{ fontFamily: "Iosevka extended heavy" }}>Contact / Source Code</h3>
      <div style={{ display: "flex", textAlign: "left", justifyContent: "center", padding: "10px" }}>
        <div style={{ margin: "0 0.5rem" }}>
          <h5>Jan Eusterschulte</h5>
          <h5>Lennart Brunn</h5>
          <h5>Friedrich Maagk</h5>
        </div>
        <div style={{ margin: "0 0.5rem" }}>
          <h5>Email: <a href="mailto:jan.eusterschulte@rhgy.de">jan.eusterschulte@rhgy.de</a></h5>
          <h5>Email: <a href="mailto:lennart.brunn@rhgy.de">lennart.brunn@rhgy.de</a></h5>
          <h5>Email: <a href="mailto:friedrich.maagk@rhgy.de">friedrich.maagk@rhgy.de</a></h5>
        </div>
        <div style={{ margin: "0 0.5rem" }}>
          <h5>Github: <a target="_blank" href="http://github.com/janeuster" rel="noreferrer">JanEuster</a></h5>
          <h5>Github: <a target="_blank" href="http://github.com/Knixxx" rel="noreferrer">Knixxx</a></h5>
          <h5>Github: <a target="_blank" href="http://github.com/friedrichmaagk" rel="noreferrer">friedrichmaagk</a></h5>
        </div>
      </div>
      <div>
        <h4><a target="_blank" href="http://github.com/janeuster/q3-project" rel="noreferrer">Github Repository</a></h4>
      </div>
    </div>

  )
}
const NewUserWelcome = (props) => {
  return (
    <>
      <div className="user-welcome">
        <LogoSVG
          style={{ width: "25%", minWidth: "100px", userSelect: "none" }}
          alt="logo"
        />
        <div className="description" style={{}}>
          <h1>Welcome to Expanded Board</h1>
          <br />
          <h3>You haven't opened any Documents yet</h3>
          <hr style={{ width: "100%", height: "3px", backgroundColor: "black" }} />
          <h4>
            You can create, open or import a Document and access previous ones on
            this page
          </h4>
        </div>

      </div>
    </>
  );
};

export default Home;
