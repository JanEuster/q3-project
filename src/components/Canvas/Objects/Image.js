import BaseShape from "./BasicShapes";
import BoundingBox from "./BoundingBox";

class ImageObj extends BaseShape {
  constructor(xCoord, yCoord, width, height, imgSrc) {
    super(xCoord, yCoord, width, height);

    this.width = width;
    this.height = height;


    this.imageSrc = imgSrc;
    this.image = new Image();
    this.image.src = imgSrc;
  }
  getSaveInformation() {
    // return all necessary information for saving document to file
    return {
      attributes: {
        xCoord: this.xCoord,
        yCoord: this.yCoord,
        width: this.width,
        height: this.height,
        imageSrc: this.imageSrc,
      },
    };
  }
  onLoad() {
    this.newBounds();

    this.image = new Image();
    this.image.src = this.imageSrc;
  }

  newBounds() {
    this.boundingBox = new BoundingBox(this.xCoord, this.yCoord, this.width, this.height);
  }

  setImage(src) {
    this.image.src = src;
  }

  setWH(width, height) {
    this.width = width;
    this.height = height;
    this.boundingBox.setWH(width, height);
  }

  render(context, pixelRatio, baseCoord) {
    context.drawImage(this.image, baseCoord.w + pixelRatio * this.xCoord, baseCoord.h + pixelRatio * this.yCoord, pixelRatio * this.width, pixelRatio * this.height)
  }
}

export default ImageObj;