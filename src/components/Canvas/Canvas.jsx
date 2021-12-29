import React, { useRef, useEffect, useState } from "react";
import Artboard from "./Artboard";
import ToolManager from "./Tools";
import { Circle, Rectangle } from "./Objects/BasicShapes";
import Path from "./Objects/Paths";
import "./Canvas.css";
// simport { ipcRenderer } from "electron";
// const app = require("electron").remote.app;
const appColors = require("../colors.json");

var FPS = 120


var Doc = new Artboard(2100, 2970, [], "#dddddd");
var Tools = new ToolManager(Doc);
var useTool = Tools.toolUse; //create object bound function - when passing functions to other functions the this is lost



Doc.addObjects([
  new Rectangle(200, 200, 1200, 600, "#FF0000"),
  new Rectangle(0, 0, 100, 100, "#00DD00"),
  new Rectangle(1600, 2200, 400, 600, "#3333FF"),
  new Rectangle(1000, 1000, 300, 300, "#DD0066"),
  new Circle(1000, 1000, 300, "#DD00DD", "#DD00DD", false, null),
  new Path([
    [0, 100],
    [500, 2970],
    [1000, 100],
  ]),
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

  Tools.setScreenDimensions(dimensions);

  const canvasRef = useRef(null);

  
  // runs after every page render -> checks for events
  useEffect(() => {
    // get canvas Context
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    
    function updateCanvas() {
      var artMeta = Doc.getArtboardMetadata(
      context.canvas.width,
      context.canvas.height
    );
      Doc.draw(context, artMeta);
      Tools.toolGraphic(context, artMeta)
      Tools.panel.render(context);
    }


    function handleResize() {
      // TODO: limit the amount of resizes for performace purposes
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      Tools.setScreenDimensions(dimensions);
      //setMaximized({
      //maximized: window.isMaximized()
      //})

      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      updateCanvas()
    }

    // ipcRenderer.Renderer.on("resize", (e, name) => {
    //   console.log(name, e);
    //   handleResize();
    // });

    let updateInterval = setInterval(updateCanvas, 1000/FPS)


    window.addEventListener("resize", handleResize);
    canvas.addEventListener("click", useTool);
    canvas.addEventListener("mousedown", useTool);
    canvas.addEventListener("mouseup", useTool);
    canvas.addEventListener("mousemove", useTool);

    // window.addEventListener("maximize", handleResize);
    return (_) => {
      clearInterval(updateInterval)


      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", useTool);
      canvas.removeEventListener("mousedown", useTool);
      canvas.removeEventListener("mouseup", useTool);
      canvas.removeEventListener("mousemove", useTool);

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
