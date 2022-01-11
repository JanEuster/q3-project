import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactModal from "react-modal";
import Navbar from "./Navbar.js";
import Canvas from "./components/Canvas/Canvas.jsx";
import { HashRouter } from "react-router-dom";
import Home from './components/Home/Home';


function App() {
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
			<Home/>	
		</Route>
		
		<Route render={() => <h1> 404 Error: Page not Found <br/> Go <Link to="/"> Home </Link></h1>} />

	</Switch>


		</div>
	</HashRouter>
	);
}



export default App;
