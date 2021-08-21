import React, { useRef, useEffect, useState } from "react";

import "./Canvas.css";

const Canvas = (props) => {
  const { draw, ...otherProps } = props;

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

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
      console.log("resize", dimensions.width, "x", dimensions.height);

			const { width, height } = canvas.getBoundingClientRect();	
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      draw(context);
    }
    draw(context);

    console.log("update");

    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
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
