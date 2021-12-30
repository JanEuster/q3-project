import Toolbox from "./Panels/Toolbox";
import { Circle, Rectangle } from "./Objects/BasicShapes";
import Path from "./Objects/Paths";

const colors = require("../colors.json");

// function object
class SelectionTool {
  constructor() {
    this.selectedObject = NaN;
    this.moving = false
    this.lastPos = {x: NaN, y: NaN}
  }

  collisionOnObjects(coords, scrD, Doc) {
    let objects = Doc.objects.slice(0).reverse() // create reveresed copy of objects list
    let pixelRatio = Doc.getArtboardMetadata(scrD.width, scrD.height).pixelRatio

    for (var i = 0; i < objects.length; i++) {
      let obj = objects[i]

      if (obj.boundingBox.checkCollision(coords.x, coords.y, pixelRatio)) {
        return obj
      }
      
    }
    return false
  }

  select(e) { }
  
  use(e, Doc, screenDimensions) {

    let coords = Doc.localCoords(
    e.pageX,
    e.pageY,
    screenDimensions.width,
    screenDimensions.height
    );
    if (e.type === "click") {
      this.selectedObject = this.collisionOnObjects(coords, screenDimensions, Doc)

    } else if (e.type === "mousedown") {
      this.selectedObject = this.collisionOnObjects(coords, screenDimensions, Doc)
      if (this.selectedObject) {
        this.moving = true
      }
      
      this.lastPos.x = coords.x
      this.lastPos.y = coords.y
      

    } else if (this.moving && e.type === "mousemove") {
      let xDelta = coords.x - this.lastPos.x
      let yDelta = coords.y - this.lastPos.y

      this.selectedObject.move(xDelta, yDelta)

      this.lastPos.x = coords.x
      this.lastPos.y = coords.y


    } else if (this.selectedObject && e.type === "mouseup") {
      this.moving = false
   }

  }

  deselect(e) { }

  graphic(context, artMeta) {
    // show selection box
    if (this.selectedObject) {
      let x = this.selectedObject.boundingBox.coords[0]
      let y = this.selectedObject.boundingBox.coords[1]
      let w = this.selectedObject.boundingBox.wh[0]
      let h = this.selectedObject.boundingBox.wh[1]

      let pixelRatio = artMeta.pixelRatio
      let baseCoord = artMeta.baseCoord
      
      let offset = 32
      // context.fillStyle = "#00FF00";
      context.lineWidth = 3; //TODO: lineWidth parameter;
      context.strokeStyle = colors.midorange;

      context.strokeRect(
        baseCoord.w + pixelRatio * (x - offset),
        baseCoord.h + pixelRatio * (y - offset),
        pixelRatio * (w + offset*2),
        pixelRatio * (h + offset*2)
      );
    }
  }

}


class PencilTool {
  constructor() {
    this.currentPath = NaN;
    this.eventCount = 0;
    this.pointsToAdd = [];
    this.lastMoveEvent = new Date();

    // this.use = this.use.bind(this);
  }

  select(e) { }
  
  use(e, Doc, screenDimensions) {
    this.eventCount += 1;
    // console.log("event count:", this.eventCount);
    let coords = Doc.localCoords(
      e.pageX,
      e.pageY,
      screenDimensions.width,
      screenDimensions.height
    );
    if (e.type == "mousedown") {
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

    } else if (this.inUse && e.type == "mouseup") {
      this.currentPath.addPoints(coords.x, coords.y);
      Doc.addObject(new Circle(coords.x, coords.y, 8, "red", undefined, 0));

      this.inUse = false;
      this.currentPath = NaN;
    }
  }

  deselect(e) { }
  
  graphic(context, artMeta) {}
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



var selectionT = new SelectionTool()
var pencilT = new PencilTool()
var eraserT = new Eraser()

class ToolManager {
  constructor(Doc) {
    this.Doc = Doc;
    this.tools = [];
    this.tools.push(selectionT, pencilT, eraserT);
    this.toolUse = this.toolUse.bind(this);
    this.activeTool = this.tools[0];
    this.strokeWidth = 5;
    this.strokeStyle = "#111111";

    this.screenDimensions = {};

    this.panel = new Toolbox();
  }
  setScreenDimensions(dimensions) {
    this.screenDimensions = dimensions;
  }

  toolSelect(e) {
    this.activeTool.select(e);
  }
  toolUse(e) {
      this.activeTool.use(e, this.Doc, this.screenDimensions);
  }
  toolDeselect(e) {
    this.activeTool.deselect(e);
  }

  toolGraphic(context, artMeta) {
    // function to display tool related graphics on redraw; i.e. selection box if selection tool is this.activeTool
    this.activeTool.graphic(context, artMeta)
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
export { selectionT, pencilT, eraserT };
