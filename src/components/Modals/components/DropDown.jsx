import React, { Component } from "react";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import GLOBALS from "../../../Globals";

const DropDownStyle = styled.div`
  display: inline-block;
  float: left;
  position: relative;
  width: ${(props) => props.width};
  text-align: center;
`;

const OptionsDiv = styled.div`
  position: absolute;
  float: left;
  width: calc(100% - ${(props) => props.size} / 8);
  transform-origin: top;
  transform: scaleY(${(props) => (props.isOpen ? 1 : 0)});
  z-index: 2000;
  border: calc(${(props) => props.size} / 16) solid ${GLOBALS.COLORS.darkgrey};
`;

const OptionButton = styled.button`
  display: block;
  padding: 0vh 0.6vw;
  // margin: -0.5vw 0;
  width: 100%;
  border: 0px solid ${GLOBALS.COLORS.darkgrey};
  &:hover {
    outline: calc(${(props) => props.size} / 14) solid
      ${GLOBALS.COLORS.lightorange};
    cursor: pointer;
  }
  &:focus {
    outline: calc(${(props) => props.size} / 14) solid
      ${GLOBALS.COLORS.midorange};
  }
`;
const OptionButtonText = styled.div`
  font-family: Iosevka bold;
  font-size: calc(${(props) => props.size} / 2.7);
  transform: scale(1.3);
  user-select: none;
`;

const SelectedOptionButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.2vh 0.6vw;
  font-family: Iosevka bold;
  font-size: calc(${(props) => props.size} / 2.5);
  border: calc(${(props) => props.size} / 10) solid ${GLOBALS.COLORS.darkgrey};
  user-select: none;

  &:hover {
    border: calc(${(props) => props.size} / 10) solid
      ${GLOBALS.COLORS.lightorange};
    cursor: pointer;
  }
  &:focus {
    outline: none;
    border: calc(${(props) => props.size} / 10) solid
      ${GLOBALS.COLORS.midorange};
    border-radius: 0;
  }
`;

const Option = (props) => {
  return (
    <OptionButton
      size={props.size}
      onClick={props.onClick}
      onMouseDown={(event) => event.preventDefault()}
    >
      <OptionButtonText size={props.size}>{props.text}</OptionButtonText>
    </OptionButton>
  );
};
const SelectedOption = (props) => {
  return (
    <SelectedOptionButton
      onClick={props.toggle}
      onBlur={props.setOFF}
      size={props.size}
    >
      {props.currentOption}
    </SelectedOptionButton>
  );
};

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      defaultOption: props.default,
      currentOption: props.default,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentOption !== prevState.currentOption) {
      this.props.onChange(this.state.currentOption);
    }
  }

  setCurrent(option) {
    this.setState({ currentOption: option });
    this.props.onChange(this.state.currentOption);
    this.toggleOpen();
  }
  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
    if (this.state.isOpen === true) {
      document.activeElement.blur();
    }
  }

  render() {
    const options = [];
    this.props.options.map((opt, i) => {
      if (this.state.showAllOptions && opt.name === this.state.currentOption) {
      } else {
        options.push(
          <Option
            text={opt.name}
            size={this.props.width}
            key={i}
            onClick={() => {
              this.setCurrent(opt);
              document.activeElement.blur();
            }}
          ></Option>
        );
      }
    });

    return (
      <DropDownStyle width={this.props.width} height={this.props.height}>
        <SelectedOption
          size={this.props.width}
          currentOption={this.state.currentOption.name}
          toggle={() => this.toggleOpen()}
          setOFF={() => this.setState({ isOpen: false })}
        />
        <OptionsDiv isOpen={this.state.isOpen} size={this.props.width}>
          {options}
        </OptionsDiv>
      </DropDownStyle>
    );
  }
}

export default Dropdown;
