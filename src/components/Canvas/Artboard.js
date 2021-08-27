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
			var artW = this.width * (scrH/this.height) - m;
		} else if ((scrW/scrH) < (this.width/this.height)) {
			var orient = 'h';
			var artW = scrW - m;
			var artH = this.height * (scrW/this.width) - m;
		} else {
			var orient = 'sq'
			if (scrW >= scrH) {
				var artW = scrW - m;
				var artH = this.height * (this.width/scrW) - m;
			} else {
				var artH = scrH - m;
				var artW = this.width * (this.height/scrH) - m;
			}
		}
		console.log(artW, artH, orient);
		return { artW, artH, orient };
	}

	drawArtboard(context, artW, artH, orient) {
		if (orient === 'v') {
			var d = (context.canvas.width-artW)/2;
			context.fillStyle = this.bgColor; 
			context.fillRect(d + this.margin, this.margin, artW, artH);
		} else if (orient === 'h') {
			var d = (context.canvas.height-artH)/2;
			context.fillStyle = this.bgColor;
			context.fillRect(this.margin, d + this.margin, artW, artH);
		} else {
			context.fillStyle = '#dd2222';
			context.fillRect(200, 200, 500, 500); 
		}
	}

    drawObjects(context) {
        this.objects.forEach((obj) => {
            obj.render(context);
        });
    }

	draw(context) {
		var { artW, artH, orient } = this.calcOrientation(context.canvas.width, context.canvas.height);
		this.drawArtboard(context, artW, artH, orient);		
        this.drawObjects(context);
	
		
	}
}


export default Artboard;
