import React, { Component } from "react";
import styled from "styled-components";
import GLOBALS from "../../../../Globals";

const HVButtons = styled.button`
  width: ${(props) => (props.horizontal ? "3vw" : "2vw")};
  height: ${(props) => (props.horizontal ? "2vw" : "3vw")};
  margin: 0 0.2vw;
  background-color: ${(props) =>
    props.active === true
      ? GLOBALS.COLORS.midorange
      : GLOBALS.COLORS.lightgrey};
  border: 0.4vw solid ${GLOBALS.COLORS.darkgrey};

  &:hover {
    border: 0.4vw solid
      ${(props) =>
        props.active === false
          ? GLOBALS.COLORS.lightorange
          : GLOBALS.COLORS.darkgrey};
  }
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

class HVSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hv: "horizontal",
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.hv !== prevState.hv) {
      this.props.onChange(this.state.hv);
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HVButtons
          active={this.state.hv === "horizontal"}
          horizontal="dag"
          onClick={() => this.setState({ hv: "horizontal" })}
        ></HVButtons>
        <HVButtons
          active={this.state.hv === "vertical"}
          onClick={() => this.setState({ hv: "vertical" })}
        ></HVButtons>
      </div>
    );
  }
}

export default HVSelector;
