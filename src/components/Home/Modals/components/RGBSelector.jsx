// NOT USED
// USING DEFAULT HTML5 COLOR PICKER INSTEAD
// MAY BE USED IN THE FUTURE

import React, { Component } from "react";
import styled from "styled-components";
import GLOBALS from "../../../../Globals";

const RGBButton = styled.button`
  position: relative;
  box-sizing: border-box;
  background-color: ${(props) => props.color};
  border: 0.6vw solid ${GLOBALS.COLORS.darkgrey};
  width: 6vw;
  height: 4vw;
`;

const RGBDiv = styled.div`
  position: fixed;
  background-color: ${GLOBALS.COLORS.grey};
  padding: 1vw;
  transform: translate(20%, -70%);
  border: 0.6vw solid ${GLOBALS.COLORS.darkgrey};
  z-index: 9000;
`;

const RGBCanvas = styled.canvas`
  aspect-ratio: 1/1;
`;

class RGBSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    // var canvas = this.canvasRef.current;
    // var ctx = canvas.getContext("2d");
    // ctx.fillStyle = this.props.bgColor;
    // for (let i = 0; i < canvas.width; i++) {
    //   for (let j = 0; j < canvas.height; j++) {
    //     let rgb = this.HSLtoRGB((i * 360) / canvas.width, 1, j / canvas.height);
    //     ctx.fillStyle = this.RGBtoHEX(rgb.r, rgb.g, rgb.b);
    //     ctx.fillRect(i, canvas.height - j, 1, 1);
    //   }
    // }
  }

  RGBtoHSL(r, g, b) {
    var red = r / 255;
    var green = g / 255;
    var blue = b / 255;

    var cMax = Math.max([red, green, blue]);
    var cMin = Math.max([red, green, blue]);
    var delta = cMax - cMin;

    var Hue, Saturation, Lightness;
    if (delta === 0) {
      Hue = 0;
    } else if (cMax === red) {
      Hue = (60 * ((green - blue) / delta)) % 6;
    } else if (cMax === green) {
      Hue = 60 * ((blue - red) / delta + 2);
    } else if (cMax === blue) {
      Hue = 60 * ((red - green) / delta + 4);
    }
    return { h: Hue, s: Saturation, l: Lightness };
  }

  HSLtoRGB(h, s, l) {
    var C = 1 - Math.abs(2 * l - 1) * s;
    var X = C * (1 - Math.abs(((h / 60) % 2) - 1));
    var m = l - C / 2;

    var red, green, blue;
    if (0 <= h && h < 60) {
      red = C;
      green = X;
      blue = 0;
    } else if (60 <= h && h < 120) {
      red = X;
      green = C;
      blue = 0;
    } else if (120 <= h && h < 180) {
      red = 0;
      green = C;
      blue = X;
    } else if (180 <= h && h < 240) {
      red = 0;
      green = X;
      blue = C;
    } else if (240 <= h && h < 300) {
      red = X;
      green = 0;
      blue = C;
    } else if (300 <= h && h < 360) {
      red = C;
      green = 0;
      blue = X;
    }

    return { r: (red + m) * 255, g: (green + m) * 255, b: (blue + m) * 255 };
  }

  HEXlength(a) {
    return a.length > 1 ? a : "0" + a;
  }
  RGBtoHEX(r, g, b) {
    var red = Math.round(r).toString(16);
    var green = Math.round(g).toString(16);
    var blue = Math.round(b).toString(16);
    return `#${this.HEXlength(red)}${this.HEXlength(green)}${this.HEXlength(
      blue
    )}`;
  }

  render() {
    return (
      <>
        {/* <RGBButton>
          <RGBDiv>
            <RGBCanvas
              ref={this.canvasRef}
              width={window.innerHeight * 0.4}
              height={window.innerHeight * 0.4}
            ></RGBCanvas>
          </RGBDiv>
        </RGBButton> */}
      </>
    );
  }
}

export default RGBSelector;
