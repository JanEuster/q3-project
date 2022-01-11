import BoundingBox from "../Objects/BoundingBox";
import { PanelButton, PanelText, PanelTitle, PanelTextSwitch } from "./PanelComponents";

const colors = require("../../colors.json");




class Panel {
    constructor(x, y, width, height, margin, border, rightSided=false) {
        this.x = x
        this.y = y
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.border = border
        this.bhalf = this.border/2

        this.components = [ ]

        this.boundingBox = new BoundingBox(this.x - this.bhalf, this.y - this.bhalf, this.width + this.border, this.height + this.border)
    }
    
    checkBoundsCollision(x, y) { 
        let panelXY = this.getXY()

        this.boundingBox = new BoundingBox(panelXY.x - this.bhalf, panelXY.y - this.bhalf, this.width + this.border, this.height + this.border)
        if (this.boundingBox.checkCollision(x, y)) {
            this.components.map(comp => {
                if (comp.boundingBox.checkCollision(x - panelXY.x, y - panelXY.y)) comp.handleColission(x - panelXY.x, y - panelXY.y)
            })
            return true
        }
        return false
    }
    
    getXY() {
        // if panel x or y coords are negative, the panel is sticky towards that bottom/ right side
        let x, y;

        if (this.x < 0) {
            x = window.innerWidth + this.x
        } else x = this.x 
        if (this.y < 0) {
            y = window.innerHeight + this.y
        } else y = this.y
        return {x: x, y: y}
    }


    renderComponents(context, panelXY) {
        this.components.map(comp => {
            let panelOffset = panelXY // {x: x, y: y} panel offset to 
            comp.render(context, panelOffset)
        })
    }
    render(context) {
        context.fillStyle = colors.grey
        context.strokeStyle = colors.darkgrey
        context.lineWidth = this.border

        let panelXY = this.getXY()

        context.fillRect(panelXY.x, panelXY.y, this.width, this.height)
        context.strokeRect(panelXY.x, panelXY.y, this.width, this.height)

        this.renderComponents(context, panelXY)
    }
}


export default Panel;