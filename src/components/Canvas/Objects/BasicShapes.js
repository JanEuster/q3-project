import BoundingBox from "./BoundingBox";

class BaseShape {
  constructor(xCoord, yCoord, width, height) {
    // every object inherits a boundingbox
    this.boundingBox = new BoundingBox(xCoord, yCoord, width, height);
  }

  render() {}
}

class Rectangle extends BaseShape {
  constructor(
    xCoord,
    yCoord,
    width,
    height,
    fillColor = "#000000",
    borderColor = "#393939",
    borderWidth = 25,
    mode = undefined // mode=center means x and y coords are at the center of the objects
  ) {
    super(xCoord, yCoord, width, height);

    if (mode === "centered") {
      this.xOffset = -width / 2;
      this.yOffset = -height / 2;
      console.log("centered");
    } else {
      this.xOffset = 0;
      this.yOffset = 0;
      console.log("not centered");
    }
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
  }

  render(context, pixelRatio, baseCoord) {
    //    console.log("fillColor", this.fillColor);
    context.fillStyle = this.fillColor;

    context.lineWidth = this.borderWidth * pixelRatio; //TODO: lineWidth parameter;
    context.strokeStyle = this.borderColor;
    //    console.log("baseCoords: ", baseCoord.w, baseCoord.h);
    //    console.log(pixelRatio);
    //    console.log(baseCoord.w + pixelRatio*this.xCoord, baseCoord.h + pixelRatio*this.yCoord);

    context.fillRect(
      baseCoord.w + pixelRatio * (this.xCoord + this.xOffset),
      baseCoord.h + pixelRatio * (this.yCoord + this.yOffset),
      pixelRatio * this.width,
      pixelRatio * this.height
    );
    context.strokeRect(
      baseCoord.w + pixelRatio * (this.xCoord + this.xOffset),
      baseCoord.h + pixelRatio * (this.yCoord + this.yOffset),
      pixelRatio * this.width,
      pixelRatio * this.height
    );
  }
}

class Circle extends BaseShape {
  constructor(
    xCoord,
    yCoord,
    radius,
    fillColor = "#000000",
    borderColor = "#393939",
    borderWidth = 25,
    mode = "centered" // mode=center means x and y coords are at the center of the objects
  ) {
    super(xCoord, yCoord, radius, radius);

    if (mode === "centered") {
      this.Offset = 0;
      console.log("centered");
    } else {
      this.Offset = radius;
      console.log("not centered");
    }
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.radius = radius;
    this.fillColor = fillColor;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
  }

  render(context, pixelRatio, baseCoord) {
    console.log("color", this.fillColor, this.borderColor);
    context.fillStyle = this.fillColor;

    context.lineWidth = this.borderWidth * pixelRatio; //TODO: lineWidth parameter;
    context.strokeStyle = this.borderColor;

    console.log(baseCoord.w + this.xCoord, baseCoord.h + this.yCoord);
    context.beginPath();
    context.arc(
      baseCoord.w + pixelRatio * (this.xCoord + this.Offset),
      baseCoord.h + pixelRatio * (this.yCoord + this.Offset),
      this.radius * pixelRatio,
      0 * Math.PI, // starting point
      2 * Math.PI // end point -> 2pi=360°
    );
    context.fill();
    if (this.borderWidth > 0) context.stroke();

    context.closePath();
  }
}

class Triangle extends BaseShape {}

export default BaseShape;
export { Rectangle, Circle, Triangle };
