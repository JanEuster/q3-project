import React, { Component } from "react";
import styled from "styled-components";

const SVGImage = styled.img`
  user-select: none;
  user-drag: none;

  &:hover {
    cursor: pointer;
  }
`;

class DocTypeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      docType: props.docTypes[0],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.docType !== prevState.docType) {
      this.props.setDocType(this.state.docType);
    }
  }

  render() {
    return (
      <>
        <SVGImage
          src={
            this.state.docType === this.props.docTypes[0]
              ? process.env.PUBLIC_URL +
                "/assets/icons/ui/regular_doc-selected.svg"
              : process.env.PUBLIC_URL + "/assets/icons/ui/regular_doc.svg"
          }
          onClick={() => this.setState({ docType: this.props.docTypes[0] })}
          style={{ width: this.props.width, gridColumn: 1 }}
        />
        <SVGImage
          src={
            this.state.docType === this.props.docTypes[1]
              ? process.env.PUBLIC_URL +
                "/assets/icons/ui/infinite_scroll_doc-selected.svg"
              : process.env.PUBLIC_URL +
                "/assets/icons/ui/infinite_scroll_doc.svg"
          }
          onClick={() => this.setState({ docType: this.props.docTypes[1] })}
          style={{ width: this.props.width, gridColumn: 2 }}
        />
        <SVGImage
          src={
            this.state.docType === this.props.docTypes[2]
              ? process.env.PUBLIC_URL +
                "/assets/icons/ui/infinite_doc-selected.svg"
              : process.env.PUBLIC_URL + "/assets/icons/ui/infinite_doc.svg"
          }
          onClick={() => this.setState({ docType: this.props.docTypes[2] })}
          style={{ width: this.props.width, gridColumn: 3 }}
        />
      </>
    );
  }
}

export default DocTypeSelector;
