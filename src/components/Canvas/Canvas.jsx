import React, { useRef, useEffect, useState, Component } from "react";
import Artboard, { noArtboard } from "./Artboard";
import ToolManager from "./Tools";
import { Circle, Rectangle, Triangle } from "./Objects/BasicShapes";
import Path from "./Objects/Paths";
import Text from "./Objects/Text";

import Panel from "./Panels/BasePanel";
import SettingsToolPanel from "./Panels/ToolSettings";
import {
  PanelButton,
  PanelSlider,
  PanelText,
  PanelTextSwitch,
  PanelTitle,
} from "./Panels/PanelComponents";
import GLOBALS from "../../Globals";

var FPS = 120;
var CANVAS_BG = "#F3F3F3";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Doc: this.props.Doc
        ? this.props.Doc
        : new noArtboard(CANVAS_BG),
      Tools: undefined,
      Panels: undefined,
    };


    this.canvasRef = React.createRef();

    this._isMounted = false;

    this.resizeCallback = (() =>
      this.handleResize(this.canvasRef.current.getContext("2d"))).bind(this);
    this.mouseKeyCallback = ((e) => this.handleCanvasEvent(e)).bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    var toolManager = new ToolManager(this.state.Doc);
    this.setState({ Tools: toolManager });
    // testing panels
    var testPanel = new Panel(20, -350, 200, 300, 16, 8);
    testPanel.components = [
      new PanelButton(20, 100, 20, 20),
      new PanelTitle(20, 30, "Test"),
      new PanelText(20, 50, "testing testing please"),
      new PanelTextSwitch(20, 80, "testing"),
      new PanelSlider(15, 130, 170),
    ];
    this.setState({
      Panels: [toolManager.panel, toolManager.settingsPanel, testPanel],
    });

    // get canvas
    const canvas = this.canvasRef.current;

    window.addEventListener("resize", this.resizeCallback);
    canvas.addEventListener("click", this.mouseKeyCallback);
    canvas.addEventListener("mousedown", this.mouseKeyCallback);
    canvas.addEventListener("mouseup", this.mouseKeyCallback);
    canvas.addEventListener("mousemove", this.mouseKeyCallback);
    canvas.addEventListener("touchmove", this.mouseKeyCallback);
    document.addEventListener("keypress", this.mouseKeyCallback);
    document.addEventListener("keydown", this.mouseKeyCallback);

    setInterval(() => this.forceUpdate(), 1000 / FPS);
  }

  // runs after every page render -> checks for events
  componentDidUpdate(prevProps, prevState) {
    // set new tool manager and panels if document changes
    if (prevState.Doc !== this.state.Doc) {
      var toolManager = new ToolManager(this.state.Doc);
      this.setState({ Tools: toolManager });
      // testing panels
      var testPanel = new Panel(20, -350, 200, 300, 16, 8);
      testPanel.components = [
        new PanelButton(20, 100, 20, 20),
        new PanelTitle(20, 30, "Test"),
        new PanelText(20, 50, "testing testing please"),
        new PanelTextSwitch(20, 80, "testing"),
        new PanelSlider(15, 130, 170),
      ];
      this.setState({
        Panels: [toolManager.panel, toolManager.settingsPanel, testPanel],
      });
    }

    // get canvas Context
    const canvas = this.canvasRef.current;
    const context = canvas.getContext("2d");

    this.updateCanvas(context);
    // window.addEventListener("maximize", handleResize);
    return (_) => {
      // clearInterval(updateInterval);
      //window.addEventListener("maximize", handleResize);
      // clean up: remove listener to avoid memory leak by making sure there is always only one listener (every time the useEffect is called because of a resize event, a nev listener would be created)
      // useEffect executes function on update of the canvas
      // second arguement([]): all items to be watched for changes, which result in recurring execution of the useEffect callback
    };
  }

  componentWillUnmount() {
    this._isMounted = false;

    // get canvas
    const canvas = this.canvasRef.current;

    window.removeEventListener("resize", this.resizeCallback);
    canvas.removeEventListener("click", this.mouseKeyCallback);
    canvas.removeEventListener("mousedown", this.mouseKeyCallback);
    canvas.removeEventListener("mouseup", this.mouseKeyCallback);
    canvas.removeEventListener("mousemove", this.mouseKeyCallback);
    canvas.removeEventListener("touchmove", this.mouseKeyCallback);
    document.removeEventListener("keypress", this.mouseKeyCallback);
    document.removeEventListener("keydown", this.mouseKeyCallback);
  }

  updateCanvas(context) {
    // reset canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = CANVAS_BG;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    this.state.Doc.draw(context);
    this.state.Tools.toolGraphic(context);

    // show panels
    this.state.Panels.map((panel) => {
      panel.render(context);
    });
  }

  handleResize(context) {
    // TODO: limit the amount of resizes for performace purposes

    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;
    this.updateCanvas(context);
  }

  handleCanvasEvent(e) {
    if (e.type === "click") {
      // ignore click event after mouseup as click is always raised after holding mouse down
      return;
    }

    // if (e.type !== "mousemove") { beforeMouseMove = e.type }
    // || (beforeMouseMove === "mousedown" && e.type === "mousemove")
    // TODO: enable smooth dragging of slider panel component  with code above, without interrupting tool use/ changing panel settings

    // check click / mousedown collision with panels
    if (e.type === "click" || e.type === "mousedown") {
      for (let i = 0; i < this.state.Panels.length; i++) {
        let panel = this.state.Panels[i];
        if (panel.checkBoundsCollision(e.pageX, e.pageY)) {
          return;
        }
      }
    }

    if (this.state.Doc.editable) this.state.Tools.toolUse(e);
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ position: "absolute", bottom: 0, left: 0 }}
        id="theCanvas"
      >
        {" "}
      </canvas>
    );
  }
}

export default Canvas;
