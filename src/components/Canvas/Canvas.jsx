import React, { useRef, useEffect, useState } from "react";
import Artboard from "./Artboard.js";
import BaseObject from "./Objects/BaseObject";
import "./Canvas.css";


const Canvas = (props) => {
	
	let Doc = new Artboard(2100, 2970, [], '#dddddd');
    
  Doc.addObjects([new BaseObject(200, 200, 1200, 600, '#FF0000')]);


  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

	//TODO: find a way to combine react & electron so that the electron.js win events etc. can be accessed in react	
	//const [maximized, setMaximized] = useState({
		//maximized: window.isMaximized()
		//})

  const canvasRef = useRef(null);

  // get canvas Context
  useEffect(() => {
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

			const { width, height } = canvas.getBoundingClientRect();	
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      Doc.draw(context);
    }
    Doc.draw(context);

    console.log("update");

    window.addEventListener("resize", handleResize);
		//window.addEventListener("maximize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
			//window.addEventListener("maximize", handleResize);
    };
    // clean up: remove listener to avoid memory leak by making sure there is always only one listener (every time the useEffect is called because of a resize event, a nev listener would be created)

    // useEffect executes function on update of the canvas
    // second arguement([]): all items to be watched for changes, which result in recurring execution of the useEffect callback
  });
  return (
    <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} id="theCanvas">
      {" "}
    </canvas>
  );
};

export default Canvas;
