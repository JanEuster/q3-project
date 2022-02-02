import BaseShape from "./BasicShapes";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getSaveInformation() {
    return { attributes: { x: this.x, y: this.y } };
  }
}

// TODO: smoothed paths: quadratic curves
class Path extends BaseShape {
  constructor(
    points = [],
    strokeWidth = 10,
    strokeColor = "#0D79F2",
    lineJoin = "round"
  ) {
    super(0, 0, 0, 0);

    this.points = []; // ...splits x and y into separate parameters
    this.addPoints(points);

    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;
    this.lineJoin = lineJoin;
    // parameter controls how lines(p1 -> p2) are conncted together
    // https://www.w3schools.com/Tags/canvas_linejoin.asp

    this.addPoint = this.addPoint.bind(this);
    this.addPoints = this.addPoint.bind(this);
  }
  getSaveInformation() {
    // return all necessary information for saving document to file
    return {
      attributes: {
        "fill-color": this.fillColor,
        strokeColor: this.borderColor,
        strokeWidth: this.borderWidth,
        lineJoin: this.lineJoin,
      },
      children: [...this.points],
    };
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
    this.points.map((point) => {
      if (point.x < minX) minX = point.x;
      if (point.y < minY) minY = point.y;
      if (point.x > maxX) maxX = point.x;
      if (point.y > maxY) maxY = point.y;
    });
    return [minX, minY, maxX, maxY];
  }

  // TODO: move Method for Path Objects
  move(x, y) {
    this.points.map((point) => {
      point.x += x;
      point.y += y;
    });

    this.boundingBox.setBounds(...this.determineNewBounds());
  }

  pointDistance(p1, p2) {
    let deltaX = p1.x - p2.x;
    let deltaY = p1.y - p2.y;
    let dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return dist;
  }
  cleanUp() {
    // remove points from path that are too close together, therefore enforce straighter, cleaner lines
    var pointsAmount = 5;
    var pointsLength = this.points.length;
    var pointsRemoved = 0;
    var distCutoff = 3.5;

    for (let i = 1; i < this.points.length; i++) {
      if (this.pointDistance(this.points[i - 1], this.points[i]) < distCutoff) {
        if (i < this.points.length - pointsAmount) {
          pointsRemoved += pointsAmount;
          this.points.splice(i, pointsAmount);
        }
      }
    }

    console.log(
      `[path cleanup] ${pointsRemoved} points removed of ${pointsLength}`
    );
  }

  renderCircle(context, x, y, d) {
    context.fillStyle = this.strokeColor;
    context.beginPath();
    context.arc(
      x,
      y,
      d / 2,
      0 * Math.PI, // starting point
      2 * Math.PI // end point -> 2pi=360°
    );
    context.fill();
    context.closePath();
  }
  render(context, pixelRatio, baseCoord) {
    context.lineWidth = pixelRatio * this.strokeWidth;
    context.strokeStyle = this.strokeColor;
    context.lineJoin = this.lineJoin;

    this.renderCircle(
      context,
      baseCoord.w + pixelRatio * this.points[0].x,
      baseCoord.h + pixelRatio * this.points[0].y,
      context.lineWidth
    );

    context.beginPath();
    this.points.forEach((p) => {
      context.lineTo(
        baseCoord.w + pixelRatio * p.x,
        baseCoord.h + pixelRatio * p.y
      );
    });
    context.stroke();
    context.closePath();

    this.renderCircle(
      context,
      baseCoord.w + pixelRatio * this.points[this.points.length - 1].x,
      baseCoord.h + pixelRatio * this.points[this.points.length - 1].y,
      context.lineWidth
    );

    context.lineJoin = "miter"; // reset lineJoin to miter

    // context.beginPath();
    // context.strokeStyle = "#00FF00";
    // context.moveTo(baseCoord.w + pixelRatio * this.points[0].x, baseCoord.h + pixelRatio * this.points[0].y)
    // for (var i = 1; i < this.points.length; i ++)
    // {
    //   var controlX = (baseCoord.w + pixelRatio * this.points[i - 1].x + baseCoord.w + pixelRatio * this.points[i].x) / 2;
    //   var controlY = (baseCoord.h + pixelRatio * this.points[i - 1].y + baseCoord.h + pixelRatio * this.points[i].y) / 2;
    //   context.quadraticCurveTo(
    //     baseCoord.w + pixelRatio * this.points[i].x,
    //     baseCoord.h + pixelRatio * this.points[i].y,
    //     controlX,
    //     controlY
    //   );
    // }

    // context.stroke();
    // context.closePath();

    // show points
    // this.points.forEach((p) => {
    //   context.fillRect(
    //     baseCoord.w + pixelRatio * p.x,
    //     baseCoord.h + pixelRatio * p.y,
    //     7,
    //     7
    //   )
    // });
  }
}

export default Path;
