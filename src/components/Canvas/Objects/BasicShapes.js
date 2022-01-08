import BoundingBox from "./BoundingBox";

class BaseShape {
  constructor(xCoord, yCoord, width, height) {
    // every object inherits a boundingbox
    this.boundingBox = new BoundingBox(xCoord, yCoord, width, height);

    this.xCoord = xCoord;
    this.yCoord = yCoord;
  }
  moveBounds(x, y) {
    let coords = this.boundingBox.getCoords()
    let endCoords = this.boundingBox.getEndCoords()

    this.boundingBox.setBounds(coords[0] + x, coords[1] + y, endCoords[0] + x, endCoords[1] + y)
  }
  move(x, y) {
    this.moveBounds(x, y)

    this.xCoord += x
    this.yCoord += y

  }

  render() { }
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
    } else {
      this.xOffset = 0;
      this.yOffset = 0;
    }

    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
  }

  render(context, pixelRatio, baseCoord) {
    context.fillStyle = this.fillColor;

    context.lineWidth = this.borderWidth * pixelRatio; //TODO: lineWidth parameter;
    context.strokeStyle = this.borderColor;

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
    super(xCoord, yCoord, radius*2, radius*2);

    if (mode === "centered") {
      this.Offset = 0;
    } else {
      this.Offset = radius;
    }

    this.radius = radius;
    this.fillColor = fillColor;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
  }

  render(context, pixelRatio, baseCoord) {
    context.fillStyle = this.fillColor;

    context.lineWidth = this.borderWidth * pixelRatio; //TODO: lineWidth parameter;
    context.strokeStyle = this.borderColor;

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

class Triangle extends BaseShape {
  constructor(
    xCoord,
    yCoord,
    width,
    height,
    fillColor = "#000000",
    borderColor = "#393939",
    borderWidth = 25,
    mode = undefined
  ) {
    console.log("COORDS:" + xCoord, yCoord, width, height)
    super(xCoord, yCoord, height, width);

    if (mode === "centered") {
      this.xOffset = -width/2;
      this.yOffset = -height/2;
    } else {
      this.xOffset = 0;
      this.yOffset = 0;
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
    context.fillStyle = this.fillColor;
    context.lineWidth = pixelRatio * this.borderWidth;
    context.strokeStyle = this.borderColor;
    
    let xCoord, yCoord

    xCoord = baseCoord.w + pixelRatio * (this.xCoord + this.xOffset);
    yCoord = baseCoord.h + pixelRatio * (this.yCoord + this.yOffset);

    console.log(this.xCoord, this.yCoord, xCoord, yCoord, this.xOffset, this.yOffset, baseCoord.w, baseCoord.h)
    context.beginPath();
    context.moveTo(xCoord, yCoord);
    context.lineTo(xCoord + this.width, yCoord);
    context.lineTo(xCoord + this.width/2, yCoord - this.height);
    context.lineTo(xCoord, yCoord);

    context.fill();

    if (this.borderWidth > 0) {context.stroke();}

    context.closePath();
  }
}

export default BaseShape;
export { Rectangle, Circle, Triangle };
