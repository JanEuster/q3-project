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
    this.wh = [this.endCoords[0] - this.coords[0], this.endCoords[1] - this.coords[1]];
  }

  getEndCoords() {
    return this.endCoords;
  }
  setEndCoords(x, y) {
    this.endCoords = [x, y];
    //also define new width and height values
    this.wh = [this.endCoords[0] - this.coords[0], this.endCoords[1] - this.coords[1]];
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
    this.setWH(this.endCoords[0] - this.coords[0], this.endCoords[1] - this.coords[1]);
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
}

export default BoundingBox;
