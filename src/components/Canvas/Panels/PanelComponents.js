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

        this.boundingBox = new BoundingBox(x, y -this.lW, w +this.lW, h +this.lW) // NOTE: this expands boundingBox by 5px for all PanelButton derivatives as well
    }

    render(context, panelOffset) {
        context.fillStyle = this.fS
        context.strokeStyle = this.sS
        context.lineWidth = this.lW

        // console.log(
        //                 panelOffset.x + this.coords.x,
        //     panelOffset.y + this.coords.y,
        // )
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
    constructor(x, y, text, size=15) {
        
        super(x, y)
        
        this.text = text
        // this.width = w
        // this.height = h
        this.height = size
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

class PanelFunctionalText extends PanelText {
    constructor(x, y, textFunc, size) {
        super(x, y, textFunc, size)
    }
    render(context, panelOffset) {
    context.font = this.font
    context.fillStyle = this.fS

    context.fillText(this.text(), panelOffset.x + this.coords.x, panelOffset.y + this.coords.y)
    // this.boundingBox.render(context, panelOffset)
}
}

class PanelTitle extends PanelText {
    constructor(x, y, text, size=25) {
        super(x, y, text, size)

        this.height = size
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

class PanelSlider extends BasePanelComponent {

    constructor(x, y, w, h=28, func=undefined) {
        super(x, y)

        this.width = w
        this.height = h

        this.func = func
        
        this.fS = colors.darkgrey
        this.sS = colors.darkgrey
        this.lW = 5

        this.sliderPosition = 0.5 // number 0-1 position of knob along slider
        this.knobWidth = this.height/2

        this.boundingBox = new BoundingBox(x, y -this.lW, w +this.lW, h +this.lW) // NOTE: this expands boundingBox by 5px for all PanelButton derivatives as well

        this.setSliderPos(this.sliderPosition)
    }

    handleColission(x, y) {
        let xPercent = (x - this.coords.x) / this.width
        console.log(xPercent)
        this.setSliderPos(xPercent)
    }

    getSliderPos() {
        return this.sliderPosition
    }
    setSliderPos(pos) {
        if (pos < 0) {
            this.sliderPosition = 0
        } else if (pos > 1) {
            this.sliderPosition = 1
        } else {
            this.sliderPosition = pos
        }
        if (this.func) {
            this.func(this.sliderPosition)
        }
    }

    render(context, panelOffset) {
        context.fillStyle = this.fS
        context.strokeStyle = this.sS
        context.lineWidth = this.lW


        // 
        context.beginPath()
        context.moveTo(
            panelOffset.x + this.coords.x,
            panelOffset.y + this.coords.y + this.height / 2
        )
        context.lineTo(
            panelOffset.x + this.coords.x + this.width,
            panelOffset.y + this.coords.y + this.height / 2
        )
        context.stroke()
        context.closePath()
        
        context.fillRect(
            panelOffset.x + this.coords.x + this.sliderPosition * (this.width - this.knobWidth),
            panelOffset.y + this.coords.y,
            this.knobWidth,
            this.height
        )
        context.strokeStyle = colors.grey
        context.strokeRect(
            panelOffset.x + this.coords.x + this.sliderPosition * (this.width - this.knobWidth),
            panelOffset.y + this.coords.y,
            this.knobWidth,
            this.height
        )
        // this.boundingBox.render(context, panelOffset)
    }
}

export default BasePanelComponent
export { PanelButton, PanelText, PanelFunctionalText, PanelTitle, PanelTextSwitch, PanelSlider }