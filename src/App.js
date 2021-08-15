import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Canvas from "./components/Canvas/Canvas.jsx";


function App() {
  return (
	<Router>
		<div className="App">

	<Switch>
		<Route path="/new">
			<Navbar side="bottom"/>
			<Canvas />
		</Route>
		
		<Route exact path="/"> // "/" path Route always last
			<Navbar />
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
				<MainButton title="Import" subtitle="pdf png jgp flipchart" />	
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

function NavItem(props) {
	const right = props.right;
	return (
	<div>	
		{ right ? 
		<li className="right-nav">
			<Link to={props.link}>
			{props.title}			
			</Link>
		</li>
		:
		<li> 
			<Link to={props.link}>
			{props.title}			
			</Link>
		</li> }
	</div>	
	)
}

function Navbar(props) {
	let nav_class = "none";

	if (props.side == "bottom") {
		let nav_class = "navbar-bottom";	
	}
	console.log(props.side, nav_class);
	return (
		<nav className={nav_class}>
			<ul className="Navbar">
				<NavItem link="/" title="Home" />
				<NavItem link="/" title="Document1" />
				<NavItem link="/" title="Document2" />
				<NavItem link="/" title="Document3" />
				<NavItem link="/" title="Settings" right="true" />
			</ul>
		</nav>
	);
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
