import React, { useRef, useEffect, useState } from "react";
import Artboard from "./Artboard";
import Toolbox from "./Panels/Toolbox";
import { Circle, Rectangle } from "./Objects/BasicShapes";
import "./Canvas.css";
// simport { ipcRenderer } from "electron";
// const app = require("electron").remote.app;
const appColors = require("../colors.json");

let Doc = new Artboard(2100, 2970, [], "#dddddd");
let Tools = new Toolbox();

Doc.addObjects([
  new Rectangle(200, 200, 1200, 600, "#FF0000"),
  new Rectangle(0, 0, 100, 100, "#00DD00"),
  new Rectangle(1600, 2200, 400, 600, "#3333FF"),
  new Rectangle(1000, 1000, 300, 300, "#DD0066"),
  new Circle(1000, 1000, 300, "#DD00DD", "#DD00DD", false, null),
]);

const Canvas = (props) => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  //TODO: find a way to combine react & electron so that the electron.js win events etc. can be accessed in react
  //const [maximized, setMaximized] = useState({
  //maximized: window.isMaximized()
  //})

  const canvasRef = useRef(null);

  // runs after every page render -> checks for events
  useEffect(() => {
    // get canvas Context
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    function handleResize() {
      // TODO: limit the amount of resizes for performace purposes
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      //setMaximized({
      //maximized: window.isMaximized()
      //})
      console.log("resize", dimensions.width, "x", dimensions.height);

      //  const { width, height } = canvas.getBoundingClientRect();
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      Doc.draw(context);
      Tools.render(context);
    }

    function testhandleClick(e) {
      console.log(e);
      console.log("click at", e.pageX, e.pageY);
      var relativeCoords = Doc.relativeCoords(
        e.pageX,
        e.pageY,
        dimensions.width,
        dimensions.height
      );
      var scaledCoords = Doc.ratioedCoords(
        relativeCoords.x,
        relativeCoords.y,
        dimensions.width,
        dimensions.height
      );
      Doc.addObject(
        // new Circle(
        //   scaledCoords.x,
        //   scaledCoords.y,
        //   50,
        //   "#009955",
        //   undefined,
        //   true
        // )
        new Rectangle(
          scaledCoords.x,
          scaledCoords.y,
          50,
          50,
          "#995500",
          undefined,
          true
        )
      );
      Doc.draw(context);
      Tools.render(context);
      console.log("update on resize");
    }

    // ipcRenderer.Renderer.on("resize", (e, name) => {
    //   console.log(name, e);
    //   handleResize();
    // });

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("click", testhandleClick);
    Doc.draw(context);
    Tools.render(context);
    console.log("update on click");

    // window.addEventListener("maximize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", testhandleClick);
      //window.addEventListener("maximize", handleResize);

      // clean up: remove listener to avoid memory leak by making sure there is always only one listener (every time the useEffect is called because of a resize event, a nev listener would be created)
      // useEffect executes function on update of the canvas
      // second arguement([]): all items to be watched for changes, which result in recurring execution of the useEffect callback
    };
  });

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      id="theCanvas"
    >
      {" "}
    </canvas>
  );
};

export default Canvas;
