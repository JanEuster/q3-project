import BaseShape from "./BasicShapes";

class TextObj extends BaseShape {
  constructor(
    x,
    y,
    text = "",
    font = "Iosevka Bold",
    fontSize = 100,
    fillStyle = "#393939"
  ) {
    super(x, y, 0, 0);
    this.text = text;
    this.font = font;
    this.fontSize = fontSize;
    this.fillColor = fillStyle;

    this.setWidthHeight();

    this.setBounds(x, y);
  }
  getSaveInformation() {
    // return all necessary information for saving document to file
    return {
      attributes: {
        xCoord: this.xCoord,
        yCoord: this.yCoord,
        font: this.font,
        fontSize: this.fontSize,
        fillColor: this.fillColor,
      },
      text: this.text,
    };
  }
  newBounds() {
    this.setWidthHeight();
    this.setBounds(this.xCoord, this.yCoord);
  }

  setBounds(x = this.xCoord, y = this.yCoord) {
    this.boundingBox.setBounds(x, y - this.height, x + this.width, y);
  }

  move(x, y) {
    this.xCoord += x;
    this.yCoord += y;

    this.setBounds(this.xCoord, this.yCoord);
  }

  setWidthHeight() {
    this.width = (this.text.length * this.fontSize) / 2;
    this.height = this.fontSize;
  }

  setText(text) {
    this.text = text;
    this.setWidthHeight();
    this.setBounds(this.xCoord, this.yCoord);
  }
  addText(text) {
    this.text += text;
    this.setWidthHeight();
    this.setBounds(this.xCoord, this.yCoord);
  }
  removeLastChar() {
    this.text = this.text.slice(0, -1);
    this.setWidthHeight();
    this.setBounds(this.xCoord, this.yCoord);
  }
  clearText() {
    this.text = "";
    this.setWidthHeight();
    this.setBounds(this.xCoord, this.yCoord);
  }

  setFont(fontfamily) {
    this.font = fontfamily;
  }
  setFontSize(fontSize) {
    this.fontSize = fontSize;
  }
  setfillColor(fillColor) {
    this.fillColor = fillColor;
  }

  render(context, pixelRatio, baseCoord) {
    context.font = `${this.fontSize * pixelRatio}px ${this.font}`; // i.e. 30px iosevka demibold
    context.fillStyle = this.fillColor;

    this.width = context.measureText(this.text).width / pixelRatio;
    this.setBounds(this.xCoord, this.yCoord);

    context.fillText(
      this.text,
      baseCoord.w + pixelRatio * this.xCoord,
      baseCoord.h + pixelRatio * this.yCoord
    );

    // this.boundingBox.render(context, {x : baseCoord.w, y: baseCoord.h}, pixelRatio)
  }
}

export default TextObj;
