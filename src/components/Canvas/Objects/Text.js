import BaseShape from "./BasicShapes";
import BoundingBox from "./BoundingBox";


class Text extends BaseShape {
    constructor(x, y, text = "", font = "Iosevka Bold", fontSize = 100, fillStyle = "#393939") {
        super(x, y, 0, 0)
        this.text = text
        this.font = font
        this.fontSize = fontSize
        this.fillStyle = fillStyle

        this.setWidthHeight()

        this.setBounds(x, y)
    }

    setBounds(x, y) {
        this.boundingBox.setBounds(x, y - this.height, x + this.width, y)
    }

    move(x, y) {
    this.xCoord += x
    this.yCoord += y

    this.setBounds(this.xCoord, this.yCoord)

    }


    setWidthHeight() {
        this.width = this.text.length * this.fontSize / 2
        this.height = this.fontSize
    }

    setText(text) {
        this.text = text
        this.setWidthHeight()
        this.setBounds(this.xCoord, this.yCoord)
    }
    addText(text) {
        this.text += text
        this.setWidthHeight()
        this.setBounds(this.xCoord, this.yCoord)
    }
    removeLastChar() {
        this.text = this.text.slice(0, -1)
        this.setWidthHeight()
        this.setBounds(this.xCoord, this.yCoord)
    }
    clearText() {
        this.text = ""
        this.setWidthHeight()
        this.setBounds(this.xCoord, this.yCoord)
    }


    setFont(fontfamily) {
        this.font = fontfamily
    }
    setFontSize(fontSize) {
        this.fontSize = fontSize
    }

    render(context, pixelRatio, baseCoord) {
        context.font = `${this.fontSize * pixelRatio}px ${this.font}` // i.e. 30px iosevka demibold
        context.fillStyle = this.fillStyle

        context.fillText(
            this.text,
            baseCoord.w + pixelRatio * this.xCoord,
            baseCoord.h + pixelRatio * this.yCoord
        )

        // this.boundingBox.render(context, {x : baseCoord.w, y: baseCoord.h}, pixelRatio)
    }

}

export default Text