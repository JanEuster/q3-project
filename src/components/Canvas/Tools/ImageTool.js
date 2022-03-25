import { openImageAsBase64 } from "../util/Import";
import ImageObj from "../Objects/Image";

class ImageTool {
  constructor() {
    this.icon = "assets/icons/tools/image.png";
    this.shapes = ["circle", "rectangle", "triangle"];

    this.name = "image";

    this.imageSrc = undefined;
    this.imageAspectRatio = 1;

    this.maintainAspectRatio = true;

    this.currentImage = undefined;
    this.lastImage = this.currentImage;
    this.toolManager = undefined;

    this.loadImage = this.loadImage.bind(this);
    this.getMaintainAspectRatio = this.getMaintainAspectRatio.bind(this);
  }
  getMaintainAspectRatio(state) {
    this.maintainAspectRatio = state;
  }

  loadImage() {
    openImageAsBase64().then((src) => {
      this.imageSrc = src;
    });
  }

  setCurrentPosition(x, y) {
    if (this.currentImage) {
      if (this.maintainAspectRatio) {
        let width = this.x2 - this.x1;
        let height = width / this.imageAspectRatio;

        this.currentImage.setWH(width, height);

      } else {
        this.x2 = x;
        this.y2 = y;
        this.currentImage.setWH(this.x2 - this.x1, this.y2 - this.y1);
      }
    }

  }

  select() {
    if (!this.imageSrc) {
      this.loadImage();
    }
  }

  use(e, Doc) {

    // TODO: FIND A BETTER WAY TO GET image drawn on first try with maintain aspect ratio enabled
    // the issue is connected to this.maintainAspectRatio not being defined at the time of dragging the image
    if (this.maintainAspectRatio) {
      // set image aspect ratio variable
      let img = new Image();
      img.src = this.imageSrc;
      this.imageAspectRatio = img.width / img.height;
    }


    let coords = Doc.localCoords(
      e.clientX,
      e.clientY,
      window.innerWidth,
      window.innerHeight
    );

    switch (e.type) {
      case "mousedown":

        this.inUse = true;
        this.x1 = coords.x;
        this.y1 = coords.y;

        this.currentImage = new ImageObj(coords.x, coords.y, 0, 0, this.imageSrc)

        Doc.addObject(this.currentImage);
        break

      case "mousemove":

        this.x2 = coords.x;
        this.y2 = coords.y;

        if (this.currentImage) {
          this.setCurrentPosition(coords.x, coords.y)
        }
        break

      case "mouseup":
        this.x2 = coords.x;
        this.y2 = coords.y;

        if (this.currentImage) {
          this.setCurrentPosition(coords.x, coords.y)

          if (this.currentImage.width === 0 || this.currentImage.height === 0) {
            Doc.removeObject(this.currentImage);
            this.currentImage = undefined;
            return;
          }

          this.lastImage = this.currentImage;
          this.currentImage = undefined;
        }
        break

      default:
        break
    }
  }

  deselect() {
    return this.lastShape;
  }
  graphic(context, artMeta) { }
}

export default ImageTool;