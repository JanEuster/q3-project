

class BaseObject {

   constructor(xCoord, yCoord, width, height, fillColor="#000000", borderColor="#FF1111") {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.borderColor = borderColor;

   }


   render(context, pixelRatio, baseCoord) {
        console.log("fillColor", this.fillColor);
        context.fillStyle = this.fillColor;

        console.log("baseCoords: ", baseCoord.w, baseCoord.h);
        console.log(pixelRatio);
        console.log(baseCoord.w + pixelRatio*this.xCoord, baseCoord.h + pixelRatio*this.yCoord);
        context.fillRect(baseCoord.w + pixelRatio*this.xCoord, baseCoord.h + pixelRatio*this.yCoord, pixelRatio*this.width, pixelRatio*this.height);
   }
}

export default BaseObject;
