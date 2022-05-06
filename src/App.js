import { ReactComponent as LogoSVG } from "./logo.svg";
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
import { ImportToArtboard } from "./components/Canvas/util/Import";
import Clipboard from "./components/Canvas/Clipboard";

export const NavbarContext = React.createContext();

const CLIPBOARD = new Clipboard();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDoc: undefined, // currently opened document of type Artboard or undefined, where undefined means being on the home page
      documents: [], // all currently opened documents
      clipboard: CLIPBOARD, // global clipboard object over all documents
    };

    this.switchDoc = this.switchDocument.bind(this);
    this.closeCurrentDoc = this.closeCurrentDocument.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentDoc !== prevState.currentDoc) {
    }
  }

  createDocument(docType, format, orientation, bgColor) {
    // create document/artboard based on these settings entered by the user:
    //    - document type("regular" width*height, endless-scroll, endless)
    //    - format(A4,A3,...,TODO: add different standards and custom pixel size canvas opetion)
    //    - orientation(horizontal or vertical)
    //    - background color
    //  => only "regular" artboards require format and orientation
    //  => while endless-scroll could potentially change orientation/direction of scroll, this is not currently implemented
    if (docType === "regular") {
      var width, height;
      var newDoc;

      GLOBALS.DOC_FORMATS.forEach((FORMAT, i) => {
        // each format has its pixel resolution based on 300ppi density
        if (format === FORMAT) {
          width = FORMAT.width;
          height = FORMAT.height;
          if (orientation === "horizontal") {
            width = FORMAT.height;
            height = FORMAT.width;
          }
        }
      });

      newDoc = new Artboard(width, height, bgColor, this.state.clipboard);

      // both infinite-scroll and infinite type documents have predefined resolutions currently
      // TODO: add size param for infinite doc types
    } else if (docType === "infinite-scroll") {
      newDoc = new infiniteScrollArtboard(GLOBALS.INFINITE_WIDTH, bgColor, this.state.clipboard);
    } else if (docType === "infinite") {
      newDoc = new infiniteArtboard(GLOBALS.INFINITE_WIDTH, bgColor, this.state.clipboard);
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
    // open document from expanded-board project file (currently *.board)
    loadArtboard().then((doc) => {
      this.setState({ currentDoc: doc });
      this.setState({ documents: [...this.state.documents, doc] });
      this.props.history.push("/new");
    });
  }
  async importDocument() {
    // create new artboard based on some file
    // currently only supports images
    ImportToArtboard().then(doc => {
      this.setState({ currentDoc: doc });
      this.setState({ documents: [...this.state.documents, doc] });
      this.props.history.push("/new");
    });
  }

  switchDocument(doc) {
    let index = this.state.documents.indexOf(doc);
    // set documents clipboard on document switch 
    // TODO: would storing the clipboard state within the app be more effective 
    //       or are there any conditions to set clipboard 
    if (this.state.currentDoc && this.state.currentDoc.clipboard) {
      this.state.documents[index].setClipboard(this.state.currentDoc.getClipboard());
    }

    this.props.history.push("/new");
    this.setState({ currentDoc: this.state.documents[index] });
  }
  closeCurrentDocument() {
    // change currently opened document to undefined if no other document is opened or to the next opened document
    let index = this.state.documents.indexOf(this.state.currentDoc);
    let documents = [
      ...this.state.documents.slice(0, index),
      ...this.state.documents.slice(index + 1),
    ];
    this.setState({ documents: documents });

    if (documents.length > 0) {
      this.setState({ currentDoc: documents[documents.length - 1] });
    } else {
      this.setState({ currentDoc: undefined });
      this.props.history.push("/");
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
                <LogoSVG style={{ height: "20vmin", marginTop: "5vh" }} />
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
export { CLIPBOARD };
