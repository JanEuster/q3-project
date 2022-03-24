import GLOBALS from "../../../Globals";

class TextTool {
  constructor() {
    this.activeObject = NaN;

    this.toolManager = undefined;

    this.name = "text";

    this.icon = "assets/icons/tools/text.png";
  }

  select(obj) {
    if (obj instanceof Text) {
      this.activeObject = obj;
    }
  }

  use(e, Doc) {
    let coords = Doc.localCoords(
      e.clientX,
      e.clientY,
      window.innerWidth,
      window.innerHeight
    );

    if (e.type === "click") {
      this.activeObject = new Text(
        coords.x,
        coords.y,
        "",
        this.toolManager.font,
        this.toolManager.fontSize,
        this.toolManager.fillColorText
      );
    } else if (e.type === "mousedown") {
      this.activeObject = new Text(
        coords.x,
        coords.y,
        "",
        this.toolManager.font,
        this.toolManager.fontSize,
        this.toolManager.fillColorText
      );
      Doc.objects.push(this.activeObject);
    } else if (this.activeObject && e.type === "keypress") {
      this.activeObject.addText(e.key);
    } else if (this.activeObject && e.type === "keydown") {
      if (e.key === "Escape") {
        // console.log(this.activeObject.text.length);
        if (this.activeObject.text.length === 0) {
          Doc.removeObject(this.activeObject);
        } //check if textlength 0
        this.activeObject = NaN;
      } else if (e.key === "Backspace") {
        this.activeObject.removeLastChar();
      }
    }

    if (this.activeObject) {
      this.activeObject.fontSize = this.toolManager.fontSize;
      this.activeObject.setfillColor(this.toolManager.fillColorText);
      this.activeObject.setWidthHeight();
      this.activeObject.setBounds();
    }
  }

  deselect() {
    if (this.activeObject && this.activeObject.text.length === 0) {
      this.toolManager.Doc.removeObject(this.activeObject);
      this.activeObject = NaN;
      return false;
    }
    return this.activeObject;
  }

  graphic(context, artMeta, Doc) {
    var artPos = Doc.applyZoomOffset(artMeta);
    var zoom = Doc.zoom;
    var pixelRatio = artMeta.pixelRatio;

    // show selection box
    if (this.activeObject) {
      let x = this.activeObject.boundingBox.coords[0];
      let y = this.activeObject.boundingBox.coords[1];
      let w = this.activeObject.boundingBox.wh[0];
      let h = this.activeObject.boundingBox.wh[1];

      let offset = 32;
      // context.fillStyle = "#00FF00";
      context.lineWidth = 3; //TODO: lineWidth parameter;
      context.strokeStyle = GLOBALS.COLORS.midorange;

      context.strokeRect(
        artPos.x + zoom * pixelRatio * (x - offset),
        artPos.y + zoom * pixelRatio * (y - offset),
        zoom * pixelRatio * (w + offset * 2) + 10,
        zoom * pixelRatio * (h + offset * 2)
      );

      // text cursor
      context.fillRect(
        artPos.x +
        zoom *
        pixelRatio *
        (this.activeObject.xCoord + this.activeObject.width) +
        4,
        artPos.y +
        zoom *
        pixelRatio *
        (this.activeObject.yCoord - this.activeObject.height),
        3,
        zoom * pixelRatio * this.activeObject.height
      );
    }
  }
}

export default TextTool;