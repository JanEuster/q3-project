import logo from "./logo.svg";
import "./App.css";
import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./Navbar.js";
import Canvas from "./components/Canvas/Canvas.jsx";
import { HashRouter } from "react-router-dom";
import Home from './components/Home/Home';
import Artboard from "./components/Canvas/Artboard";


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDoc: undefined,
      documents: [],
    }
  }

  createDocument(docType, format, orientation) {
    if (docType === "regular") {
      var width, height;
      if (format === "A4") {
        if (orientation === "vertical") {
          // 300dpi - weird value because its dots per *inch*
          width = 2480.3;
          height = 3507.9;
        }
      }
    }
    this.setState({currentDoc: new Artboard(width, height, [], "#dddddd")})
    this.setState({documents: [...this.state.documents, this.state.currentDoc]})
    console.log(this.state)
  }
  openDocument(path) {
  
  }
  importDocument(path) {
  
  }

  render() {
    return (
      <HashRouter>
        <div className="App">

      <Switch>
        <Route path="/new">
          <Navbar side="nav-bottom"/>
          <Canvas />
        </Route>
        
        <Route exact path="/"> // "/" path Route always last
          <Navbar side="nav-top"/>
              <Home createCallback={(docType, format, orientation) => this.createDocument(docType, format, orientation)} openCallback={ (path) => this.openDocument(path) } importCallback={ (path) => this.importDocument(path) } />	
        </Route>
        
        <Route render={() => <h1> 404 Error: Page not Found <br/> Go <Link to="/"> Home </Link></h1>} />

      </Switch>


        </div>
      </HashRouter>
    );
  }
}



export default App;
