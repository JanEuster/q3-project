import Toolbox from "./Panels/Toolbox";
import { Circle, Rectangle, Triangle } from "./Objects/BasicShapes";
import Path from "./Objects/Paths";
import GLOBALS from "../../Globals";
import Text from "./Objects/Text";
import Panel from "./Panels/BasePanel";
import ToolSettingsPanel from './Panels/ToolSettings';



// box that is shown when user drags selection tool across screen to select multiple objects
class SelectionBox {
  constructor() {
    this.enabled = false;
    this.startCoords = { x: 0, y: 0 };
    this.endCoords = { x: 0, y: 0 };
  }
  setStart(x, y) {
    this.startCoords.x = x;
    this.startCoords.y = y;
  }
  setEnd(x, y) {
    this.endCoords.x = x;
    this.endCoords.y = y;
  }

  reset() {
    this.enabled = false;
    this.startCoords = { x: 0, y: 0 };
    this.endCoords = { x: 0, y: 0 };
  }

  showIfEnabled(context, Doc) {
    // convert local artboard coords to global screen coords for drawing 
    let startCoords = Doc.globalCoords(this.startCoords.x, this.startCoords.y)
    let endCoords = Doc.globalCoords(this.endCoords.x, this.endCoords.y);

    if (this.enabled) {
      context.fillStyle = "rgba(13, 121, 242, 0.1)";
      context.strokeStyle = "rgba(13, 121, 242, 0.65)";
      context.lineWidth = 3;

      context.fillRect(
        startCoords.x,
        startCoords.y,
        endCoords.x - startCoords.x,
        endCoords.y - startCoords.y
      );
      context.strokeRect(
        startCoords.x,
        startCoords.y,
        endCoords.x - startCoords.x,
        endCoords.y - startCoords.y
      );
    }
  }
}
// function object
class SelectionTool {
  constructor() {
    this.selectedObjects = [];
    this.moving = false;
    this.lastPos = { x: NaN, y: NaN };
    
    this.selectionBox = new SelectionBox()

    this.lastEventUp = false; // was last event mouseup -> next click event can be ignored

    this.name = "select";
    this.icon = "assets/icons/tools/select.png";
  }

  collisionOnObjects(coords, Doc) {
    let objects = Doc.objects.slice(0).reverse(); // create reveresed copy of objects list
    let pixelRatio = Doc.getArtboardMetadata().pixelRatio;

    for (var i = 0; i < objects.length; i++) {
      let obj = objects[i];

      if (obj.boundingBox.checkCollision(coords.x, coords.y, pixelRatio)) {
        return [obj];
      }
    }
    return [];
  }
    collisionOnSelected(coords, Doc) {
    let objects = this.selectedObjects; // create reveresed copy of objects list
    let pixelRatio = Doc.getArtboardMetadata().pixelRatio;

    for (var i = 0; i < objects.length; i++) {
      let obj = objects[i];

      if (obj.boundingBox.checkCollision(coords.x, coords.y, pixelRatio)) {
        return [obj];
      }
    }
    return [];
  }
  collisionInBox(Doc) {
    let collisionObjects = [];
    let pixelRatio = Doc.getArtboardMetadata().pixelRatio;

    Doc.objects.forEach(obj => {
      if (
        obj.boundingBox.checkBoxCollision(
          this.selectionBox.startCoords,
          this.selectionBox.endCoords,
          pixelRatio
        )
      ) {
        collisionObjects.push(obj);
      }
    });
    return collisionObjects;
  }

  select(obj) {
    this.selectedObjects = [obj];
  }

