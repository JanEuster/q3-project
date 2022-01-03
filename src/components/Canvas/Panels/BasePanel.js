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

        this.rightSided = rightSided // determines whether panel sticks to top left or bottom right side of the window

        this.components = [ new PanelButton( 20, 100, 20, 20 ), new PanelTitle( 20, 30, "Settings" ), new PanelText( 20, 50, "Settings" ), new PanelTextSwitch( 20, 80, "Settings" )]

        this.boundingBox = new BoundingBox(this.x - this.bhalf, this.y - this.bhalf, this.width + this.border, this.height + this.border)
    }
    
    checkBoundsCollision(x, y) { 
        this.boundingBox = new BoundingBox(this.x - this.bhalf, this.y - this.bhalf, this.width + this.border, this.height + this.border)
        if (this.boundingBox.checkCollision(x, y)) {
            this.components.map(comp => {
                if (comp.boundingBox.checkCollision(x - this.x, y - this.y)) comp.handleColission()
            })
            return true
        }
        return false
    }
    
    setXY() {
        // set x and y base values on resize
    }

    onResize() {
        this.setXY()
    }

    renderComponents(context) {
        this.components.map(comp => {
            let panelOffset = {x: this.x, y: this.y} // panel offset to 
            comp.render(context, panelOffset)
        })
    }
    render(context) {
        context.fillStyle = colors.grey
        context.strokeStyle = colors.darkgrey
        context.lineWidth = this.border

        context.fillRect(this.x, this.y, this.width, this.height)
        context.strokeRect(this.x, this.y, this.width, this.height)

        this.renderComponents(context)
    }
}


export default Panel;