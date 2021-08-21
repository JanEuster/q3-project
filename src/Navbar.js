import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


function NavItem(props) {
	const right = props.right;
	return (
	<React.Fragment>	
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
	</React.Fragment>	
	)
}

function Navbar(props) {
	return (
		<nav className={props.side}>
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

export default Navbar;
