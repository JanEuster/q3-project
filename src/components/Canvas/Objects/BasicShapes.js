import BoundingBox from "./BoundingBox";

export default class BaseShape {
  constructor(xCoord, yCoord, width, height) {
    // every object inherits a boundingbox
    this.boundingBox = new BoundingBox(xCoord, yCoord, width, height);

    this.xCoord = xCoord;
    this.yCoord = yCoord;
  }

  getSaveInformation() {
    // return all necessary information for saving document to file
    return { attributes: { xCoord: this.xCoord, yCoord: this.yCoord } };
  }
  onLoad() {
    // executes when a document is loaded from file
    this.newBounds();
  }

  newBounds() { }

  moveBounds(x, y) {
    let coords = this.boundingBox.getCoords();
    let endCoords = this.boundingBox.getEndCoords();

    this.boundingBox.setBounds(
      coords[0] + x,
      coords[1] + y,
      endCoords[0] + x,
      endCoords[1] + y
    );
  }
  move(x, y) {
    this.moveBounds(x, y);

    this.xCoord += x;
    this.yCoord += y;
  }

  render() { }
}

export class Rectangle extends BaseShape {
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
    super(xCoord, yCoord, Math.abs(width), Math.abs(height));
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
  getSaveInformation() {
    // return all necessary information for saving document to file
    return {
      attributes: {
        xCoord: this.xCoord,
        yCoord: this.yCoord,
        width: this.width,
        height: this.height,
        fillColor: this.fillColor,
        borderColor: this.borderColor,
        borderWidth: this.borderWidth,
      },
    };
  }

  newBounds() {
    this.boundingBox.setBounds(
      this.xCoord,
      this.yCoord,
      this.xCoord + this.width,
      this.yCoord + this.height
    );
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

export class Circle extends BaseShape {
  constructor(
    xCoord,
    yCoord,
    radius,
    fillColor = "#000000",
    borderColor = "#393939",
    borderWidth = 25,
    mode = undefined // mode=center means x and y coords are at the center of the objects
  ) {
    super(xCoord - radius, yCoord - radius, radius * 2, radius * 2);

    //console.log("CIRCLE: " + xCoord, yCoord, radius);
    if (mode === "centered") {
      this.Offset = 0;
    } else {
      this.Offset = radius;
    }
    if (radius === undefined) {
      this.Offset = 0;
    }

    this.radius = radius;
    this.fillColor = fillColor;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
  }
  getSaveInformation() {
    // return all necessary information for saving document to file
    return {
      attributes: {
        xCoord: this.xCoord,
        yCoord: this.yCoord,
        radius: this.radius,
        fillColor: this.fillColor,
        borderColor: this.borderColor,
        borderWidth: this.borderWidth,
      },
    };
  }

  newBounds() {
    this.boundingBox.setBounds(
      this.xCoord - this.radius,
      this.yCoord - this.radius,
      this.xCoord - this.radius + this.radius * 2,
      this.yCoord - this.radius + this.radius * 2
    );
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

export class Triangle extends BaseShape {
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
    super(xCoord, yCoord, Math.abs(width), Math.abs(height)); //width and height cant take on negative values

    if (mode === "centered") {
      this.xOffset = -width / 2;
      this.yOffset = -height / 2;
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
  getSaveInformation() {
    // return all necessary information for saving document to file
    return {
      attributes: {
        xCoord: this.xCoord,
        yCoord: this.yCoord,
        width: this.width,
        height: this.height,
        fillColor: this.fillColor,
        borderColor: this.borderColor,
        borderWidth: this.borderWidth,
      },
    };
  }
  newBounds() {
    this.boundingBox = new BoundingBox(
      this.xCoord,
      this.yCoord,
      this.width,
      this.height
    );
    console.log(this.boundingBox);
  }

  render(context, pixelRatio, baseCoord) {
    context.fillStyle = this.fillColor;
    context.lineWidth = pixelRatio * this.borderWidth;
    context.strokeStyle = this.borderColor;

    let xCoord = baseCoord.w + pixelRatio * (this.xCoord + this.xOffset);
    let yCoord = baseCoord.h + pixelRatio * (this.yCoord + this.yOffset);
    let width = pixelRatio * this.width;
    let height = pixelRatio * this.height;

    context.beginPath();
    context.moveTo(xCoord, yCoord);
    context.lineTo(xCoord + width, yCoord);
    context.lineTo(xCoord + width / 2, yCoord + height);
    context.lineTo(xCoord, yCoord);

    context.fill();

    context.closePath();

    if (this.borderWidth > 0) {
      context.stroke();
    }
  }
}


export const copyOfObject = (obj) => {
  let newObj = new obj.constructor()
  Object.keys(obj).forEach((attr, i) => {
    newObj[attr] = obj[attr];
  })
  newObj.newBounds();
  return newObj
}

export const isDifferentObject = (obj1, obj2) => {
  // require as a scoped import because there seems to be some kind of circular import problem with Canvas.jsx and Globals.js
  // .default gives access to the export default object
  let isDifferent = false;

  Object.values(require("../../../Globals").default.SAVE.OBJECT_TYPES).forEach((objType) => {
    if (obj1 instanceof objType.class && obj2 instanceof objType.class) {
      for (let attr of objType.attributes) {
        if (obj1[attr] !== obj2[attr]) {
          console.log("DIFFERING ATTRIBUTE OF", attr, obj1[attr], obj2[attr]);
          isDifferent = true;
          break;
        }
      }
    }
  });
  return isDifferent;
}


