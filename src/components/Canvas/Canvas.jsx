import React, { Component } from "react";
import ToolManager, { selectionT } from "./Tools";

import Panel from "./Panels/BasePanel";
import SettingsToolPanel, { ColorSettingsPanel } from "./Panels/ToolSettings";
import {
  PanelButton,
  PanelSlider,
  PanelText,
  PanelTextSwitch,
  PanelTitle,
} from "./Panels/PanelComponents";
import ToolSettingsPanel from "./Panels/ToolSettings";
import Globals from "../../Globals";

var FPS = 120;

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    var toolManager = new ToolManager(this.props.Doc);
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

    this.cp = new ColorSettingsPanel(toolManager, this);
    var sp = new ToolSettingsPanel(toolManager, this);

      this.setState({
      Panels: [toolManager.panel, sp, testPanel],
      });

    // get canvas
    const canvas = this.canvasRef.current;

    window.addEventListener("resize", this.resizeCallback);
    canvas.addEventListener("click", this.mouseKeyCallback);
    canvas.addEventListener("mousedown", this.mouseKeyCallback);
    canvas.addEventListener("mouseup", this.mouseKeyCallback);
    canvas.addEventListener("mousemove", this.mouseKeyCallback);
    canvas.addEventListener("touchstart", this.mouseKeyCallback);
    canvas.addEventListener("touchmove", this.mouseKeyCallback);
    canvas.addEventListener("touchend", this.mouseKeyCallback);
    document.addEventListener("keypress", this.mouseKeyCallback);
    document.addEventListener("keydown", this.mouseKeyCallback);

    setInterval(() => this.forceUpdate(), 1000 / FPS);
  }

  // runs after every page render -> checks for events
  componentDidUpdate(prevProps, prevState) {
    // set new tool manager and panels if document changes
    if (prevProps.Doc !== this.props.Doc) {
      // tool reset procedures
      selectionT.selectedObjects = [];

      // new states
      this.setState({ Doc: this.pro });
      console.log("canvas: doc changed");
      var toolManager = new ToolManager(this.props.Doc);
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

      this.cp = new ColorSettingsPanel(toolManager, this);
      var sp = new ToolSettingsPanel(toolManager, this);

      this.setState({
        Panels: [toolManager.panel, sp, testPanel],
      });
    }

    const context = this.canvasRef.current.getContext("2d");
    this.updateCanvas(context);
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
    console.log();
    // reset canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = Globals.COLORS.CANVAS_BG;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    this.props.Doc.draw(context);
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
    if (
      e.type === "touchstart" ||
      e.type === "touchmove" ||
      e.type === "touchend"
    ) {
      e = this.handleTouchEvent(e);
    }

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
        if (panel.checkBoundsCollision(e.clientX, e.clientY)) {
          return;
        }
      }
    }
    if (this.props.Doc.editable) this.state.Tools.toolUse(e);
  }

  handleTouchEvent(e) {
    var touch = e.changedTouches[0];
    console.log(e.type);
    var eType = "";
    switch (e.type) {
      case "touchstart":
        eType = "mousedown";
        break;
      case "touchmove":
        eType = "mousemove";
        break;
      case "touchend":
        eType = "mouseup";
        break;
      default:
        return;
    }
    console.log(eType);

    var simulatedMouseEvent = new MouseEvent(eType, {
      clientX: touch.clientX,
      clientY: touch.clientY,
      ctrlKey: touch.ctrlKey,
      shiftKey: touch.shiftKey,
      altKey: touch.altKey,
      metaKey: touch.metaKey,
      button: touch.button,
    });
    return simulatedMouseEvent;
    // this.canvasRef.current.dispatchEvent(simulatedMouseEvent)
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
