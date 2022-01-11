import BoundingBox from "../Objects/BoundingBox"
const colors = require("../../colors.json");

class BasePanelComponent {
    constructor(x, y) {
        this.coords = {x: x, y: y}

        this.boundingBox = new BoundingBox(0, 0, 0, 0)
    }

    handleColission() {
        console.log("clicked", this)
    }

    render(context, panelOffset) {

    }
}

class PanelButton extends BasePanelComponent {
    constructor(x, y, w, h) {
        super(x, y)

        this.width = w
        this.height = h
        
        this.fS = colors.grey
        this.sS = colors.darkgrey
        this.lW = 5

        this.boundingBox = new BoundingBox(x, y, w, h)
    }

    render(context, panelOffset) {
        context.fillStyle = this.fS
        context.strokeStyle = this.sS
        context.lineWidth = this.lW

        context.fillRect(
            panelOffset.x + this.coords.x,
            panelOffset.y + this.coords.y,
            this.width,
            this.height
        )
        context.strokeRect(
            panelOffset.x + this.coords.x,
            panelOffset.y + this.coords.y,
            this.width,
            this.height
        )
        // this.boundingBox.render(context, panelOffset)
    }
}

class PanelText extends BasePanelComponent {
    constructor(x, y, text) {
        
        super(x, y)
        
        this.text = text
        // this.width = w
        // this.height = h
        this.height = 15
        this.fixBoundY = this.height * 4/5
        
        this.width = this.height * this.text.length/2

        this.font = `${this.height}px iosevka semibold`
        this.fS = colors.darkgrey
        
        this.boundingBox = new BoundingBox(x, y-this.fixBoundY, this.width, this.height)
    }

    render(context, panelOffset) {
        context.font = this.font
        context.fillStyle = this.fS

        context.fillText(this.text, panelOffset.x + this.coords.x, panelOffset.y + this.coords.y)
        // this.boundingBox.render(context, panelOffset)
    }
}

class PanelTitle extends PanelText {
    constructor(x, y, text) {
        super(x, y, text)

        this.height = 25
        this.fixBoundY = this.height * 4/5
        
        this.width = this.height * this.text.length / 2
        this.font = `${this.height}px iosevka bold`

        
        this.boundingBox = new BoundingBox(x, y-this.fixBoundY, this.width, this.height)
    }
}


class PanelTextSwitch extends PanelText {
    constructor(x, y, text) {
        
        super(x, y, text)

        this.state = false
        this.switchFill = {off: colors.grey, on: colors.midblue}
        this.switchDiameter = this.height
        this.textXOffset = 1.5 * this.switchDiameter
        this.width = this.width + this.textXOffset
        
        this.boundingBox = new BoundingBox(x, y-this.fixBoundY, this.width, this.height)
    }

    handleColission() {
        this.state = !this.state
    }

    render(context, panelOffset) {
        context.font = this.font
        context.fillStyle = this.fS

        context.strokeStyle = this.fS
        context.lineWidth = 3

        context.fillText(
            this.text,
            panelOffset.x + this.coords.x + this.textXOffset,
            panelOffset.y + this.coords.y
        )

        if (this.state) {
            context.fillStyle = this.switchFill.on
        } else {
            context.fillStyle = this.switchFill.off
        }

        context.fillRect(
            panelOffset.x + this.coords.x,
            panelOffset.y + this.coords.y - this.fixBoundY,
            this.switchDiameter,
            this.switchDiameter
        )

        context.strokeRect(
            panelOffset.x + this.coords.x,
            panelOffset.y + this.coords.y - this.fixBoundY,
            this.switchDiameter,
            this.switchDiameter
        )
        // this.boundingBox.render(context, panelOffset)
    }
}


export { PanelButton, PanelText, PanelTitle, PanelTextSwitch }