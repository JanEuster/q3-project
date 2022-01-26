class BoundingBox {
  constructor(xCoord, yCoord, width, height) {
    this.coords = [xCoord, yCoord];
    this.wh = [width, height];
    this.endCoords = [xCoord + width, yCoord + height];
  }

  // dont know if i actually should define basic getters and setters
  getCoords() {
    return this.coords;
  }
  setCoords(x, y) {
    this.coords = [x, y];
    //also define new width and height values
    this.wh = [
      this.endCoords[0] - this.coords[0],
      this.endCoords[1] - this.coords[1],
    ];
  }

  getEndCoords() {
    return this.endCoords;
  }
  setEndCoords(x, y) {
    this.endCoords = [x, y];
    //also define new width and height values
    this.wh = [
      this.endCoords[0] - this.coords[0],
      this.endCoords[1] - this.coords[1],
    ];
  }

  getWH() {
    return this.coords;
  }
  setWH(w, h) {
    this.wh = [w, h];
    //also define new endCoords values
    this.endCoords = [this.coords[0] + w, this.coords[1] + h];
  }

  setBounds(x, y, xEnd, yEnd) {
    this.setCoords(x, y);
    this.setEndCoords(xEnd, yEnd);
    this.setWH(
      this.endCoords[0] - this.coords[0],
      this.endCoords[1] - this.coords[1]
    );
  }

  checkCollision(x, y) {
    if (
      x >= this.coords[0] &&
      x <= this.endCoords[0] &&
      y >= this.coords[1] &&
      y <= this.endCoords[1]
    ) {
      // collison
      return true;
    } else {
      return false;
    }
  }
  checkBoxCollision(startBox, endBox) {
    // check if this object has a collision with a rectangular box given by the function parameters
    let boxX1 = startBox.x < endBox.x ? startBox.x : endBox.x 
    let boxY1 = startBox.y < endBox.y ? startBox.y : endBox.y; 
    let boxX2 = startBox.x > endBox.x ? startBox.x : endBox.x; 
    let boxY2 = startBox.y > endBox.y ? startBox.y : endBox.y; 

    if (
      this.endCoords[0] > boxX1 && this.coords[0] < boxX2 &&
      this.endCoords[1] > boxY1 && this.coords[1] < boxY2 
    ) {
      return true;
    }
    return false;
  }

  render(context, offset = { x: 0, y: 0 }, pixelRatio = 1) {
    // render bounding box for testing
    context.strokeStyle = "#FF0000";
    context.lineWidth = 3;

    context.strokeRect(
      offset.x + pixelRatio * this.coords[0],
      offset.y + pixelRatio * this.coords[1],
      pixelRatio * this.wh[0],
      pixelRatio * this.wh[1]
    );
  }
}

export default BoundingBox;
