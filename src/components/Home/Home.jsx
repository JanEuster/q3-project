import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NewFileModal from "../Modals/Home/NewFileModal";
import ImportFileModal from "../Modals/Home/ImportFileModal";
import OpenFileModal from "../Modals/Home/OpenFileModal";

import appLogo from "../../logo.svg";
import "./Home.css";

const Blurred = styled.div`
  filter: blur(${(props) => (props.blur === "true" ? "20" : "0")}px);
  transition: filter ease-in 50ms;
`;

function Home(props) {
  const [isModalOpen, setModalOoen] = useState(false);

  // const prevOpenFiles = [];
  const prevOpenFiles = [
    "11111.???",
    "2222222.???",
    "33333333.???",
    "4444.???",
    "55555.???",
  ];
  var belowContent;
  if (prevOpenFiles && prevOpenFiles.length > 0) {
    let smallButtons = [];
    prevOpenFiles.map((f, i) => {
      smallButtons.push(<SmallButton key={i} title={f} link="/" />);
    });
    belowContent = (
      <>
        <div className="small-buttons">{smallButtons}</div> <NewUserWelcome />{" "}
      </>
    );
  } else {
    belowContent = <NewUserWelcome />;
  }

  useEffect(() => {
    props.unsetCurrentDoc();
  }, []);

  return (
    <>
      <NewFileModal
        isOpen={isModalOpen === "new"}
        redirect="new"
        appCallback={props.createCallback}
        func={() => {
          setModalOoen(false);
        }}
      />
      <OpenFileModal
        isOpen={isModalOpen === "open"}
        redirect=""
        appCallback={props.openCallback}
        func={() => {
          setModalOoen(false);
        }}
      />
      <ImportFileModal
        isOpen={isModalOpen === "import"}
        redirect=""
        appCallback={props.importCallback}
        func={() => {
          setModalOoen(false);
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
                setModalOoen("new");
              }}
            />
            <MainButton
              title="Open"
              subtitle="fileformat"
              src={process.env.PUBLIC_URL + "/assets/icons/ui/open_file.svg"}
              svgScale={1.3}
              svgTranslate={-20}
              onClick={() => {
                setModalOoen("open");
              }}
            />
            <MainButton
              title="Import"
              subtitle="pdf png jgp flipchart"
              src={process.env.PUBLIC_URL + "/assets/icons/ui/import_file.svg"}
              svgTranslate={-13}
              onClick={() => {
                setModalOoen("import");
              }}
            />
          </div>
          {belowContent}
        </div>

        <footer></footer>
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

const NewUserWelcome = (props) => {
  return (
    <div className="user-welcome">
      <img src={appLogo} alt="logo" />
      <div className="description" style={{}}>
        <h1>Welcome to Expanded Board</h1>
        <br />
        <h3>You haven't opened any Documents yet</h3>
        <hr style={{ width: "100%" }} />
        <h4>
          You can create, open or import a Document and access previous ones on
          this page
        </h4>
      </div>
    </div>
  );
};

export default Home;
