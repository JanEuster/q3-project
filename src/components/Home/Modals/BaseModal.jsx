import React from 'react'
import { render } from 'react-dom';
import styled from "styled-components"
import { Link } from 'react-router-dom';
const colors = require("../../colors.json")

const ModalBox = styled.div`
	position: fixed;
	z-index: 1000;
	background-color: ${ colors.lightgrey };
	outline-style: solid;
	outline-color: ${ colors.darkgrey };
	outline-width: 1.2vh;
	width: 70vw;
	heigh: 50vh;
	min-width: 75vw;
    aspect-ratio: 2;
	top: 50vh;
	left: 50vw;
	transform: translate(-50%, -50%)
`
const ModalTitle = styled.div`
	font-family: Iosevka Extended Heavy;
	font-size: ${({ size }) => size || 4.8}vh;
	color: ${ colors.darkgrey };
	margin-top: 3vh
`

const ModalTextButtonStyle = styled.button`
	position: absolute;
	display: block;
	${({side}) => side || "right"}: 25%;
	top: 80%;
	background-color: ${ colors.grey };
	color: ${ colors.darkgrey };
	font-size: 1vh;
	border: 4px solid ${ colors.darkgrey };
    aspect-ratio: 2;
	font-family: Iosevka bold;
	font-size: calc(12px + 1.5vw);
` 


function ModalTextButton(props) {
	if (props.redirect && !props.func) {
		return (
			<ModalTextButtonStyle side={props.side}>
				<Link to={props.redirect} style={{ margin: "0.2vw", fontFamily: 'inherit', color: 'inherit' }} onClick={() => { }} dangerouslySetInnerHTML={{ __html: props.text }} />
			</ModalTextButtonStyle>
		)
	} else if (!props.redirect && props.func) {
		return (
			<ModalTextButtonStyle side={props.side}>
				<div style={{ margin: "0.2vw", fontFamily: 'inherit', color: 'inherit' }} onClick={() => props.func()} dangerouslySetInnerHTML={{ __html: props.text }} />
			</ModalTextButtonStyle>
		)
	} else {
		return (
			<ModalTextButtonStyle side={props.side}>
				<div style={{ margin: "0.2vw", fontFamily: 'inherit', color: 'inherit' }} onClick={() => { }} dangerouslySetInnerHTML={{ __html: props.text }} />
			</ModalTextButtonStyle>
		)	
	}
}
const BaseModal = (props) => {

    if (props.isOpen === "true") {
        return (
            <ModalBox>
            <ModalTextButton text="Back" side="left" func={props.func}/>
            </ModalBox>
)
    }
    else {
        return ( <></> )
    }
}

export default BaseModal;
export { ModalBox, ModalTextButton, ModalTitle, ModalTextButtonStyle };