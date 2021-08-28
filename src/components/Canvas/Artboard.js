import BaseObject from "./Objects/BaseObject.js";

class Artboard {
	// 
	constructor(width, height, content, bgColor) {
		this.width = width;
		this.height = height;
		this.content = content;
		this.bgColor = bgColor; 

		this.margin = 10;	// margin to be set around the artboard
		this.objects = [];


	}

	addObjects(objs) {
        objs.forEach((obj) => {
            this.objects.push(obj);
        });
    }


	calcOrientation(scrW, scrH) {
		var m = this.margin * 2;
		if ((scrW/scrH) > (this.width/this.height)) {
			var orient = 'v';
			var artH = scrH - m;
			var artW = this.width * (artH/this.height);
            var baseW = (scrW-artW)/2;
            var baseH = this.margin;
		} else if ((scrW/scrH) < (this.width/this.height)) {
			var orient = 'h';
			var artW = scrW - m;
			var artH = this.height * (artW/this.width);
            var baseW = this.margin;
            var baseH = (scrH-artH)/2;
		} else {
			var orient = 'sq'
			if (scrW >= scrH) {
				var artW = scrW - m;
				var artH = this.height * (this.width/scrW);
			} else {
				var artH = scrH - m;
				var artW = this.width * (this.height/scrH);
			}
		}
        
        if (orient === 'v'){
             var pixelRatio = artW/this.width;
        } else {
             var pixelRatio = artH/this.height;
        }

		return {width: artW, height: artH, orient: orient, baseCoord: {w: baseW, h: baseH}, pixelRatio: pixelRatio};
	}

	drawArtboard(context, artMeta) {
        console.log("orientation: ", artMeta.orient);
        
		context.fillStyle = this.bgColor; 	
		context.fillRect(artMeta.baseCoord.w, artMeta.baseCoord.h, artMeta.width, artMeta.height);
	}

    drawObjects(context, artMeta) {
        console.log(artMeta.pixelRatio);

        this.objects.forEach((obj) => {
            obj.render(context, artMeta.pixelRatio, artMeta.baseCoord);
        });
    }

	draw(context) {
        // reset canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); 


		var artMeta = this.calcOrientation(context.canvas.width, context.canvas.height);

		this.drawArtboard(context, artMeta);		
        this.drawObjects(context, artMeta);
	
		
	}
}


export default Artboard;
