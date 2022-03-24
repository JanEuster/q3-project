import { openImageAsBase64 } from "../util/Import";

class ImageTool {
  constructor() {
    this.icon = "assets/icons/tools/rectangle.png";
    this.shapes = ["circle", "rectangle", "triangle"];

    this.name = "image";

    this.imageSrc = undefined;

    this.currentImage = undefined;
    this.lastImage = this.currentImage;
    this.toolManager = undefined;

    this.loadImage = this.loadImage.bind(this)
  }

  loadImage() {
    openImageAsBase64().then((src) => {
      this.imageSrc = src;
    });
  }

  select() {
    if (!this.imageSrc) {
      this.loadImage();
    }
  }

  use(e, Doc) {
    console.log(this.imageSrc)

    let coords = Doc.localCoords(
      e.clientX,
      e.clientY,
      window.innerWidth,
      window.innerHeight
    );

    if (this.currentImage) {

      if (e.type === "mousedown") {
        //console.log(coords.x, coords.y)
        this.inUse = true;
        this.x1 = coords.x;
        this.y1 = coords.y;


        Doc.addObject(this.currentImage);

        //console.log(this.currentShape)
      } else if (this.inUse && e.type === "mousemove") {
        //console.log(this.currentShape)
        this.x2 = coords.x;
        this.y2 = coords.y;

      } else if (this.inUse && e.type === "mouseup") {
        if (this.currentShape.width === 0 || this.currentShape.height === 0) {
          Doc.removeObject(this.currentShape);
          this.currentShape = NaN;
          return;
        }

        var x, y;
        if (this.x2 > this.x1) {
          x = this.x1;
        } else {
          x = this.x2;
        }
        if (this.y2 > this.y1) {
          y = this.y1;
        } else {
          y = this.y2
        }
        var width = Math.abs(this.x1 - this.x2);
        var height = Math.abs(this.x1 - this.x2);

      }

    }
  }
  deselect() {
    return this.lastShape;
  }
  graphic(context, artMeta) { }
}

export default ImageTool;