  use(e, Doc) {
    if (this.selectedObjects && e.type === "keydown" && e.key === "Delete") {

      this.selectedObjects.forEach(obj => Doc.removeObject(obj));
      this.selectedObjects = [];
      this.moving = false;
    }

    this.lastEventUp = false;

    let coords = Doc.localCoords(
      e.clientX,
      e.clientY
    );


    switch (e.type) {
      
      // if click: select single object
      case "click":
        this.selectedObjects = this.collisionOnObjects(coords, Doc);
        break;
    
      // if mousedown: begin moving objects, if there is a collision at cursor position
      //               else begin drawing a selection box for the duration of the user dragging the cursor
      case "mousedown":
        let collisionObjs = this.collisionOnObjects(coords, Doc)
        if (this.collisionOnSelected(coords, Doc).length) {
          this.moving = true;
        } else {
          this.selectionBox.enabled = true;
          this.selectionBox.setStart(coords.x, coords.y);
          this.selectionBox.setEnd(coords.x, coords.y);
          this.selectedObjects = [];
        }
        this.lastPos.x = coords.x
        this.lastPos.y = coords.y

        if (this.selectedObjects.indexOf(collisionObjs[0] >= 0)) this.moving = true;

        break;

      // if mousemove: if objects are selected and being moved set their new location according to the cursors current position
      //               else if the selection box is enabled set the position for that
      case "mousemove":
        if (
          this.selectedObjects !== [] &&
          this.moving &&
          this.collisionOnSelected(coords, Doc).length
        ) {
          let xDelta = coords.x - this.lastPos.x;
          let yDelta = coords.y - this.lastPos.y;

          this.selectedObjects.forEach((obj) => obj.move(xDelta, yDelta));

          this.lastPos.x = coords.x;
          this.lastPos.y = coords.y;
        } else if (this.selectionBox.enabled) {
          this.selectionBox.setEnd(coords.x, coords.y);
        }
      
         break;

      // if mouseup: when there are selected objects stop moving them
      //             else if the selection box is enabled find objects within dragged box and add them to the array of selected objects
      case "mouseup":
        if (this.selectedObjects.length) {
          this.moving = false;
          this.lastEventUp = true;
        } else if (this.selectionBox.enabled) {
          console.log(coords.x, coords.y, e.pageX, e.pageY);
          this.selectionBox.setEnd(coords.x, coords.y);

          if (
            Math.abs(this.selectionBox.endCoords.x - this.selectionBox.startCoords.x) >
              1 ||
            Math.abs(this.selectionBox.endCoords.x - this.selectionBox.startCoords.x) > 1
          ) {
            this.selectedObjects = this.collisionInBox(Doc);
          } else {
            this.selectedObjects = this.collisionOnObjects(this.selectionBox.startCoords, Doc)
          }
            
        }
        this.selectionBox.reset();
        this.moving = false;

        this.lastPos.x = coords.x;
        this.lastPos.y = coords.y;

        break;
   
      
        default:
          // console.warn("undefined behavior for", e.type)
    }

    }
  

  deselect() {
    return this.selectedObjects;
  }

  graphic(context, artMeta, Doc) {
    // show selection box
    if (this.selectedObjects !== []) {
      this.selectedObjects.forEach((obj) => {
        let x = obj.boundingBox.coords[0];
        let y = obj.boundingBox.coords[1];
        let w = obj.boundingBox.wh[0];
        let h = obj.boundingBox.wh[1];

        let pixelRatio = artMeta.pixelRatio;
        let baseCoord = artMeta.baseCoord;

        let offset = 32;
        // context.fillStyle = "#00FF00";
        context.lineWidth = 3; //TODO: lineWidth parameter;
        context.strokeStyle = GLOBALS.COLORS.midorange;

        context.strokeRect(
          baseCoord.w + pixelRatio * (x - offset),
          baseCoord.h + pixelRatio * (y - offset),
          pixelRatio * (w + offset * 2),
          pixelRatio * (h + offset * 2)
        );
      });
    }      

    this.selectionBox.showIfEnabled(context, Doc)
  }
}

class PencilTool {
  constructor() {
    this.currentPath = NaN;
    this.lastPath = NaN;
    this.eventCount = 0;
    this.pointsToAdd = [];
    this.lastMoveEvent = new Date();

    this.toolManager = undefined;

    this.name = "pencil";
    // this.use = this.use.bind(this);
    this.icon = "assets/icons/tools/pencil.png";
  }

  select(obj) {}

  use(e, Doc) {
    this.eventCount += 1;
    
    var coords = Doc.localCoords(
      e.clientX,
      e.clientY,
      window.innerWidth,
      window.innerHeight
    );

    if (e.type === "mousedown") {
      this.inUse = true;
      // Doc.addObject(new Circle(coords.x, coords.y, 8, "red", undefined, 0));
      this.currentPath = new Path(
        [[coords.x, coords.y]],
        this.toolManager.strokeWidthPencil,
        this.toolManager.strokeStyle
      );
      Doc.addObject(this.currentPath);
    } else if (
      this.inUse &&
      (e.type === "mousemove")
    ) {
      this.currentPath.addPoint(coords.x, coords.y);
      // this.currentPath.cleanUp()
    } else if (this.inUse && (e.type === "mouseup")) {
      this.currentPath.addPoints(coords.x, coords.y);
      this.currentPath.cleanUp();
      // Doc.addObject(new Circle(coords.x, coords.y, 8, "red", undefined, 0));

      this.inUse = false;
      this.lastPath = this.currentPath;
      this.currentPath = NaN;
    }
  }

  deselect() {
    return this.lastPath;
  }

  graphic(context, artMeta) {}
}

