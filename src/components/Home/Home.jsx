import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import HomeModal from './Modals/BaseModal';
import styled from "styled-components";
import { useEffect } from 'react';
import NewFileModal from './Modals/NewFileModal';
import ImportFileModal from './Modals/ImportFileModal';
import OpenFileModal from './Modals/OpenFileModal';

const Blurred = styled.div`
    filter: blur(${props => props.blur === "true" ? "30" : "0"}px)
`

function Home(props) {
    const [isOpenNew, setOpenNew] = useState("false")
    const [isOpenImport, setOpenImport] = useState("false")
    const [isOpenOpen, setOpenOpen] = useState("false")
    const [isOpenAny, setOpenAny] = useState("false") // is any modal opened?

    useEffect(() => {
        if (isOpenNew === "true" || isOpenImport === "true" || isOpenOpen === "true") {
            setOpenAny("true")
        } else if (isOpenNew === "false" && isOpenImport === "false" && isOpenOpen === "false") {
            setOpenAny("false")
        }
    })


    return (
        <>
        <NewFileModal isOpen={isOpenNew} redirect="new" func={ () => {setOpenNew("false")} }/>
        <OpenFileModal isOpen={isOpenOpen} redirect="" func={ () => {setOpenOpen("false")} }/>
        <ImportFileModal isOpen={isOpenImport} redirect="" func={ () => {setOpenImport("false")} }/>
        <Blurred blur={isOpenAny}>
            <div className="home">
                {/* <NewFileModal />
                <OpenFileModal />
                <ImportFileModal /> */}
                
                <div className="main-buttons">
                    {/* <div className="main-file-button">
                        <div className="main-file-button-top">
                            <h1> {props.title} </h1>	
                        </div>
                        <div className="main-file-button-bottom">
                            <h3> {props.subtitle} </h3>
                        </div>
                    </div> */}
                <MainButton title="New Document" subtitle="fileformat" onClick={() => { isOpenNew === "false" ? setOpenNew("true") : setOpenNew("false")} }/>
                <MainButton title="Open" subtitle="fileformat" onClick={() => { isOpenOpen === "false" ? setOpenOpen("true") : setOpenOpen("false")} }/>	
                <MainButton title="Import" subtitle="pdf png jgp flipchart" onClick={() => { isOpenImport === "false" ? setOpenImport("true") : setOpenImport("false")} }/>	
                </div>
                <div className="small-buttons">
                    <SmallButton title="fiel1.???" link="/" />
                    <SmallButton title="fiel1.???" link="/" />
                    <SmallButton title="fiel1.???" link="/" />
                    <SmallButton title="fiel1.???" link="/" />
                    <SmallButton title="fiel1.???" link="/" />
                </div>
            </div>
        </Blurred>
        </>
	)	
}


function MainButton(props) {
    return (
        <div className="main-file-button" onClick={ props.onClick }>
			<div className="main-file-button-top">
				<h1> {props.title} </h1>	
			</div>
			<div className="main-file-button-bottom">
				<h3> {props.subtitle} </h3>
			</div>
        </div>
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

export default Home;