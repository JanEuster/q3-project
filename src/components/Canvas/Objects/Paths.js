import BaseShape from "./BasicShapes";

function Point(x, y) {
  this.x = x;
  this.y = y;
}

// TODO: smoothed paths: quadratic curves
class Path extends BaseShape {
  constructor(points = [], strokeWidth = 10, strokeColor = "#0D79F2") {
    super(0, 0, 0, 0);
    this.points = []; // ...splits x and y into separate parameters
    this.addPoints(points);

    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;

    this.addPoint = this.addPoint.bind(this);
    this.addPoints = this.addPoint.bind(this);
  }

  addPoint(x, y) {
    this.points.push(new Point(x, y));
    this.boundingBox.setBounds(...this.determineNewBounds());
  }
  addPoints(points) {
    points.forEach((p) => {
      this.points.push(new Point(p[0], p[1]));
    });
    this.boundingBox.setBounds(...this.determineNewBounds());
  }

  determineNewBounds() {
    // determine min and mix coordinates for selecting boundingBox
    let minX = this.points[0].x;
    let minY = this.points[0].y;
    let maxX = this.points[0].x;
    let maxY = this.points[0].y;
    for (const point in this.points) {
      if (point.x < minX) minX = point.x;
      if (point.y < minY) minY = point.y;
      if (point.x > maxX) maxX = point.x;
      if (point.y < maxY) maxY = point.y;
    }

    return [
      [minX, minY],
      [maxX, maxY],
    ];
  }

  render(context, pixelRatio, baseCoord) {
    console.log(this.points);
    context.lineWidth = pixelRatio * this.strokeWidth;
    context.strokeStyle = this.strokeColor;

    context.beginPath();
    this.points.forEach((p) => {
      context.lineTo(
        baseCoord.w + pixelRatio * p.x,
        baseCoord.h + pixelRatio * p.y
      );
    });
    context.stroke();
    context.closePath();
  }
}

export default Path;
