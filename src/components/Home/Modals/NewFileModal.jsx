import React from 'react'
import { ModalBox, ModalTextButton, ModalTitle } from './BaseModal'

const NewFileModal = (props) => {
    if (props.isOpen === "true") {
        return (
            <ModalBox>
            <ModalTitle> Create New Document </ModalTitle>
            <ModalTextButton text="Create" redirect={props.redirect}/>
            <ModalTextButton text="Back" side="left" func={props.func}/>
            </ModalBox>
)
    }
    else {
        return ( <></> )
    }
}


export default NewFileModal;