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
  setCoords(xy) {
    this.coords = xy;
    //also define new width and height values
    this.wh = [this.endCoords[0] - xy[0], this.endCoords[1] - xy[1]];
  }

  getEndCoords() {
    return this.endCoords;
  }
  setEndCoords(xy) {
    this.endCoords = xy;
    //also define new width and height values
    this.wh = [xy[0] - this.coords[0], xy[1] - this.coords[1]];
  }

  getWH() {
    return this.coords;
  }
  setWH(wh) {
    this.wh = wh;
    //also define new endCoords values
    this.endCoords = [this.coords[0] + wh[0], this.coords[1] + wh[1]];
  }

  setBounds(xy, xyEnd) {
    this.setCoords(xy);
    this.setEndCoords(xyEnd);
    this.setWH([xyEnd[0] - xy[0], xyEnd[1] - xy[1]]);
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
