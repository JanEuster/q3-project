import BoundingBox from "../Objects/BoundingBox";
import Panel from "./BasePanel";
import { PanelButton } from "./PanelComponents";
import GLOBALS from "../../../Globals";
class PanelToolButton extends PanelButton {
  constructor(x, y, w, h, tool) {
    super(x, y, w, h);

    this.tool = tool;
    this.fS = GLOBALS.COLORS.lightgrey;
    this.activeSS = GLOBALS.COLORS.midorange;
    this.lW = 6;
  }

  render(context, panelOffset, active = false) {
    context.fillStyle = this.fS;
    context.strokeStyle = this.sS;
    if (active) context.strokeStyle = this.activeSS;
    context.lineWidth = this.lW;

    context.fillRect(
      panelOffset.x + this.coords.x,
      panelOffset.y + this.coords.y,
      this.width,
      this.height
    );

    let icon = new Image();
    icon.src = this.tool.icon;
    context.drawImage(
      icon,
      panelOffset.x + this.coords.x,
      panelOffset.y + this.coords.y
    );

    context.strokeRect(
      panelOffset.x + this.coords.x,
      panelOffset.y + this.coords.y,
      this.width,
      this.height
    );
    // this.boundingBox.render(context, panelOffset)
  }
}

class Toolbox extends Panel {
  constructor(toolManager) {
    let width = 120;
    let height = (width / 2) * Math.ceil(toolManager.tools.length / 2);
    let margin = 16;
    let border = 8;

    super(-150, -(70 + height), width, height, margin, border);
    this.toolManager = toolManager;

    this.toolWidth = 36;

    this.componenets = [];
    for (let i = 0; i < this.toolManager.tools.length; i++) {
      let offsetX = this.margin + (this.margin + this.toolWidth) * (i % 2);
      let offsetY =
        this.margin +
        (this.margin + this.toolWidth) * Math.ceil((i + 0.5) / 2 - 1);
      this.components.push(
        new PanelToolButton(
          offsetX,
          offsetY,
          this.toolWidth,
          this.toolWidth,
          this.toolManager.tools[i]
        )
      );
    }
  }

  handleCollision(tool) {
    if (tool !== this.toolManager.activeTool) {
      this.toolManager.toolDeselect();
      this.toolManager.activeTool = tool;
      this.toolManager.toolSelect();
    }
  }

  checkBoundsCollision(x, y) {
    let panelXY = this.getXY();

    this.boundingBox = new BoundingBox(
      panelXY.x - this.bhalf,
      panelXY.y - this.bhalf,
      this.width + this.border,
      this.height + this.border
    );
    if (this.boundingBox.checkCollision(x, y)) {
      this.components.forEach((comp) => {
        if (comp.boundingBox.checkCollision(x - panelXY.x, y - panelXY.y))
          this.handleCollision(comp.tool);
      });
      return true;
    }
    return false;
  }

  renderComponents(context, panelXY) {
    let panelOffset = panelXY; // {x: x, y: y} panel offset to
    this.components.forEach((comp) => {
      let active = false;
      if (comp.tool === this.toolManager.activeTool) active = true; // if tool is the active tool it needs to rendered distictively

      comp.render(context, panelOffset, active);
    });
  }
}

export default Toolbox;
export { PanelToolButton }
