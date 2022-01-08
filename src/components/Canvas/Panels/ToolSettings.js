import Panel from './BasePanel';
import BoundingBox from './../Objects/BoundingBox';
import BasePanelComponent, { PanelButton, PanelText } from "./PanelComponents"
const colors = require("../../colors.json")


class PanelColorButton extends PanelButton {
  constructor(x, y, w, h, color) {
    super(x, y, w, h)
  
    this.fS = color
    this.sS = colors.darkgrey
    this.lW = 5
  }
}

class PanelColorSelectorComponent extends BasePanelComponent {
  constructor(x, y, w, h) {
    super(x, y, w, h)

    
  }
}


class ToolSettingsPanel extends Panel {
  constructor(toolManager) {
    let width = 120;
    let height = 160;
    let margin = 16;
    let border = 8;
    
    super(-300, -(70 + height), width, height, margin, border)
    this.toolManager = toolManager;
    
    this.components = {
      "select": [],
      "pencil": [new PanelColorButton(10, 10, 20, 20, "#BFEE87")],
      "eraser": [],
      "text":   []
    }
  }

  handleColission(tool) {

  }


  checkBoundsCollision(x, y) { 
      let panelXY = this.getXY()

      this.boundingBox = new BoundingBox(panelXY.x - this.bhalf, panelXY.y - this.bhalf, this.width + this.border, this.height + this.border)
      if (this.boundingBox.checkCollision(x, y)) {
        this.components.map(comp => {
          if (comp.boundingBox.checkCollision(x - panelXY.x, y - panelXY.y)) this.handleColission(comp.tool)
        })
        return true
      }
      return false
    }
    
    renderComponents(context, panelXY) {
      let panelOffset = panelXY // {x: x, y: y} panel offset to 
      this.components[this.toolManager.activeTool.name].map(comp => {
        console.log(comp)
        let active = false
      if (comp.tool === this.toolManager.activeTool) active = true // if tool is the active tool it needs to rendered distictively
    
        comp.render(context, panelOffset, active)
    })
  }
}

export default ToolSettingsPanel;