import React, { Component } from "react";
import styled from "styled-components";
import GLOBALS from "../../../Globals";

const DropDownStyle = styled.div`
  display: inline-block;
  float: left;
  position: relative;
  text-align: center;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const OptionsDiv = styled.div`
  position: absolute;
  float: left;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(${props => props.optionsLength} * ${props => props.height} * 0.7); 
  transform-origin: top;
  transform: scaleY(${(props) => (props.isOpen ? 1 : 0)});
  z-index: 2000;
  border: 5px solid ${GLOBALS.COLORS.darkgrey};
`;

const OptionButton = styled.button`
  display: block;
  padding: 0vh 0.6vw;
  width: 100%;
  height: ${props => props.height};
  border: 0px solid ${GLOBALS.COLORS.darkgrey};
  &:hover {
    z-index: 99999;
    outline: 0.3rem solid
      ${GLOBALS.COLORS.lightorange};
    cursor: pointer;
  }
  &:focus {
    z-index: 99999;
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
  height: 100%;
  padding: 0.2vh 0.6vw;
  font-family: Iosevka bold;
  font-size: calc(${(props) => props.size} * 0.5);
  border: 0.3rem solid ${GLOBALS.COLORS.darkgrey};
  user-select: none;

  &:hover {
    border: 0.3rem solid
      ${GLOBALS.COLORS.lightorange};
    cursor: pointer;
  }
  &:focus {
    outline: none;
    border: 0.3rem solid
      ${GLOBALS.COLORS.midorange};
    border-radius: 0;
  }
`;

const Option = (props) => {
  return (
    <OptionButton
      size={props.width}
      onClick={props.onClick}
      onMouseDown={(event) => event.preventDefault()}
    >
      <OptionButtonText size={props.height}>{props.text}</OptionButtonText>
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
    this.props.options.forEach((opt, i) => {
      if (this.state.showAllOptions && opt.name === this.state.currentOption) {
      } else {
        options.push(
          <Option
            text={opt.name}
            width={this.props.width}
            height={this.props.height}
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
          size={this.props.height}
          currentOption={this.state.currentOption.name}
          toggle={() => this.toggleOpen()}
          setOFF={() => this.setState({ isOpen: false })}
        />
        <OptionsDiv isOpen={this.state.isOpen} optionsLength={options.length} width={this.props.width} height={this.props.height}>
          {options}
        </OptionsDiv>
      </DropDownStyle>
    );
  }
}

export default Dropdown;
