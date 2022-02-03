import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { withRouter, Route, Link, Switch } from "react-router-dom";
import Navbar from "./Navbar.js";
import Canvas from "./components/Canvas/Canvas.jsx";
import Home from "./components/Home/Home";
import Artboard, {
  infiniteArtboard,
  infiniteScrollArtboard,
  noArtboard,
} from "./components/Canvas/Artboard";
import GLOBALS from "./Globals";
import { loadArtboard } from "./components/Canvas/util/ArtboardFileInteraction";

export const NavbarContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDoc: undefined,
      documents: [],
    };

    this.switchDoc = this.switchDocument.bind(this);
    this.closeCurrentDoc = this.closeCurrentDocument.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.currentDoc);
    console.log(this.state.documents);
    if (this.state.currentDoc !== prevState.currentDoc) {
    }
  }

  createDocument(docType, format, orientation, bgColor) {
    if (docType === "regular") {
      var width, height;
      var newDoc;

      GLOBALS.DOC_FORMATS.map((FORMAT, i) => {
        if (format === FORMAT) {
          width = FORMAT.width;
          height = FORMAT.height;
          if (orientation === "horizontal") {
            width = FORMAT.height;
            height = FORMAT.width;
          }
        }
      });

      newDoc = new Artboard(width, height, bgColor);
    } else if (docType === "infinite-scroll") {
      newDoc = new infiniteScrollArtboard(GLOBALS.INFINITE_WIDTH, bgColor);
    } else if (docType === "infinite") {
      newDoc = new infiniteArtboard(GLOBALS.INFINITE_WIDTH, bgColor);
    }

    this.setState({
      currentDoc: newDoc,
    });
    this.setState({
      documents: [...this.state.documents, newDoc],
    });

    this.props.history.push("/new");
  }
  async openDocument(path) {
    loadArtboard().then((doc) => {
      this.setState({ currentDoc: doc });
      this.setState({ documents: [...this.state.documents, doc] });
      this.props.history.push("/new");
    });
  }
  importDocument(path) {}

  switchDocument(doc) {
    this.props.history.push("/new");
    let index = this.state.documents.indexOf(doc);
    this.setState({ currentDoc: this.state.documents[index] });
    this.forceUpdate();
  }
  closeCurrentDocument() {
    let index = this.state.documents.indexOf(this.state.currentDoc);
    let documents = [
      ...this.state.documents.slice(0, index),
      ...this.state.documents.slice(index + 1),
    ];
    this.setState({ documents: documents });

    if (documents.length > 0) {
      this.setState({ currentDoc: documents[document.length - 1] });
    } else {
      this.setState({ currentDoc: undefined });
      this.props.history.push("/");
      this.forceUpdate();
    }
  }

  render() {
    var navCallbacks = {
      switchDoc: this.switchDoc,
      closeDoc: this.closeCurrentDoc,
    };
    return (
      <div className="App">
        <Switch>
          <Route path="/new">
            <Navbar
              side="bottom"
              appState={this.state}
              callbacks={navCallbacks}
            />
            <Canvas
              Doc={
                this.state.currentDoc
                  ? this.state.currentDoc
                  : new noArtboard(GLOBALS.COLORS.CANVAS_BG)
              }
            />
          </Route>

          <Route exact path="/">
            <Navbar side="top" appState={this.state} callbacks={navCallbacks} />
            <Home
              createCallback={(docType, format, orientation, bgColor) =>
                this.createDocument(docType, format, orientation, bgColor)
              }
              openCallback={(path) => this.openDocument(path)}
              importCallback={(path) => this.importDocument(path)}
              unsetCurrentDoc={() => this.setState({ currentDoc: undefined })}
            />
          </Route>

          <Route
            render={() => (
              <h1>
                {" "}
                404 Error: Page not Found <br /> Go <Link to="/"> Home </Link>
              </h1>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
