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

export const NavbarContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDoc: undefined,
      documents: [],
    };

    this.switchDoc = this.switchDocument.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
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
  openDocument(path) {}
  importDocument(path) {}

  switchDocument(doc) {
    this.props.history.push("/new");
    let index = this.state.documents.indexOf(doc);
    this.setState({ currentDoc: this.state.documents[index] });
    this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <NavbarContext.Provider value={this.state}>
            <Route path="/new">
              <Navbar side="bottom" switchDoc={this.switchDoc} />
              <Canvas
                Doc={
                  this.state.currentDoc
                    ? this.state.currentDoc
                    : new noArtboard(GLOBALS.COLORS.CANVAS_BG)
                }
              />
            </Route>

            <Route exact path="/">
              <Navbar side="top" switchDoc={this.switchDoc} />
              <Home
                createCallback={(docType, format, orientation, bgColor) =>
                  this.createDocument(docType, format, orientation, bgColor)
                }
                openCallback={(path) => this.openDocument(path)}
                importCallback={(path) => this.importDocument(path)}
                unsetCurrentDoc={() => this.setState({ currentDoc: undefined })}
              />
            </Route>
          </NavbarContext.Provider>

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
