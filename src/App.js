import logo from "./logo.svg";
import "./App.css";
import React from "react";

function NavItem(props) {
	const right = props.right;
	return (
	<div>	
		{ right ? 
		<li className="right-nav">
			<a href="">
			{props.title}			
			</a>
		</li>
		:
		<li> 
			<a href="">
			{props.title}			
			</a>
		</li> }
	</div>	
	)
}

function Navbar(props) {
	console.log(props);
	return (
		<nav>
			<ul className="Navbar">
				{props.children}
			</ul>
		</nav>
	);
}

function MainButton(props) {
	return (
		<a href={props.link} className="main-file-button">
			<div className="main-file-button-top">
				<h1> {props.title} </h1>	
			</div>
			<div className="main-file-button-bottom">
				<h3> {props.subtitle} </h3>
			</div>
		</a>	
	);
}

function SmallButton(props) {
	return (
		<a href={props.link} className="small-file-button">
			<div className="small-file-button-top">
				<p>||preview||</p>
			</div>
			<div className="small-file-button-bottom">
				<h3> {props.title} </h3>
			</div>
		</a>	
	);

}

function Home(props) {
	return (
		<div className="home">
			<div className="main-buttons">
				<MainButton title="New Document" subtitle="fileformat" />	
				<MainButton title="Import" subtitle="pdf png jgp flipchart" />	
			</div>
			<div className="small-buttons">
				<SmallButton title="fiel1.???" />
				<SmallButton title="fiel1.???" />
				<SmallButton title="fiel1.???" />
				<SmallButton title="fiel1.???" />
				<SmallButton title="fiel1.???" />
			</div>
		</div>
	)	
}

function App() {
  return (
		<div className="App">
			<Home/>	
			<Navbar>
				<NavItem title="HOME"/>
				<NavItem title="DOCUMENT1"/>
				<NavItem title="DOCUMENT2"/>
				<NavItem title="DOCUMENT3"/>
				<NavItem right="true" title="Settings"/>
			</Navbar>
	


		</div>
	);
}

export default App;
