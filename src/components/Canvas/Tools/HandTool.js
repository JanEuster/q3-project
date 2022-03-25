
class HandTool {
  constructor() {
    this.lastPos = { x: 0, y: 0 };
    this.moving = false;

    this.toolManager = undefined;

    this.name = "hand";
    this.icon = "assets/icons/tools/hand.png";
  }

  select() { }

  use(e) {
    if (e instanceof WheelEvent) {
      this.toolManager.Doc.setZoom(-e.deltaY);
      return;
    }

    switch (e.type) {
      case "mousedown":
        this.moving = true;
        this.lastPos.x = e.pageX;
        this.lastPos.y = e.pageY;

        break;

      case "mousemove":
        if (this.moving) {
          this.toolManager.Doc.moveArtboard(
            e.pageX - this.lastPos.x,
            e.pageY - this.lastPos.y
          );
          this.lastPos.x = e.pageX;
          this.lastPos.y = e.pageY;
        }

        break;

      case "mouseup":
        this.moving = false;

        break;

      default:
        return;
    }
  }

  deselect() { }

  graphic() { }
}

export default HandTool;