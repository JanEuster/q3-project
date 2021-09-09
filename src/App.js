import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Navbar from "./Navbar.js";
import Canvas from "./components/Canvas/Canvas.jsx";


function App() {
  return (
	<Router>
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
	</Router>
	);
}


function Home(props) {
	return (
		<div className="home">
			<div className="main-buttons">
				<MainButton title="New Document" subtitle="fileformat" link="new" />	
				<MainButton title="Import" subtitle="pdf png jgp flipchart" link="doc/"/>	
			</div>
			<div className="small-buttons">
				<SmallButton title="fiel1.???" link="/" />
				<SmallButton title="fiel1.???" link="/" />
				<SmallButton title="fiel1.???" link="/" />
				<SmallButton title="fiel1.???" link="/" />
				<SmallButton title="fiel1.???" link="/" />
			</div>
		</div>
	)	
}


function MainButton(props) {
	return (
		<Link to={props.link} className="main-file-button">
			<div className="main-file-button-top">
				<h1> {props.title} </h1>	
			</div>
			<div className="main-file-button-bottom">
				<h3> {props.subtitle} </h3>
			</div>
		</Link>	
	);
}

function SmallButton(props) {
	return (
		<Link to={props.link} className="small-file-button">
			<div className="small-file-button-top">
				<p>||preview||</p>
			</div>
			<div className="small-file-button-bottom">
				<h3> {props.title} </h3>
			</div>
		</Link>	
	);
}

export default App;
