import Toolbox from "./Panels/Toolbox";
import { Circle, Rectangle, Triangle } from "./Objects/BasicShapes";
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

  collisionOnObjects(coords, Doc) {
    let objects = Doc.objects.slice(0).reverse() // create reveresed copy of objects list
    let pixelRatio = Doc.getArtboardMetadata().pixelRatio

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
  
  use(e, Doc) {
    if (this.selectedObject && e.type === "keydown" && e.key === "Delete") {
      Doc.removeObject(this.selectedObject)
      this.selectedObject = NaN
      this.moving = false
    }

    if (this.lastEventUp && e.type === "click") {
      return
    } // if last event was mouseup mouse move has just finished and therefore a click at the position of mouseup is not needed
    this.lastEventUp = false


    let coords = Doc.localCoords(
    e.pageX,
    e.pageY,
    window.innerWidth,
    window.innerHeight
    );
    if (e.type === "click") {
      this.selectedObject = this.collisionOnObjects(coords, Doc)

    } else if (e.type === "mousedown") {
      this.selectedObject = this.collisionOnObjects(coords, Doc)
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
    this.icon = "assets/icons/tools/pencil.png"
  }

  select(obj) { 
  }
  
  use(e, Doc) {
    this.eventCount += 1;
    
    let coords = Doc.localCoords(
      e.pageX,
      e.pageY,
      window.innerWidth,
      window.innerHeight
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
    this.radius = radius

    this.icon = "assets/icons/tools/pen.png"
  }
  use(e, Doc) {
    let coords = Doc.localCoords(
      e.pageX,
      e.pageY,
      window.innerWidth,
      window.innerHeight
    );

    if (e.type === "mousedown") {
      this.inUse = true;
      // Doc.addObject(new Circle(coords.x, coords.y, this.radius, "red", undefined, 0)); //colour --> getBackgroundColour Artboard Class
      this.currentPath = new Path(
        [[coords.x, coords.y]],
        ToolManager.strokeWidth,
        Doc.getBackgroundColour()
      );
      Doc.addObject(this.currentPath);
    } else if(this.inUse && e.type === "mousemove") {
      this.currentPath.addPoint(coords.x,coords.y);
    } else if(this.inUse && e.type === "mouseup") {
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

    this.icon = "assets/icons/tools/select.png"
  }

  select(obj) {
    if (obj instanceof Text) {
      this.activeObject = obj
    }
   }
  
  use(e, Doc) {

    let coords = Doc.localCoords(
    e.pageX,
    e.pageY,
    window.innerWidth,
    window.innerHeight
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


class ShapeTool {
  constructor() {
	  this.icon = "assets/icons/tools/select.png";
	  this.shapes = ["circle", "rectangle", "triangle"]
	  
	  this.currentShape = undefined
    this.lastShape = this.currentShape
  }
  select(){}
  
  use(e, Doc) {
    
    let coords = Doc.localCoords(
      e.pageX,
      e.pageY,
      window.innerWidth,
      window.innerHeight
      );
      
      let shape = this.shapes[2];
      console.log(this.inUse, e.type)
      if (e.type === "mousedown") {
        console.log(coords.x, coords.y)
        this.inUse = true;
        this.x1 = coords.x;
        this.y1 = coords.y;
        
        if (shape === "circle") {
          this.currentShape = new Circle(this.x1, this.y1, 0);
        } else if (shape === "rectangle") {
          this.currentShape = new Rectangle(this.x1, this.y1, 0, 0);
        } else if (shape === "triangle") {
          this.currentShape = new Triangle(this.x1, this.y1, 0, 0);
        } else { console.log("ERROR SHAPE-SELECTION") }
        Doc.addObject(this.currentShape)
        
        console.log(this.currentShape)
      } else if (this.inUse && e.type === "mousemove") {
        
        console.log(this.currentShape)
        
        if (this.currentShape instanceof Rectangle || this.currentShape instanceof Triangle) {
          this.currentShape.width = coords.x - this.x1
          this.currentShape.height = coords.y - this.y1
        } else if (this.currentShape instanceof Circle) {
          this.currentShape.radius = Math.sqrt(Math.pow((this.x1 - coords.x), 2) + Math.pow((this.y1 - coords.y), 2));
        }
      }
      
      else if (this.inUse && e.type === "mouseup") {
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
        }
        
        this.currentShape.boundingBox.setBounds(x, y, x + width, y + height)
        this.inUse = false;
        this.lastShape = this.currentShape
        this.currentShape = undefined
      }
    }
    deselect(){ 
      return this.lastShape
    }
    graphic(context, artMeta){}
}


var selectionT = new SelectionTool()
var pencilT = new PencilTool()
var eraserT = new EraserTool()
var textT = new TextTool()
var shapeT = new ShapeTool()

class ToolManager {
  constructor(Doc) {
    this.Doc = Doc;
    this.tools = [];
    this.tools.push(selectionT, pencilT, eraserT, textT, shapeT);
    this.toolUse = this.toolUse.bind(this);
    this.activeTool = this.tools[0];
    this.strokeWidth = 5;
    this.strokeStyle = "#111111";

    this.lastObj = NaN

    this.panel = new Toolbox(this);
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

  toolGraphic(context, artMeta) {
    // function to display tool related graphics on redraw; i.e. selection box if selection tool is this.activeTool
    this.activeTool.graphic(context, artMeta)
  }

}

export default ToolManager;
export { selectionT, pencilT, eraserT, textT, shapeT};
