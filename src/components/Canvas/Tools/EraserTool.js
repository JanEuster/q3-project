import Path from "../Objects/Paths";
import PencilTool from "./PencilTool";

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
        Doc.getBackgroundColour(),
        this.fillShape
      );
      Doc.addObject(this.currentPath);
    } else if (this.inUse && e.type === "mousemove") {
      this.currentPath.addPoint(coords.x, coords.y);
    } else if (this.inUse && e.type === "mouseup") {
      this.currentPath.addPoints(coords.x, coords.y);
      // Doc.addObject(new Circle(coords.x, coords.y, this.radius, "red", undefined, 0));

      this.inUse = false;
      this.currentPath = NaN;
    }
  }
  deselect() {
    return false;
  }
}

export default EraserTool;