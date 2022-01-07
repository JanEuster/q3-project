import Toolbox from "./Panels/Toolbox";
import { Circle, Rectangle } from "./Objects/BasicShapes";
import Path from "./Objects/Paths";
import colors from "../colors.json"
import Text from "./Objects/Text";


// function object
class SelectionTool {
  constructor() {
    this.selectedObject = NaN;
    this.moving = false
    this.lastPos = { x: NaN, y: NaN }
    
    this.lastEventUp = false // was last event mouseup -> next click event can be ignored

    this.icon = "assets/icons/tools/select.png"
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

  select(obj) {
    this.selectedObject = obj
   }
  
  use(e, Doc, screenDimensions) {

    if (this.selectedObject && e.type === "keydown" && e.key === "Delete") {
      Doc.removeObject(this.selectedObject)
      this.selectedObject = NaN
    }

    if (this.lastEventUp && e.type === "click") {
      return
    } // if last event was mouseup mouse move has just finished and therefore a click at the position of mouseup is not needed
    this.lastEventUp = false


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
      if (this.selectedObject === eraserT) {
        this.selectedObject = NaN;
      }
      
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
      this.lastEventUp = true
   }

  }

  deselect() { 
    return this.selectedObject
  }

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
    this.lastPath = NaN
    this.eventCount = 0;
    this.pointsToAdd = [];
    this.lastMoveEvent = new Date();


    // this.use = this.use.bind(this);
    this.icon = "assets/icons/tools/select.png"
  }

  select(obj) { 
  }
  
  use(e, Doc, screenDimensions) {
    this.eventCount += 1;
    
    let coords = Doc.localCoords(
      e.pageX,
      e.pageY,
      screenDimensions.width,
      screenDimensions.height
    );
    if (e.type === "mousedown") {
      this.inUse = true;
      // Doc.addObject(new Circle(coords.x, coords.y, 8, "red", undefined, 0));
      this.currentPath = new Path(
        [[coords.x, coords.y]],
        ToolManager.strokeWidth,
        ToolManager.strokeStyle
      );
      Doc.addObject(this.currentPath);

    } else if (this.inUse && e.type === "mousemove") {
      this.currentPath.addPoint(coords.x, coords.y);
      // this.currentPath.cleanUp()

    } else if (this.inUse && e.type === "mouseup") {
      this.currentPath.addPoints(coords.x, coords.y);
      this.currentPath.cleanUp()
      // Doc.addObject(new Circle(coords.x, coords.y, 8, "red", undefined, 0));

      this.inUse = false;
      this.lastPath = this.currentPath
      this.currentPath = NaN;
    }
  }

  deselect() { 
    return this.lastPath
  }
  
  graphic(context, artMeta) {}
}

class EraserTool extends PencilTool {
  constructor(radius = "10") {
    super();
    this.radius = radius;
    this.returnPath = NaN;

    this.icon = "assets/icons/tools/select.png"
  }
  use(e, Doc, screenDimensions) {
    let coords = Doc.localCoords(
      e.pageX,
      e.pageY,
      screenDimensions.width,
      screenDimensions.height
    );

    if (e.type === "mousedown") {
      this.inUse = true;
      // Doc.addObject(new Circle(coords.x, coords.y, this.radius, "red", undefined, 0)); //colour --> getBackgroundColour Artboard Class
      this.currentPath = new Path(
        [[coords.x, coords.y]],
        ToolManager.strokeWidth,
        Doc.getBackgroundColour(),
        false
      );
      Doc.addObject(this.currentPath);
    } else if(this.inUse && e.type === "mousemove") {
      if (Doc.checkCollision(e.pageX, e.pageY)) {
        this.returnPath = this.currentPath;
        this.inUse = false;
        this.currentPath = NaN;
        this.deselect()
      } else { this.currentPath.addPoint(coords.x,coords.y); }
    } else if(this.inUse && e.type === "mouseup") {
      this.currentPath.addPoints(coords.x,coords.y);
      // Doc.addObject(new Circle(coords.x, coords.y, this.radius, "red", undefined, 0));

      this.inUse = false;
      this.currentPath = NaN;
    }
  }

  deselect() {
    return this.returnPath
  }
}

class TextTool {
  constructor() {
    this.activeObject = NaN;

    this.icon = "assets/icons/tools/select.png"
  }

  select(obj) {
    if (obj instanceof Text) {
      this.activeObject = obj
    }
   }
  
  use(e, Doc, screenDimensions) {

    let coords = Doc.localCoords(
    e.pageX,
    e.pageY,
    screenDimensions.width,
    screenDimensions.height
    );

    if (e.type === "click") {
      this.activeObject = new Text(coords.x, coords.y, "lol")

    } else if (e.type === "mousedown") {
      this.activeObject = new Text(coords.x, coords.y, "lol")
      Doc.objects.push(this.activeObject)
    } else if (this.activeObject && e.type === "keypress") {
      this.activeObject.addText(e.key)
    } else if (this.activeObject && e.type === "keydown") {

      if (e.key === "Escape") {
        this.activeObject = NaN
      } else if (e.key === "Backspace") {
        this.activeObject.removeLastChar()
      }
      
    }    
  }

  deselect() { 
    return this.activeObject
  }

  graphic(context, artMeta) {
    // show selection box
    if (this.activeObject) {
      let x = this.activeObject.boundingBox.coords[0]
      let y = this.activeObject.boundingBox.coords[1]
      let w = this.activeObject.boundingBox.wh[0]
      let h = this.activeObject.boundingBox.wh[1]

      let pixelRatio = artMeta.pixelRatio
      let baseCoord = artMeta.baseCoord
      
      let offset = 32
      // context.fillStyle = "#00FF00";
      context.lineWidth = 3; //TODO: lineWidth parameter;
      context.strokeStyle = colors.midorange;

      context.strokeRect(
        baseCoord.w + pixelRatio * (x - offset),
        baseCoord.h + pixelRatio * (y - offset),
        pixelRatio * (w + offset * 2) + 10,
        pixelRatio * (h + offset * 2)
      );

      // text cursor
      context.fillRect(
        baseCoord.w + pixelRatio * (this.activeObject.xCoord + this.activeObject.width) +4,
        baseCoord.h + pixelRatio * (this.activeObject.yCoord - this.activeObject.height),
        3,
        pixelRatio * this.activeObject.height
      )
    }
  }
}


var selectionT = new SelectionTool()
var pencilT = new PencilTool()
var eraserT = new EraserTool()
var textT = new TextTool()

class ToolManager {
  constructor(Doc) {
    this.Doc = Doc;
    this.tools = [];
    this.tools.push(selectionT, pencilT, eraserT, textT);
    this.toolUse = this.toolUse.bind(this);
    this.activeTool = this.tools[0];
    this.strokeWidth = 5;
    this.strokeStyle = "#111111";

    this.screenDimensions = {};

    this.lastObj = NaN

    this.panel = new Toolbox(this);
  }
  setScreenDimensions(dimensions) {
    this.screenDimensions = dimensions;
  }

  toolSelect() {
    this.activeTool.select(this.lastObj);
  }
  toolUse(e) {
    this.activeTool.use(e, this.Doc, this.screenDimensions);
  }
  toolDeselect() {
    this.lastObj = this.activeTool.deselect();
  }

  toolGraphic(context, artMeta) {
    // function to display tool related graphics on redraw; i.e. selection box if selection tool is this.activeTool
    this.activeTool.graphic(context, artMeta)
  }

}

export default ToolManager;
export { selectionT, pencilT, eraserT };
