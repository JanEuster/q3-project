import Path from "../Objects/Paths";


class PencilTool {
  constructor() {
    this.currentPath = NaN;
    this.lastPath = NaN;
    this.eventCount = 0;
    this.pointsToAdd = [];
    this.lastMoveEvent = new Date();

    this.fillShape = false;

    this.toolManager = undefined;

    this.name = "pencil";
    // this.use = this.use.bind(this);
    this.icon = "assets/icons/tools/pencil.png";

    this.getFillShape = this.getFillShape.bind(this);
  }
  getFillShape(state) {
    this.fillShape = state;
  }

  select(obj) { }

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
        this.toolManager.strokeStyle,
        this.fillShape
      );
      Doc.addObject(this.currentPath);
    } else if (this.inUse && e.type === "mousemove") {
      this.currentPath.addPoint(coords.x, coords.y);
      // this.currentPath.cleanUp()
    } else if (this.inUse && e.type === "mouseup") {
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

  graphic(context, artMeta) { }
}

export default PencilTool;