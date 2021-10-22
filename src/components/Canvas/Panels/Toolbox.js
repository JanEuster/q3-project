const colors = require("../../colors.json");

class Toolbox {
  constructor() {
    this.width = 120;
    this.height = 240;
    this.margin = 8;
    this.innerWidth = this.width - 2 * this.margin;
    this.innerHeight = this.height - 2 * this.margin;
    this.toolWidth = 20;

    this.tools = [];
  }

  renderTools(context, boxX, boxY) {
    let toolWidth = (this.innerWidth - 3 * this.margin) / 2;
    let border = 4;

    for (let i = 0; i < 6; i++) {
      let offsetX = (this.margin + toolWidth) * (i % 2);
      let offsetY = (this.margin + toolWidth) * Math.ceil((i + 0.5) / 2 - 1);
      // console.log(offsetX, offsetY);

      context.fillStyle = context.fillStyle = colors.darkgrey;
      context.fillRect(
        boxX + offsetX + 2 * this.margin,
        boxY + offsetY + 2 * this.margin,
        toolWidth,
        toolWidth
      );

      context.fillStyle = colors.lightgrey;
      if (i === 0) {
        context.fillStyle = colors.midorange;
      }
      context.fillRect(
        boxX + offsetX + 2 * this.margin + border,
        boxY + offsetY + 2 * this.margin + border,
        toolWidth - 2 * border,
        toolWidth - 2 * border
      );
    }
  }

  render(context) {
    let toolBoxX = window.innerWidth - 1.5 * this.width;
    let toolBoxY = window.innerHeight - 1.5 * this.height;
    context.fillStyle = colors.darkgrey;
    context.fillRect(toolBoxX, toolBoxY, this.width, this.height);
    context.fillStyle = colors.grey;
    context.fillRect(
      toolBoxX + this.margin,
      toolBoxY + this.margin,
      this.width - 2 * this.margin,
      this.height - 2 * this.margin
    );

    this.renderTools(context, toolBoxX, toolBoxY);
  }
}

export default Toolbox;
