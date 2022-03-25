import { Circle, Rectangle, Triangle } from "../Objects/BasicShapes";

class ShapeTool {
  constructor() {
    this.icon = "assets/icons/tools/shapes.png";
    this.shapes = ["circle", "rectangle", "triangle"];

    this.name = "shapes";

    this.currentShape = undefined;
    this.lastShape = this.currentShape;
    this.toolManager = undefined;
  }
  select() { }

  use(e, Doc) {
    let coords = Doc.localCoords(
      e.clientX,
      e.clientY,
      window.innerWidth,
      window.innerHeight
    );

    let shape = this.toolManager.shape; //this.shapes[2];

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
      } else {
        console.warn("ERROR SHAPE-SELECTION");
      }

      this.currentShape.borderWidth = this.toolManager.borderWidth;
      this.currentShape.fillColor = this.toolManager.fillColorShape;

      Doc.addObject(this.currentShape);

      //console.log(this.currentShape)
    } else if (this.inUse && e.type === "mousemove") {
      //console.log(this.currentShape)

      if (this.currentShape instanceof Triangle) {
        this.currentShape.width = coords.x - this.x1;
        this.currentShape.height = coords.y - this.y1;
      } else if (this.currentShape instanceof Circle) {
        this.currentShape.radius = Math.sqrt(
          Math.pow(this.x1 - coords.x, 2) + Math.pow(this.y1 - coords.y, 2)
        );
      } else if (this.currentShape instanceof Rectangle) {
        this.currentShape.width = coords.x - this.x1;
        this.currentShape.height = coords.y - this.y1;

        if (this.currentShape.width < 0 && this.currentShape.height > 0) {
          this.currentShape.xCoord = coords.x;
        } else if (
          this.currentShape.width > 0 &&
          this.currentShape.height < 0
        ) {
          this.currentShape.yCoord = coords.y;
        } else if (
          this.currentShape.width < 0 &&
          this.currentShape.height < 0
        ) {
          this.currentShape.xCoord = coords.x;
          this.currentShape.yCoord = coords.y;
        } else {
        }
      }
    } else if (this.inUse && e.type === "mouseup") {
      if (this.currentShape.width === 0 || this.currentShape.height === 0) {
        Doc.removeObject(this.currentShape);
        this.currentShape = NaN;
        return;
      }

      var x, y, width, height;

      if (this.currentShape instanceof Circle) {
        x = this.currentShape.xCoord - this.currentShape.radius;
        y = this.currentShape.yCoord - this.currentShape.radius;
        width = this.currentShape.radius * 2;
        height = this.currentShape.radius * 2;
      } else {
        x = this.currentShape.xCoord;
        y = this.currentShape.yCoord;
        width = this.currentShape.width;
        height = this.currentShape.height;

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
  graphic(context, artMeta) { }
}

export default ShapeTool;