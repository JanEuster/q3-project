import BoundingBox from "./BoundingBox";

function convertBoundingboxCoords(x, y, width, height) {
  width = Math.abs(width);
  height = Math.abs(height);
  if ( width < 0 && height > 0 ) { //top right corner
    x = x + width;
  } else if ( height < 0 && width > 0 ) { //bottom left corner
    y = y + height;
  } else if ( width < 0 && height < 0 ) { //bottom right corner
    x = x + width;
    y = y + height;
  } else { //top left
    width = width;
    height = height;
  }
  console.log("BCOORDS:" + x, y, Math.abs(width), Math.abs(height));
  return [x, y, width, height]
};

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
    //console.log("COORDS:" + xCoord, yCoord, width, height)
    let bCoords = []
    if ( width < 0 && height > 0 ) { //top right corner
      xCoord = xCoord + width;
    } else if ( height < 0 && width > 0 ) { //bottom left corner
      yCoord = yCoord + height;
    } else if ( width < 0 && height < 0 ) { //bottom right corner
      xCoord = xCoord + width;
      yCoord = yCoord + height;
    } else { //top left
      width = width;
      height =  height;
    }
    for (let i = 0; i < convertBoundingboxCoords(xCoord, yCoord, width, height).length; i++) {
      bCoords.push(convertBoundingboxCoords(xCoord, yCoord, width, height)[i]);
    }
    //bCoords.push(convertBoundingboxCoords(xCoord, yCoord, width, height));
    console.log(bCoords[0], bCoords[1], bCoords[2], bCoords[3])
    console.log("COORDS:" + xCoord, yCoord, width, height)
    super(xCoord, yCoord, Math.abs(width), Math.abs(height))
    //super(bCoords[0], bCoords[1], bCoords[2], bCoords[3]);

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
      pixelRatio * Math.abs(this.width), //width and height cant take on negative values
      pixelRatio * Math.abs(this.height)
    );
    context.strokeRect(
      baseCoord.w + pixelRatio * (this.xCoord + this.xOffset),
      baseCoord.h + pixelRatio * (this.yCoord + this.yOffset),
      pixelRatio * Math.abs(this.width),
      pixelRatio * Math.abs(this.height)
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
    mode = undefined // mode=center means x and y coords are at the center of the objects
  ) {
    super(xCoord-radius, yCoord-radius, radius*2, radius*2);
    
    //console.log("CIRCLE: " + xCoord, yCoord, radius);
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
    //console.log("COORDS:" + xCoord, yCoord, width, height)

    let b_width = width;
    let b_height = height;
    let b_yCoord = yCoord;
    let b_xCoord = xCoord;

    if ( width < 0 && height > 0 ) { //top right corner
      b_xCoord = xCoord + width;
    } else if ( height < 0 && width > 0 ) { //bottom left corner
      b_yCoord = yCoord + height;
    } else if ( width < 0 && height < 0 ) { //bottom right corner
      b_xCoord = xCoord + b_width;
      b_yCoord = yCoord + b_height;
    } else { //top left
      b_width = width;
      b_height =  height;
    }

    console.log("COORDS:" + xCoord, yCoord, b_width, b_height)
    super(b_xCoord, b_yCoord, Math.abs(width), Math.abs(height)); //width and height cant take on negative values

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
    
    let xCoord = baseCoord.w + pixelRatio * (this.xCoord + this.xOffset);
    let yCoord = baseCoord.h + pixelRatio * (this.yCoord + this.yOffset);
    let width = pixelRatio * this.width
    let height = pixelRatio * this.height

    context.beginPath();
    context.moveTo(xCoord, yCoord);
    context.lineTo(xCoord + width, yCoord);
    context.lineTo(xCoord + width/2, yCoord + height);
    context.lineTo(xCoord, yCoord);

    context.fill();

    if (this.borderWidth > 0) {context.stroke();}

    context.closePath();
  }
}

export default BaseShape;
export { Rectangle, Circle, Triangle };
