import Toolbox from "./Panels/Toolbox";
import { Circle, Rectangle } from "./Objects/BasicShapes";
import Path from "./Objects/Paths";
//import Artboard from "./Artboard";

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
    this.pointsToAdd = [];
    this.lastMoveEvent = new Date();

    this.use = this.use.bind(this);
  }
  select(e) {}
  use(e, Doc, screenDimensions) {
    this.eventCount += 1;
    console.log("event count:", this.eventCount);
    let coords = Doc.localCoords(
      e.pageX,
      e.pageY,
      screenDimensions.width,
      screenDimensions.height
    );
    if (e.type == "mousedown") {
      console.log("NEW PATH");
      this.inUse = true;
      Doc.addObject(new Circle(coords.x, coords.y, 8, "red", undefined, 0));
      this.currentPath = new Path(
        [[coords.x, coords.y]],
        ToolManager.strokeWidth,
        ToolManager.strokeStyle
      );
      Doc.addObject(this.currentPath);
    } else if (this.inUse && e.type == "mousemove") {
      this.currentPath.addPoint(coords.x, coords.y);
      // this.pointsToAdd.push([coords.x, coords.y]);
      // if ((new Date().getTime() - this.lastMoveEvent.getTime()) > 20) {
      //   // at least 20 ms between updates
      //   this.currentPath.addPoints(this.pointsToAdd);
      //   this.pointsToAdd = [];
      //   console.log("agjkasjgkldjgklasdjklgasdjklögjasdkljgklasdjlgkasdklgjsdl")
      //   this.lastMoveEvent = new Date();
      // }
    } else if (this.inUse && e.type == "mouseup") {
      console.log("PATH END");
      this.currentPath.addPoints(coords.x, coords.y);
      Doc.addObject(new Circle(coords.x, coords.y, 8, "red", undefined, 0));

      this.inUse = false;
      this.currentPath = NaN;
    }
  }
  deselct(e) {}
}

class Eraser extends PencilTool {
  constructor(radius = "10") {
    super();
    this.radius = radius
  }
  use(e, Doc, screenDimensions) {
    let coords = Doc.localCoords(
      e.pageX,
      e.pageY,
      screenDimensions.width,
      screenDimensions.height
    );

    if (e.type == "mousedown") {
      this.inUse = true;
      Doc.addObject(new Circle(coords.x, coords.y, this.radius, "red", undefined, 0)); //colour --> getBackgroundColour Artboard Class
      this.currentPath = new Path(
        [[coords.x, coords.y]],
        ToolManager.strokeWidth,
        Doc.getBackgroundColour()
      );
      Doc.addObject(this.currentPath);
    } else if(this.inUse && e.type == "mousemove") {
      this.currentPath.addPoint(coords.x,coords.y);
    } else if(this.inUse && e.type == "mouseup") {
      this.currentPath.addPoints(coords.x,coords.y);
      Doc.addObject(new Circle(coords.x, coords.y, this.radius, "red", undefined, 0));

      this.inUse = false;
      this.currentPath = NaN;
    }
  }
}

class ToolManager {
  constructor(Doc) {
    this.Doc = Doc;
    this.tools = [];
    this.tools.push(new SelectionTool(), new PencilTool(), new Eraser());
    this.activeTool = this.tools[2];
    this.strokeWidth = 5;
    this.strokeStyle = "#111111";

    this.screenDimensions = {};

    this.panel = new Toolbox();
    this.toolUse = this.toolUse.bind(this);
  }
  setScreenDimensions(dimensions) {
    this.screenDimensions = dimensions;
  }

  toolSelect(e) {
    this.activeTool.select(e);
  }
  toolUse(e) {
    // this.activeTool.use(e);
    this.activeTool.use(e, this.Doc, this.screenDimensions);
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