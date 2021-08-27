

class BaseObject {

   constructor(xCoord, yCoord, width, height, fillColor="#000000", borderColor="#FF1111") {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.borderColor = borderColor;

   }


   render(context) {
       console.log("fillColor", this.fillColor);
       context.fillStyle = this.fillColor;
       context.fillRect(this.xCoord, this.yCoord, this.width, this.height);
   }
}

export default BaseObject;
