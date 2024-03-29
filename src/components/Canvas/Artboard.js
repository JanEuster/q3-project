import TextObj from "./Objects/Text";
import HistoryTracker from "./util/ArtboardHistory";

// Artboard class is responsible for storing current state of an artboard with all its objects
// this current state is drawn to the screen at an set intervat using the draw() method

// the class also manages the zooming and panning position on the artboard 
// and computes the scaled down version of the original artboard size to be displayed on screen
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

    this.viewOffset = { x: 0, y: 0 };
    this.zoom = 1;
    this.name = undefined;

    this.history = new HistoryTracker(this);

    this.toolManager = undefined;
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

    this.history.addStage();
  }

  getBackgroundColour() {
    return this.bgColor;
  }

  moveArtboard(x, y) {
    this.viewOffset.x += x / this.zoom;
    this.viewOffset.y += y / this.zoom;
  }

  setZoom(z) {
    this.zoom = this.zoom + 0.0008 * z;
    if (this.zoom < 0) this.zoom = 0.01;
  }

  // convert application screen coords to coords relative and scaled to the artboard positon and resolution
  localCoords(x, y) {
    // ratioedCoords + relativeCoords
    var artMeta = this.getArtboardMetadata();
    var artPos = this.applyZoomOffset(artMeta);

    return {
      x: (x - artPos.x) / artMeta.pixelRatio / this.zoom,
      y: (y - artPos.y) / artMeta.pixelRatio / this.zoom,
    };
  }

  // counter operation to localCoords
  globalCoords(x, y) {
    // ratioedCoords + relativeCoords
    var artMeta = this.getArtboardMetadata();
    var artPos = this.applyZoomOffset(artMeta);
    return {
      x: x * this.zoom * artMeta.pixelRatio + artPos.x,
      y: y * this.zoom * artMeta.pixelRatio + artPos.y,
    };
  }

  getArtboardMetadata() {
    // computes:
    // - size of artboard on users screen
    // - the orientation ?
    // - the top left coordinates from which the artboard is to be drawn
    // - the scale on the users screen to determine size objects should be drawn at
    let scrW = window.innerWidth;
    let scrH = window.innerHeight;
    var m = this.margin * 6;

    var orient, artW, artH, baseW, baseH;
    if (scrW / scrH > this.width / this.height) {
      orient = "v";
      artH = scrH - m;
      artW = this.width * (artH / this.height);
      baseW = (scrW - artW) / 2;
      baseH = this.margin;
    } else if (scrW / scrH < this.width / this.height) {
      orient = "h";
      artW = scrW - m;
      artH = this.height * (artW / this.width);
      baseW = this.margin;
      baseH = (scrH - artH) / 2;
    } else {
      orient = "sq";
      if (scrW >= scrH) {
        artW = scrW - m;
        artH = this.height * (this.width / scrW);
      } else {
        artH = scrH - m;
        artW = this.width * (this.height / scrH);
      }
    }

    var pixelRatio;
    if (orient === "v") {
      pixelRatio = artW / this.width;
    } else {
      pixelRatio = artH / this.height;
    }

    // artW =
    //   window.innerWidth / 2 -
    //   this.zoom * (window.innerWidth / 2 - (artW + this.viewOffset.x));
    // artH =
    //   window.innerHeight / 2 -
    //   this.zoom * (window.innerHeight / 2 - (artH + this.viewOffset.y));

    return {
      width: artW,
      height: artH,
      orient: orient,
      baseCoord: { w: baseW, h: baseH },
      pixelRatio: pixelRatio,
    };
  }

  // applies this.zoom and this.viewOffset to coords for draw
  applyZoomOffset(artMeta) {
    // calculate x, y distance from center of screen and multiplies it by zoom factor => recalculate zoomed offsets from top left corner
    // also applies viewOffset
    let xOffset =
      window.innerWidth / 2 -
      this.zoom *
      (window.innerWidth / 2 - (artMeta.baseCoord.w + this.viewOffset.x));
    let yOffset =
      window.innerHeight / 2 -
      this.zoom *
      (window.innerHeight / 2 - (artMeta.baseCoord.h + this.viewOffset.y));

    // width and hight are simply multiplied by zoom factor
    return {
      x: xOffset,
      y: yOffset,
      w: this.zoom * artMeta.width,
      h: this.zoom * artMeta.height,
    };
  }

  drawArtboard(context, zoomOffsetMeta) {
    context.fillStyle = this.bgColor;
    context.fillRect(...Object.values(zoomOffsetMeta));
  }

  drawObjects(context, pixelRatio, baseCoord, ignoreZoom = false) {
    var zoom = 1;
    if (!ignoreZoom) zoom = this.zoom

    this.objects.forEach((obj) => {
      obj.render(context, pixelRatio * zoom, baseCoord);
    });
  }

  draw(context) {
    const artMeta = this.getArtboardMetadata();

    let zoomOffsetMeta = this.applyZoomOffset(artMeta);
    this.drawArtboard(context, zoomOffsetMeta);
    this.drawObjects(context, artMeta.pixelRatio, {
      w: zoomOffsetMeta.x,
      h: zoomOffsetMeta.y,
    });
  }
  drawExport(context, offset) {
    this.drawArtboard(context, offset);
    this.drawObjects(context, 1, {
      w: offset.x,
      h: offset.y,
    }, true);
  }
}

class infiniteScrollArtboard extends Artboard {
  constructor(width, bgColor) {
    super(width, 2 * width, bgColor);
  }

  drawArtboard(context, zoomOffsetMeta) {
    context.fillStyle = this.bgColor;
    context.fillRect(zoomOffsetMeta.x, 0, zoomOffsetMeta.w, window.innerHeight);
  }
}

class infiniteArtboard extends Artboard {
  constructor(width, bgColor) {
    super(width, 2 * width, bgColor);
  }

  drawArtboard(context, zoomOffsetMeta) {
    context.fillStyle = this.bgColor;
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

// an artboard to be drawn, then the user is on the href for opened artboards but no artboard is opened
class noArtboard extends Artboard {
  constructor(bgColor) {
    super(1000, 1000, bgColor);
    this.objects = [
      new TextObj(
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
