import Artboard, {
  infiniteArtboard,
  infiniteScrollArtboard,
} from "./components/Canvas/Artboard";
import {
  Rectangle,
  Triangle,
  Circle,
} from "./components/Canvas/Objects/BasicShapes";
import ImageObj from "./components/Canvas/Objects/Image";
import Path, { Point } from "./components/Canvas/Objects/Paths";
import TextObj from "./components/Canvas/Objects/Text";
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  DOC_TYPES: ["regular", "infinite-scroll", "infinite"],
  DOC_FORMATS: [
    { name: "A5", width: 1748, height: 2480 },
    { name: "A4", width: 2480, height: 3508 },
    { name: "A3", width: 3508, height: 4961 },
    { name: "A2", width: 4961, height: 7016 },
    { name: "A1", width: 7016, height: 9933 },
  ],
  EXPORT_FORMATS: [
    { name: "PNG Image", value: "image/png", suffix: "png" },
    { name: "JPG Image", value: "image/jpg", suffix: "jpg" },
    { name: "GIF Image", value: "image/gif", suffix: "gif" },
    { name: "Bitmap", value: "image/bmp", suffix: "bmp" },
    { name: "TIFF Image", value: "image/tiff", suffix: "tiff" }
  ],
  INFINITE_WIDTH: 2000, // exists just to have a resolution for the infinite doc types
  DOC_ORIENTATIONS: ["vertical", "horizontal"],
  COLORS: {
    CANVAS_BG: "#F3F3F3",
    lightlightgrey: "#F8F8F8",
    lightgrey: "#EBEBEB",
    grey: "#DCDCDC",
    darkgrey: "#393939",
    lightorange: "#F3AA59",
    midorange: "#FA7D36",
    midblue: "#0D79F2",
  },
  HISTORY_PROPERTERTIES: [
    "width", "height", "bgColor", "objects"
  ],
  SAVE: {
    ARTBOARD_TYPES: {
      regular: () => {
        return new Artboard(10, 10, "#FFFFFF");
      },
      "infinite-scroll": () => {
        return new infiniteScrollArtboard(10, "#FFFFFF");
      },
      infinite: () => {
        return new infiniteArtboard(10, "#FFFFFF");
      },
    },
    OBJECT_TYPES: {
      Rectangle: {
        class: Rectangle,
        attributes: [
          "xCoord",
          "yCoord",
          "width",
          "height",
          "fillColor",
          "borderColor",
          "borderWidth",
        ],
        children: false,
      },
      Triangle: {
        class: Triangle,
        attributes: [
          "xCoord",
          "yCoord",
          "width",
          "height",
          "fillColor",
          "borderColor",
          "borderWidth",
        ],
        children: false,
      },
      Circle: {
        class: Circle,
        attributes: [
          "xCoord",
          "yCoord",
          "radius",
          "fillColor",
          "borderColor",
          "borderWidth",
        ],
        children: false,
      },
      Path: {
        class: Path,
        attributes: ["strokeColor", "strokeWidth", "fillPath", "lineJoin"],
        children: { setFunction: "setPointObjects", class: Point },
      },
      Point: {
        class: Point,
        attributes: ["x", "y"],
        children: false,
      },
      Text: {
        class: TextObj,
        attributes: ["xCoord", "yCoord", "font", "fontSize", "fillColor"],
        children: false,
        text: true,
      },
      Image: {
        class: ImageObj,
        attributes: ["xCoord", "yCoord", "width", "height", "imageSrc"],
        children: false,
      }
    },
    ATTRIBUTE_TYPES: {
      x: Number,
      y: Number,
      xCoord: Number,
      yCoord: Number,
      width: Number,
      height: Number,
      radius: Number,
      fillColor: String,
      borderColor: String,
      borderWidth: String,
      strokeColor: String,
      strokeWidth: Number,
      fillPath: Boolean,
      lineJoin: String,
      font: String,
      fontSize: Number,
      imageSrc: String,
    },
  },
};
