import Panel from './BasePanel';
import BoundingBox from './../Objects/BoundingBox';
import BasePanelComponent, { PanelButton, PanelFunctionalText, PanelText, PanelTitle } from "./PanelComponents"
import { selectionT, pencilT, eraserT, textT } from '../Tools';
const colors = require("../../colors.json")


class PanelColorButton extends PanelButton {
  constructor(x, y, d, color, selectorComponent) {
    super(x, y, d, d)
  
    this.fS = color
    this.sS = colors.darkgrey
    this.lW = 3

    this.selectorComponent = selectorComponent
  }
}

class PanelColorSelectorComponent extends BasePanelComponent {
  constructor(x, y, elementsX, diameter = 10, toolManager) {
    let colors = [
      "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
      "#FF8000", "#FF0080", "#FF8080",
      "#80FF00", "#00FF80", "#80FF80",
      "#8000FF", "#0080FF", "#8080FF",
      "#FFFFFF", "#BFBFBF", "#808080", "#404040", "#000000"
    ]

    let margin = Math.round(diameter / 5 * 2)
    let elementsY = Math.ceil(colors.length/elementsX)
    let w = margin + elementsX * (margin + diameter)
    let h = margin + elementsY * (margin + diameter)
    super(x, y, w, h)

    this.margin = margin
    this.elementsX = elementsX
    this.elementsY = elementsY
    this.diameter = diameter

    this.colors = colors
    this.activeColor = colors[0]

    this.toolManager = toolManager

    this.boundingBox = new BoundingBox(x, y, w, h)
   
    this.subComponents = [new PanelColorButton(
      this.coords.x + this.margin,
      this.coords.y + this.margin + this.elementsY * (margin + diameter),
      this.diameter * 2,
      this.toolManager,
      this
    )]
    for (let i = 0; i < colors.length; i++) {
      this.subComponents.push(
        new PanelColorButton(
          this.coords.x + this.margin + i % this.elementsX * (margin + diameter),
          this.coords.y + this.margin + Math.floor(i / this.elementsX) * (margin + diameter),
          this.diameter,
          this.colors[i],
          this
        )
      ) 
    }

    this.setActiveColor()
  }

  setActiveColor() {
    console.log("a")
    this.subComponents[0].fS = this.activeColor
    this.toolManager.strokeStyle = this.activeColor
  }
  getActiveColor() {
    return this.activeColor
  }

  checkSubCollision(x, y) {
    this.subComponents.map(comp => {
      if (comp.boundingBox.checkCollision(x, y)) {
        this.activeColor = comp.fS

        this.setActiveColor()
        return comp
      }
    })
  }

  renderComponents(context, panelOffset) {
    this.subComponents.map(comp => {
      comp.render(context, panelOffset)
    })
  }
  render(context, panelOffset) {
    this.renderComponents(context, panelOffset)
  }
}






class ToolSettingsPanel extends Panel {
  constructor(toolManager) {
    let width = 120;
    let height = 160;
    let margin = 16;
    let border = 8;
    
    super(-280, -(70 + height), width, height, margin, border)
    this.toolManager = toolManager;
    
    this.components = [
      new PanelTitle(5, 20, "Tool Settings", 17),
      new PanelFunctionalText(6, 32, () => {
        return "->"+this.toolManager.activeTool.name
      }, 12)]
    this.toolSettings = {
      "select": {
        components: [ ], size: {height: 160}},
      "pencil": {components: [new PanelColorSelectorComponent(4, 35, 5, 15, this.toolManager)], size: {height: 170}},
      "eraser": {components: [], size: {height: 160}},
      "text":   {components: [], size: {height: 160}}
    }
  }


  checkBoundsCollision(x, y) { 
    let panelXY = this.getXY()
    this.boundingBox = new BoundingBox(panelXY.x - this.bhalf, panelXY.y - this.bhalf, this.width + this.border, this.height + this.border)
    
    if (this.boundingBox.checkCollision(x, y)) {
      let components = [...this.components, ...this.toolSettings[this.toolManager.activeTool.name].components]

      components.map(comp => {
        if (comp.boundingBox.checkCollision(x - panelXY.x, y - panelXY.y)) {
          if (comp instanceof PanelColorSelectorComponent) {
            comp.checkSubCollision(x - panelXY.x, y - panelXY.y)
          } else {
            comp.handleColission()
          }
        }
      })
      return true
    }
    return false
  }
    
  renderComponents(context, panelXY) {
    let panelOffset = panelXY // {x: x, y: y} panel offset to 

    let components = [...(this.components), ...this.toolSettings[this.toolManager.activeTool.name].components] // list of all components
    components.map(comp => {
      let active = false
    if (comp.tool === this.toolManager.activeTool) active = true // if tool is the active tool it needs to rendered distictively
  
      comp.render(context, panelOffset, active)
  })
  }


  render(context) {
    this.height = this.toolSettings[this.toolManager.activeTool.name].size.height
    this.y = -(70 + this.height)

    context.fillStyle = colors.grey
    context.strokeStyle = colors.darkgrey
    context.lineWidth = this.border

    let panelXY = this.getXY()

    context.fillRect(panelXY.x, panelXY.y, this.width, this.height)
    context.strokeRect(panelXY.x, panelXY.y, this.width, this.height)

    this.renderComponents(context, panelXY)
  }
}

export default ToolSettingsPanel;