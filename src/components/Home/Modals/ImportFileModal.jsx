import React from 'react'
import { ModalBox, ModalTextButton, ModalTitle } from './BaseModal'

const ImportFileModal = (props) => {
    if (props.isOpen === "true") {
        return (
            <ModalBox>
            <ModalTitle> Import File </ModalTitle>
            <ModalTextButton text="Import" redirect={props.redirect}/>
            <ModalTextButton text="Back" side="left" func={props.func}/>
            </ModalBox>
        )
    }
    else {
        return ( <></> )
    }
}

export default ImportFileModal;