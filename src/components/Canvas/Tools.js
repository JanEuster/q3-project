import Toolbox from "./Panels/Toolbox";
import { Circle, Rectangle } from "./Objects/BasicShapes";
import Path from "./Objects/Paths";

// function object
class Tool {
  constructor(name) {
    this.name = name;
    this.icon = null; //TODO:NaN or null?
    this.select = NaN;
    this.use = NaN;
    this.deselect = NaN;
    this.inUse = false;
  }
}

class SelectionTool extends Tool {
  constructor() {
    super("select");
    this.selectedObject = NaN;
  }
  select() {}
  use() {}
  deselct() {}
}

class PencilTool {
  constructor() {
    this.currentPath = NaN;
    this.eventCount = 0;

    this.use = this.use.bind(this);
  }
  select(e) {}
  use(e, Doc, screenDimensions) {
    this.eventCount += 1;
    console.log(this.eventCount);
    // Doc.addObject(new Circle(e.pageX, e.pageY, 300, "red"));
    if (e.type == "mousedown") {
      console.log("NEW PATH");
      this.inUse = true;
      let coords = Doc.localCoords(
        e.pageX,
        e.pageY,
        screenDimensions.width,
        screenDimensions.height
      );
      this.currentPath = new Path(
        [[coords.x, coords.y]],
        ToolManager.strokeWidth,
        ToolManager.strokeStyle
      );
      Doc.addObject(this.currentPath);
    } else if (this.inUse && e.type == "mousemove") {
      console.log("PATH CONTINUE");
      this.currentPath.addPoint(e.pageX, e.pageY);
    } else if (this.inUse && e.type == "mouseup") {
      console.log("PATH END");
      this.currentPath.addPoint(e.pageX, e.pageY);
      this.inUse = false;
      this.currentPath = NaN;
    }
  }
  deselct(e) {}
}

class ToolManager {
  constructor(Doc) {
    this.Doc = Doc;
    this.context = undefined;
    this.tools = [];
    this.tools.push(new SelectionTool(), new PencilTool());
    this.activeTool = this.tools[1];
    this.strokeWidth = 5;
    this.strokeStyle = "#111111";

    this.screenDimensions = {};
    console.log("screen Dimensions", this.screenDimensions);

    this.panel = new Toolbox();
    this.toolUse = this.toolUse.bind(this);
  }
  setScreenDimensions(dimensions) {
    this.screenDimensions = dimensions;
  }
  setCanvasContext(context) {
    this.context = context;
  }

  toolSelect(e) {
    this.activeTool.select(e);
  }
  toolUse(e) {
    // this.activeTool.use(e);
    this.activeTool.use(e, this.Doc, this.screenDimensions);
    this.Doc.draw(this.context);
    this.panel.render(this.context);
  }
  toolDeselect(e) {
    this.activeTool.deselect(e);
  }

  // switchTool(toolName) {
  //   this.tools.forEach((tool) => {
  //     console.log(tool);
  //     if (tool.name == toolName) {
  //       this.activeTool = tool;
  //       return;
  //     }
  //   });
  //   throw new ReferenceError(`Tool ${toolName} not defined`);
  // }
}

export default ToolManager;
export { Tool };
