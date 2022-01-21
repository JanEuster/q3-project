import logo from "./logo.svg";
import "./App.css";
import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  withRouter,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import Navbar from "./Navbar.js";
import Canvas from "./components/Canvas/Canvas.jsx";
import Home from "./components/Home/Home";
import Artboard, { infiniteScrollArtboard } from "./components/Canvas/Artboard";
import GLOBALS from "./Globals";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDoc: undefined,
      documents: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentDoc !== prevState.currentDoc) {
    }
  }

  createDocument(docType, format, orientation, bgColor) {
    if (docType === "regular") {
      var width, height;

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

      this.setState({ currentDoc: new Artboard(width, height, bgColor) });

    } else if (docType === "infinite-scroll") {
      this.setState({ currentDoc: new infiniteScrollArtboard(2000, bgColor) });
    } else if (docType === "infinite") {
      this.setState({ currentDoc: new infiniteScrollArtboard(2000, bgColor) });
    }

    this.setState({
      documents: [...this.state.documents, this.state.currentDoc],
    });

    this.props.history.push("/new", { state: this.state.currentDoc });
  }
  openDocument(path) {}
  importDocument(path) {}

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/new">
            <Navbar side="nav-bottom" />
            <Canvas Doc={this.state.currentDoc} />
          </Route>

          <Route exact path="/">
            {" "}
            // "/" path Route always last
            <Navbar side="nav-top" />
            <Home
              createCallback={(docType, format, orientation, bgColor) =>
                this.createDocument(docType, format, orientation, bgColor)
              }
              openCallback={(path) => this.openDocument(path)}
              importCallback={(path) => this.importDocument(path)}
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
