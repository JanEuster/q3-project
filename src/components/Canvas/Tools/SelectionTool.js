import GLOBALS from "../../../Globals";

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
    let startCoords = Doc.globalCoords(this.startCoords.x, this.startCoords.y);
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

    this.selectionBox = new SelectionBox();

    this.toolManager = undefined;

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

    Doc.objects.forEach((obj) => {
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

  deleteSelected() {
    this.selectedObjects.forEach((obj) => this.toolManager.Doc.removeObject(obj));
    this.selectedObjects = [];
    this.moving = false;
  }

  select(obj) {
    this.selectedObjects = [obj];
  }

  use(e, Doc) {
    if (this.selectedObjects && e.type === "keydown" && e.key === "Delete") {
      this.selectedObjects.forEach((obj) => Doc.removeObject(obj));
      this.selectedObjects = [];
      this.moving = false;
    }

    this.lastEventUp = false;

    let coords = Doc.localCoords(e.clientX, e.clientY);

    switch (e.type) {
      // if click: select single object
      case "click":
        this.selectedObjects = this.collisionOnObjects(coords, Doc);
        break;

      // if mousedown: begin moving objects, if there is a collision at cursor position
      //               else begin drawing a selection box for the duration of the user dragging the cursor
      case "mousedown":
        let collisionObjs = this.collisionOnObjects(coords, Doc);
        if (this.collisionOnSelected(coords, Doc).length) {
          this.moving = true;
        } else {
          this.selectionBox.enabled = true;
          this.selectionBox.setStart(coords.x, coords.y);
          this.selectionBox.setEnd(coords.x, coords.y);
          this.selectedObjects = [];
        }
        this.lastPos.x = coords.x;
        this.lastPos.y = coords.y;

        if (this.selectedObjects.indexOf(collisionObjs[0] >= 0))
          this.moving = true;

        break;

      // if mousemove: if objects are selected and being moved set their new location according to the cursors current position
      //               else if the selection box is enabled set the position for that
      case "mousemove":
        if (this.selectedObjects !== [] && this.moving) {
          let xDelta = coords.x - this.lastPos.x;
          let yDelta = coords.y - this.lastPos.y;

          this.selectedObjects.forEach((obj) => obj.move(xDelta, yDelta));

          this.lastPos.x = coords.x;
          this.lastPos.y = coords.y;
        }
        if (this.selectionBox.enabled) {
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
          this.selectionBox.setEnd(coords.x, coords.y);

          if (
            Math.abs(
              this.selectionBox.endCoords.x - this.selectionBox.startCoords.x
            ) > 1 ||
            Math.abs(
              this.selectionBox.endCoords.x - this.selectionBox.startCoords.x
            ) > 1
          ) {
            this.selectedObjects = this.collisionInBox(Doc);
          } else {
            this.selectedObjects = this.collisionOnObjects(
              this.selectionBox.startCoords,
              Doc
            );
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
    var artPos = Doc.applyZoomOffset(artMeta);
    var zoom = Doc.zoom;
    var pixelRatio = artMeta.pixelRatio;
    // show selection box
    if (this.selectedObjects !== []) {
      this.selectedObjects.forEach((obj) => {
        // TODO: fix object selection box while zoomed
        let x = obj.boundingBox.coords[0];
        let y = obj.boundingBox.coords[1];
        let w = obj.boundingBox.wh[0];
        let h = obj.boundingBox.wh[1];

        let offset = 32;
        // context.fillStyle = "#00FF00";
        context.lineWidth = 3; //TODO: lineWidth parameter;
        context.strokeStyle = GLOBALS.COLORS.midorange;

        context.strokeRect(
          artPos.x + zoom * pixelRatio * (x - offset),
          artPos.y + zoom * pixelRatio * (y - offset),
          zoom * pixelRatio * (w + offset * 2),
          zoom * pixelRatio * (h + offset * 2)
        );
      });
    }

    this.selectionBox.showIfEnabled(context, Doc);
  }
}


export default SelectionTool;