class EraserTool extends PencilTool {
  constructor() {
    super();

    this.toolManager = undefined;

    this.name = "eraser";
    this.icon = "assets/icons/tools/eraser.png";
  }
  use(e, Doc) {
    let coords = Doc.localCoords(
      e.clientX,
      e.clientY,
      window.innerWidth,
      window.innerHeight
    );

    if (e.type === "mousedown") {
      this.inUse = true;
      // Doc.addObject(new Circle(coords.x, coords.y, this.radius, "red", undefined, 0)); //colour --> getBackgroundColour Artboard Class
      this.currentPath = new Path(
        [[coords.x, coords.y]],
        this.toolManager.strokeWidthEraser,
        Doc.getBackgroundColour()
      );
      Doc.addObject(this.currentPath);
    } else if(this.inUse && (e.type === "mousemove")) {
      this.currentPath.addPoint(coords.x,coords.y);
    } else if(this.inUse && (e.type === "mouseup")) {
      this.currentPath.addPoints(coords.x,coords.y);
      // Doc.addObject(new Circle(coords.x, coords.y, this.radius, "red", undefined, 0));

      this.inUse = false;
      this.currentPath = NaN;
    }
  }
}

class TextTool {
  constructor() {
    this.activeObject = NaN;

    this.toolManager = undefined;

    this.name = "text";

    this.icon = "assets/icons/tools/text.png";
  }

  select(obj) {
    if (obj instanceof Text) {
      this.activeObject = obj;
    }
  }

  use(e, Doc) {
    let coords = Doc.localCoords(
      e.clientX,
      e.clientY,
      window.innerWidth,
      window.innerHeight
    );

    if (e.type === "click") {
      this.activeObject = new Text(
        coords.x,
        coords.y,
        "",
        this.toolManager.font,
        this.toolManager.fontSize
      );
    } else if (e.type === "mousedown") {
      this.activeObject = new Text(
        coords.x,
        coords.y,
        "",
        this.toolManager.font,
        this.toolManager.fontSize
      );
      Doc.objects.push(this.activeObject);
    } else if (this.activeObject && e.type === "keypress") {
      this.activeObject.addText(e.key);
    } else if (this.activeObject && e.type === "keydown") {
      if (e.key === "Escape") {
        // console.log(this.activeObject.text.length);
        if (this.activeObject.text.length == 0) {
          Doc.removeObject(this.activeObject);
        } //check if textlength 0
        this.activeObject = NaN;
      } else if (e.key === "Backspace") {
        this.activeObject.removeLastChar();
      }
    }

    if (this.activeObject) {
      this.activeObject.fontSize = this.toolManager.fontSize;
      this.activeObject.setWidthHeight();
      this.activeObject.setBounds();
    }
  }

  deselect() {
    if (this.activeObject && this.activeObject.text.length == 0) {
      this.toolManager.Doc.removeObject(this.activeObject);
      this.activeObject = NaN;
    }
    return this.activeObject;
  }

  graphic(context, artMeta) {
    // show selection box
    if (this.activeObject) {
      let x = this.activeObject.boundingBox.coords[0];
      let y = this.activeObject.boundingBox.coords[1];
      let w = this.activeObject.boundingBox.wh[0];
      let h = this.activeObject.boundingBox.wh[1];

      let pixelRatio = artMeta.pixelRatio;
      let baseCoord = artMeta.baseCoord;

      let offset = 32;
      // context.fillStyle = "#00FF00";
      context.lineWidth = 3; //TODO: lineWidth parameter;
      context.strokeStyle = GLOBALS.COLORS.midorange;

      context.strokeRect(
        baseCoord.w + pixelRatio * (x - offset),
        baseCoord.h + pixelRatio * (y - offset),
        pixelRatio * (w + offset * 2) + 10,
        pixelRatio * (h + offset * 2)
      );

      // text cursor
      context.fillRect(
        baseCoord.w +
          pixelRatio * (this.activeObject.xCoord + this.activeObject.width) +
          4,
        baseCoord.h +
          pixelRatio * (this.activeObject.yCoord - this.activeObject.height),
        3,
        pixelRatio * this.activeObject.height
      );
    }
  }
}

class ShapeTool {
  constructor() {
    this.icon = "assets/icons/tools/shapes.png";
    this.shapes = ["circle", "rectangle", "triangle"];

    this.name = "shapes";

    this.currentShape = undefined;
    this.lastShape = this.currentShape;
    this.toolManager = undefined;
  }
  select() {}

