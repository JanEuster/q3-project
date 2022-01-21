import React from 'react'
import { ModalBox, ModalTextButton, ModalTitle } from './BaseModal'

const OpenFileModal = (props) => {
    if (props.isOpen === "true") {
        return (
          <ModalBox>
            <ModalTitle> Open Document </ModalTitle>
            <ModalTextButton text="Open" func={props.appCallback} />
            <ModalTextButton text="Back" side="left" func={props.func} />
          </ModalBox>
        );
    }
    else {
        return ( <></> )
    }
}

export default OpenFileModal;