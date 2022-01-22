import Text from "./Objects/Text";

class Artboard {
  //
  constructor(width, height, bgColor) {
    this.width = width;
    this.height = height;
    this.bgColor = bgColor;

    this.margin = 10; // margin to be set around the artboard

    // variable to store all objects in document
    // objects at the end of the list are on top of the other ones --> layer system
    this.objects = [];
    this.draw = this.draw.bind(this);

    this.editable = true;
  }

  addObject(obj) {
    this.objects.push(obj);
  }

  addObjects(objs) {
    objs.forEach((obj) => {
      this.objects.push(obj);
    });
  }

  removeObject(obj) {
    this.objects.splice(this.objects.indexOf(obj), 1);
  }

  getBackgroundColour() {
    return this.bgColor;
  }

  ratioedCoords(x, y) {
    // convert canvas coordinates to artboard coordinates
    //-> scaled by pixelRatio
    var artMeta = this.getArtboardMetadata();
    return { x: x / artMeta.pixelRatio, y: y / artMeta.pixelRatio };
  }
  relativeCoords(x, y) {
    // converts global coordinates to ones that are relative to the artboard
    //-> i.e.if coord is left of artboard relative coord is negative
    var artMeta = this.getArtboardMetadata();
    return { x: x - artMeta.baseCoord.w, y: y - artMeta.baseCoord.h };
  }
  localCoords(x, y) {
    // ratioedCoords + relativeCoords
    var artMeta = this.getArtboardMetadata();
    return {
      x: (x - artMeta.baseCoord.w) / artMeta.pixelRatio,
      y: (y - artMeta.baseCoord.h) / artMeta.pixelRatio,
    };
  }

  getArtboardMetadata() {
    let scrW = window.innerWidth;
    let scrH = window.innerHeight;
    var m = this.margin * 6;

    if (scrW / scrH > this.width / this.height) {
      var orient = "v";
      var artH = scrH - m;
      var artW = this.width * (artH / this.height);
      var baseW = (scrW - artW) / 2;
      var baseH = this.margin;
    } else if (scrW / scrH < this.width / this.height) {
      var orient = "h";
      var artW = scrW - m;
      var artH = this.height * (artW / this.width);
      var baseW = this.margin;
      var baseH = (scrH - artH) / 2;
    } else {
      var orient = "sq";
      if (scrW >= scrH) {
        var artW = scrW - m;
        var artH = this.height * (this.width / scrW);
      } else {
        var artH = scrH - m;
        var artW = this.width * (this.height / scrH);
      }
    }

    if (orient === "v") {
      var pixelRatio = artW / this.width;
    } else {
      var pixelRatio = artH / this.height;
    }

    return {
      width: artW,
      height: artH,
      orient: orient,
      baseCoord: { w: baseW, h: baseH },
      pixelRatio: pixelRatio,
    };
  }

  drawArtboard(context, artMeta) {
    context.fillStyle = this.bgColor;
    context.fillRect(
      artMeta.baseCoord.w,
      artMeta.baseCoord.h,
      artMeta.width,
      artMeta.height
    );
  }

  drawObjects(context, artMeta) {
    this.objects.forEach((obj) => {
      obj.render(context, artMeta.pixelRatio, artMeta.baseCoord);
    });
  }

  draw(context) {
    const artMeta = this.getArtboardMetadata();

    this.drawArtboard(context, artMeta);
    this.drawObjects(context, artMeta);
  }
}

class infiniteScrollArtboard extends Artboard {
  constructor(width, bgColor) {
    super(width, 2 * width, bgColor);
  }

  drawArtboard(context, artMeta) {
    context.fillStyle = this.bgColor;
    context.fillRect(artMeta.baseCoord.w, 0, artMeta.width, window.innerHeight);
  }
}

class infiniteArtboard extends Artboard {
  constructor(width, bgColor) {
    super(width, 2 * width, bgColor);
  }

  drawArtboard(context, artMeta) {
    context.fillStyle = this.bgColor;
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

class noArtboard extends Artboard {
  constructor(bgColor) {
    super(1000, 1000, bgColor);
    this.objects = [
      new Text(
        0,
        (window.innerHeight / 3) * 2,
        "No Document created",
        "Iosevka heavy",
        100,
        "#393939"
      ),
    ];

    this.editable = false;
  }
}

export default Artboard;
export { noArtboard, infiniteScrollArtboard, infiniteArtboard };