  use(e, Doc) {
    let coords = Doc.localCoords(
      e.clientX,
      e.clientY,
      window.innerWidth,
      window.innerHeight
      );
      
      let shape = this.toolManager.shape //this.shapes[2];

      if (e.type === "mousedown") {
        //console.log(coords.x, coords.y)
        this.inUse = true;
        this.x1 = coords.x;
        this.y1 = coords.y;
        
        if (shape === "circle") {
          this.currentShape = new Circle(this.x1, this.y1, 0); //x, y, r, fC, bC, bW
        } else if (shape === "rectangle") {
          this.currentShape = new Rectangle(this.x1, this.y1, 0, 0);
        } else if (shape === "triangle") {
          this.currentShape = new Triangle(this.x1, this.y1, 0, 0);
        } else { console.log("ERROR SHAPE-SELECTION") }

        this.currentShape.borderWidth = this.toolManager.borderWidth;
        Doc.addObject(this.currentShape)
        
        //console.log(this.currentShape)
      } else if (this.inUse && (e.type === "mousemove")) {
        
        //console.log(this.currentShape)
        
        if (this.currentShape instanceof Triangle) {
          this.currentShape.width = coords.x - this.x1
          this.currentShape.height = coords.y - this.y1

        } else if (this.currentShape instanceof Circle) {
          this.currentShape.radius = Math.sqrt(Math.pow((this.x1 - coords.x), 2) + Math.pow((this.y1 - coords.y), 2));
        
        } else if (this.currentShape instanceof Rectangle) {
          this.currentShape.width = coords.x - this.x1
          this.currentShape.height = coords.y - this.y1

          if (this.currentShape.width < 0 && this.currentShape.height > 0) {
            this.currentShape.xCoord = coords.x;
          } else if (this.currentShape.width > 0 && this.currentShape.height < 0) {
            this.currentShape.yCoord = coords.y;
          } else if (this.currentShape.width < 0 && this.currentShape.height < 0) {
            this.currentShape.xCoord = coords.x;
            this.currentShape.yCoord = coords.y;
          } else {}
        }
      }
      
      else if (this.inUse && (e.type === "mouseup")) {
        if (this.currentShape.width == 0 || this.currentShape.height == 0) {
            Doc.removeObject(this.currentShape);
            this.currentShape = NaN;
            return;
          }

      if (this.currentShape instanceof Circle) {
        var x = this.currentShape.xCoord - this.currentShape.radius;
        var y = this.currentShape.yCoord - this.currentShape.radius;
        var width = this.currentShape.radius * 2;
        var height = this.currentShape.radius * 2;
      } else {
        var x = this.currentShape.xCoord;
        var y = this.currentShape.yCoord;
        var width = this.currentShape.width;
        var height = this.currentShape.height;

        if (this.currentShape instanceof Triangle) {
          if (width < 0 && height > 0) {
            x += width;
          } else if (width > 0 && height < 0) {
            y += height;
          } else if (width < 0 && height < 0) {
            x += width;
            y += height;
          } else {
          }
        }
      }
      //console.log("TOOLSCOORD: " + x, y, width, height)
      this.currentShape.boundingBox.setBounds(
        x,
        y,
        x + Math.abs(width),
        y + Math.abs(height)
      );
      this.inUse = false;
      this.lastShape = this.currentShape;
      this.currentShape = undefined;
    }
  }
  deselect() {
    return this.lastShape;
  }
  graphic(context, artMeta) {}
}

var selectionT = new SelectionTool();
var pencilT = new PencilTool();
var eraserT = new EraserTool();
var textT = new TextTool();
var shapeT = new ShapeTool();

class ToolManager {
  constructor(Doc) {
    this.Doc = Doc;
    this.tools = [];
    this.tools.push(selectionT, pencilT, eraserT, textT, shapeT);
    this.toolUse = this.toolUse.bind(this);
    this.activeTool = this.tools[0];
    this.strokeWidthPencil = 10;
    this.strokeWidthEraser = 10;
    this.strokeStyle = "#111111";
    this.font = "Iosevka bold";
    this.fontSize = 100;

    this.lastObj = NaN;

    pencilT.toolManager = this;
    eraserT.toolManager = this;
    textT.toolManager = this;

    this.shape = "triangle";
    this.borderWidth = 25;

    this.lastObj = NaN;

    pencilT.toolManager = this;
    eraserT.toolManager = this;
    textT.toolManager = this;
    shapeT.toolManager = this;

    this.panel = new Toolbox(this);
    this.settingsPanel = new ToolSettingsPanel(this);
  }

  toolSelect() {
    this.activeTool.select(this.lastObj);
  }
  toolUse(e) {
    this.activeTool.use(e, this.Doc);
  }
  toolDeselect() {
    this.lastObj = this.activeTool.deselect();
  }

  toolGraphic(context) {
    const artMeta = this.Doc.getArtboardMetadata();
    // function to display tool related graphics on redraw; i.e. selection box if selection tool is this.activeTool
    this.activeTool.graphic(context, artMeta, this.Doc);
  }
}

export default ToolManager;
export { selectionT, pencilT, eraserT, textT, shapeT };
