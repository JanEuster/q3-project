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
const Title = styled.div`
	font-family: Iosevka Extended Heavy;
	font-size: ${({ size }) => size || 4.8}vh;
	color: ${ colors.darkgrey };
	margin-top: 3vh
`

const SubmitButtonStyle = styled.button`
	position: absolute;
	display: block;
	left: 75%;
	top: 80%;
	background-color: ${ colors.grey };
	color: ${ colors.darkgrey };
	font-size: 1vh;
	border: 4px solid ${ colors.darkgrey };
    aspect-ratio: 2;
	font-family: Iosevka bold;
	font-size: calc(12px + 1.5vw);
` 


function TextButton(props) {
	return (
		<SubmitButtonStyle>
			<Link to={props.redirect} style={{margin: "0.2vw", fontFamily: 'inherit', color: 'inherit'}} onClick={()=>{}} dangerouslySetInnerHTML={{__html: props.text}}></Link>
		</SubmitButtonStyle>
	)
}
const HomeModal = (props) => {

    if (props.isOpen === "true") {
        return (
            <ModalBox>
            <Title> Create New Document </Title>
            <TextButton text="Create" redirect={props.redirect}/>
            </ModalBox>
)
    }
    else {
        return ( <></> )
    }
}

export default HomeModal;