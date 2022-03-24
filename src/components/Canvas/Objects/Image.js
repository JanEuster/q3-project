import BaseShape from "./BasicShapes";

class ImageObj extends BaseShape {
  constructor(xCoord, yCoord, width, height, imgSrc) {
    super(xCoord, yCoord, width, height);

    this.width = width;
    this.height = height;


    this.image = new Image();
    this.image.src = imgSrc;
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