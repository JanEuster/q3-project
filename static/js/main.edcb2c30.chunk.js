(this["webpackJsonpexpanded-board"]=this["webpackJsonpexpanded-board"]||[]).push([[0],{11:function(t){t.exports=JSON.parse('{"lightlightgrey":"#F8F8F8","lightgrey":"#EBEBEB","grey":"#DCDCDC","darkgrey":"#393939","lightorange":"#F3AA59","midorange":"#FA7D36","midblue":"#0D79F2"}')},32:function(t,e,i){t.exports=i(51)},37:function(t,e,i){},38:function(t,e,i){t.exports=i.p+"static/media/logo.ea09f389.svg"},39:function(t,e,i){},48:function(t,e,i){},51:function(t,e,i){"use strict";i.r(e);var n=i(0),o=i.n(n),s=i(22),h=i.n(s),r=(i(37),i(38),i(39),i(5)),a=i(10);function c(t){var e=t.right;return o.a.createElement(o.a.Fragment,null,e?o.a.createElement("li",{className:"right-nav"},o.a.createElement(a.b,{to:t.link},t.title)):o.a.createElement("li",null,o.a.createElement(a.b,{to:t.link},t.title)))}var l=function(t){return o.a.createElement("nav",{className:t.side},o.a.createElement("ul",{className:"Navbar"},o.a.createElement(c,{link:"/",title:"Home"}),o.a.createElement(c,{link:"/",title:"Document1"}),o.a.createElement(c,{link:"/",title:"Document2"}),o.a.createElement(c,{link:"/",title:"Document3"}),o.a.createElement(c,{link:"/",title:"Settings",right:"true"})))},d=i(1),u=i(2),f=function(){function t(e,i,n,o){Object(d.a)(this,t),this.width=e,this.height=i,this.content=n,this.bgColor=o,this.margin=10,this.objects=[],this.draw=this.draw.bind(this)}return Object(u.a)(t,[{key:"addObject",value:function(t){this.objects.push(t)}},{key:"addObjects",value:function(t){var e=this;t.forEach((function(t){e.objects.push(t)}))}},{key:"removeObject",value:function(t){this.objects.splice(this.objects.indexOf(t),1)}},{key:"getBackgroundColour",value:function(){return this.bgColor}},{key:"ratioedCoords",value:function(t,e){var i=this.getArtboardMetadata();return{x:t/i.pixelRatio,y:e/i.pixelRatio}}},{key:"relativeCoords",value:function(t,e){var i=this.getArtboardMetadata();return{x:t-i.baseCoord.w,y:e-i.baseCoord.h}}},{key:"localCoords",value:function(t,e){var i=this.getArtboardMetadata();return{x:(t-i.baseCoord.w)/i.pixelRatio,y:(e-i.baseCoord.h)/i.pixelRatio}}},{key:"getArtboardMetadata",value:function(){var t=window.innerWidth,e=window.innerHeight,i=6*this.margin;if(t/e>this.width/this.height)var n="v",o=e-i,s=(t-(r=this.width*(o/this.height)))/2,h=this.margin;else if(t/e<this.width/this.height){n="h";var r=t-i;o=this.height*(r/this.width),s=this.margin,h=(e-o)/2}else{n="sq";if(t>=e)r=t-i,o=this.height*(this.width/t);else o=e-i,r=this.width*(this.height/e)}if("v"===n)var a=r/this.width;else a=o/this.height;return{width:r,height:o,orient:n,baseCoord:{w:s,h:h},pixelRatio:a}}},{key:"drawArtboard",value:function(t,e){t.fillStyle=this.bgColor,t.fillRect(e.baseCoord.w,e.baseCoord.h,e.width,e.height)}},{key:"drawObjects",value:function(t,e){this.objects.forEach((function(i){i.render(t,e.pixelRatio,e.baseCoord)}))}},{key:"draw",value:function(t,e){t.clearRect(0,0,t.canvas.width,t.canvas.height),this.drawArtboard(t,e),this.drawObjects(t,e)}}]),t}(),v=i(4),g=i(3),b=function(){function t(e,i,n,o){Object(d.a)(this,t),this.coords=[e,i],this.wh=[n,o],this.endCoords=[e+n,i+o]}return Object(u.a)(t,[{key:"getCoords",value:function(){return this.coords}},{key:"setCoords",value:function(t,e){this.coords=[t,e],this.wh=[this.endCoords[0]-this.coords[0],this.endCoords[1]-this.coords[1]]}},{key:"getEndCoords",value:function(){return this.endCoords}},{key:"setEndCoords",value:function(t,e){this.endCoords=[t,e],this.wh=[this.endCoords[0]-this.coords[0],this.endCoords[1]-this.coords[1]]}},{key:"getWH",value:function(){return this.coords}},{key:"setWH",value:function(t,e){this.wh=[t,e],this.endCoords=[this.coords[0]+t,this.coords[1]+e]}},{key:"setBounds",value:function(t,e,i,n){this.setCoords(t,e),this.setEndCoords(i,n),this.setWH(this.endCoords[0]-this.coords[0],this.endCoords[1]-this.coords[1])}},{key:"checkCollision",value:function(t,e){return t>=this.coords[0]&&t<=this.endCoords[0]&&e>=this.coords[1]&&e<=this.endCoords[1]}},{key:"render",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;t.strokeStyle="#FF0000",t.lineWidth=3,t.strokeRect(e.x+i*this.coords[0],e.y+i*this.coords[1],i*this.wh[0],i*this.wh[1])}}]),t}(),y=i(11),m=function(){function t(e,i){Object(d.a)(this,t),this.coords={x:e,y:i},this.boundingBox=new b(0,0,0,0)}return Object(u.a)(t,[{key:"handleColission",value:function(){console.log("clicked",this)}},{key:"render",value:function(t,e){}}]),t}(),p=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o,s){var h;return Object(d.a)(this,i),(h=e.call(this,t,n)).width=o,h.height=s,h.fS=y.grey,h.sS=y.darkgrey,h.lW=5,h.boundingBox=new b(t,n-h.lW,o+h.lW,s+h.lW),h}return Object(u.a)(i,[{key:"render",value:function(t,e){t.fillStyle=this.fS,t.strokeStyle=this.sS,t.lineWidth=this.lW,t.fillRect(e.x+this.coords.x,e.y+this.coords.y,this.width,this.height),t.strokeRect(e.x+this.coords.x,e.y+this.coords.y,this.width,this.height)}}]),i}(m),w=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o){var s,h=arguments.length>3&&void 0!==arguments[3]?arguments[3]:15;return Object(d.a)(this,i),(s=e.call(this,t,n)).text=o,s.height=h,s.fixBoundY=4*s.height/5,s.width=s.height*s.text.length/2,s.font="".concat(s.height,"px iosevka semibold"),s.fS=y.darkgrey,s.boundingBox=new b(t,n-s.fixBoundY,s.width,s.height),s}return Object(u.a)(i,[{key:"render",value:function(t,e){t.font=this.font,t.fillStyle=this.fS,t.fillText(this.text,e.x+this.coords.x,e.y+this.coords.y)}}]),i}(m),x=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o,s){return Object(d.a)(this,i),e.call(this,t,n,o,s)}return Object(u.a)(i,[{key:"render",value:function(t,e){t.font=this.font,t.fillStyle=this.fS,t.fillText(this.text(),e.x+this.coords.x,e.y+this.coords.y)}}]),i}(w),k=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o){var s,h=arguments.length>3&&void 0!==arguments[3]?arguments[3]:25;return Object(d.a)(this,i),(s=e.call(this,t,n,o,h)).height=h,s.fixBoundY=4*s.height/5,s.width=s.height*s.text.length/2,s.font="".concat(s.height,"px iosevka bold"),s.boundingBox=new b(t,n-s.fixBoundY,s.width,s.height),s}return Object(u.a)(i)}(w),O=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o){var s;return Object(d.a)(this,i),(s=e.call(this,t,n,o)).state=!1,s.switchFill={off:y.grey,on:y.midblue},s.switchDiameter=s.height,s.textXOffset=1.5*s.switchDiameter,s.width=s.width+s.textXOffset,s.boundingBox=new b(t,n-s.fixBoundY,s.width,s.height),s}return Object(u.a)(i,[{key:"handleColission",value:function(){this.state=!this.state}},{key:"render",value:function(t,e){t.font=this.font,t.fillStyle=this.fS,t.strokeStyle=this.fS,t.lineWidth=3,t.fillText(this.text,e.x+this.coords.x+this.textXOffset,e.y+this.coords.y),this.state?t.fillStyle=this.switchFill.on:t.fillStyle=this.switchFill.off,t.fillRect(e.x+this.coords.x,e.y+this.coords.y-this.fixBoundY,this.switchDiameter,this.switchDiameter),t.strokeRect(e.x+this.coords.x,e.y+this.coords.y-this.fixBoundY,this.switchDiameter,this.switchDiameter)}}]),i}(w),j=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o){var s,h=arguments.length>3&&void 0!==arguments[3]?arguments[3]:28,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0;return Object(d.a)(this,i),(s=e.call(this,t,n)).width=o,s.height=h,s.func=r,s.fS=y.darkgrey,s.sS=y.darkgrey,s.lW=5,s.sliderPosition=.5,s.knobWidth=s.height/2,s.boundingBox=new b(t,n-s.lW,o+s.lW,h+s.lW),s.setSliderPos(s.sliderPosition),s}return Object(u.a)(i,[{key:"handleColission",value:function(t,e){var i=(t-this.coords.x)/this.width;console.log(i),this.setSliderPos(i)}},{key:"getSliderPos",value:function(){return this.sliderPosition}},{key:"setSliderPos",value:function(t){this.sliderPosition=t<0?0:t>1?1:t,this.func&&this.func(this.sliderPosition)}},{key:"render",value:function(t,e){t.fillStyle=this.fS,t.strokeStyle=this.sS,t.lineWidth=this.lW,t.beginPath(),t.moveTo(e.x+this.coords.x,e.y+this.coords.y+this.height/2),t.lineTo(e.x+this.coords.x+this.width,e.y+this.coords.y+this.height/2),t.stroke(),t.closePath(),t.fillRect(e.x+this.coords.x+this.sliderPosition*(this.width-this.knobWidth),e.y+this.coords.y,this.knobWidth,this.height),t.strokeStyle=y.grey,t.strokeRect(e.x+this.coords.x+this.sliderPosition*(this.width-this.knobWidth),e.y+this.coords.y,this.knobWidth,this.height)}}]),i}(m),C=m,S=i(11),E=function(){function t(e,i,n,o,s,h){Object(d.a)(this,t),this.x=e,this.y=i,this.width=n,this.height=o,this.margin=s,this.border=h,this.bhalf=this.border/2,this.components=[],this.boundingBox=new b(this.x-this.bhalf,this.y-this.bhalf,this.width+this.border,this.height+this.border)}return Object(u.a)(t,[{key:"checkBoundsCollision",value:function(t,e){var i=this.getXY();return this.boundingBox=new b(i.x-this.bhalf,i.y-this.bhalf,this.width+this.border,this.height+this.border),!!this.boundingBox.checkCollision(t,e)&&(this.components.map((function(n){n.boundingBox.checkCollision(t-i.x,e-i.y)&&n.handleColission(t-i.x,e-i.y)})),!0)}},{key:"getXY",value:function(){return{x:this.x<0?window.innerWidth+this.x:this.x,y:this.y<0?window.innerHeight+this.y:this.y}}},{key:"renderComponents",value:function(t,e){this.components.map((function(i){var n=e;i.render(t,n)}))}},{key:"render",value:function(t){t.fillStyle=S.grey,t.strokeStyle=S.darkgrey,t.lineWidth=this.border;var e=this.getXY();t.fillRect(e.x,e.y,this.width,this.height),t.strokeRect(e.x,e.y,this.width,this.height),this.renderComponents(t,e)}}]),t}(),B=i(11),F=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o,s,h){var r;return Object(d.a)(this,i),(r=e.call(this,t,n,o,s)).tool=h,r.fS=B.lightgrey,r.activeSS=B.midorange,r.lW=6,r}return Object(u.a)(i,[{key:"render",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];t.fillStyle=this.fS,t.strokeStyle=this.sS,i&&(t.strokeStyle=this.activeSS),t.lineWidth=this.lW,t.fillRect(e.x+this.coords.x,e.y+this.coords.y,this.width,this.height);var n=new Image;n.src=this.tool.icon,t.drawImage(n,e.x+this.coords.x,e.y+this.coords.y),t.strokeRect(e.x+this.coords.x,e.y+this.coords.y,this.width,this.height)}}]),i}(p),W=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t){var n;Object(d.a)(this,i);var o=60*Math.ceil(t.tools.length/2);(n=e.call(this,-150,-(70+o),120,o,16,8)).toolManager=t,n.toolWidth=36,n.componenets=[];for(var s=0;s<n.toolManager.tools.length;s++){var h=n.margin+(n.margin+n.toolWidth)*(s%2),r=n.margin+(n.margin+n.toolWidth)*Math.ceil((s+.5)/2-1);n.components.push(new F(h,r,n.toolWidth,n.toolWidth,n.toolManager.tools[s]))}return n}return Object(u.a)(i,[{key:"handleColission",value:function(t){this.toolManager.toolDeselect(),this.toolManager.activeTool=t,this.toolManager.toolSelect()}},{key:"checkBoundsCollision",value:function(t,e){var i=this,n=this.getXY();return this.boundingBox=new b(n.x-this.bhalf,n.y-this.bhalf,this.width+this.border,this.height+this.border),!!this.boundingBox.checkCollision(t,e)&&(this.components.map((function(o){o.boundingBox.checkCollision(t-n.x,e-n.y)&&i.handleColission(o.tool)})),!0)}},{key:"renderComponents",value:function(t,e){var i=this,n=e;this.components.map((function(e){var o=!1;e.tool===i.toolManager.activeTool&&(o=!0),e.render(t,n,o)}))}}]),i}(E),M=function(){function t(e,i,n,o){Object(d.a)(this,t),this.boundingBox=new b(e,i,n,o),this.xCoord=e,this.yCoord=i}return Object(u.a)(t,[{key:"moveBounds",value:function(t,e){var i=this.boundingBox.getCoords(),n=this.boundingBox.getEndCoords();this.boundingBox.setBounds(i[0]+t,i[1]+e,n[0]+t,n[1]+e)}},{key:"move",value:function(t,e){this.moveBounds(t,e),this.xCoord+=t,this.yCoord+=e}},{key:"render",value:function(){}}]),t}(),P=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o,s){var h,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"#000000",a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"#393939",c=arguments.length>6&&void 0!==arguments[6]?arguments[6]:25,l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:void 0;return Object(d.a)(this,i),h=e.call(this,t,n,Math.abs(o),Math.abs(s)),"centered"===l?(h.xOffset=-o/2,h.yOffset=-s/2):(h.xOffset=0,h.yOffset=0),h.width=o,h.height=s,h.fillColor=r,h.borderColor=a,h.borderWidth=c,h}return Object(u.a)(i,[{key:"render",value:function(t,e,i){t.fillStyle=this.fillColor,t.lineWidth=this.borderWidth*e,t.strokeStyle=this.borderColor,t.fillRect(i.w+e*(this.xCoord+this.xOffset),i.h+e*(this.yCoord+this.yOffset),e*Math.abs(this.width),e*Math.abs(this.height)),t.strokeRect(i.w+e*(this.xCoord+this.xOffset),i.h+e*(this.yCoord+this.yOffset),e*Math.abs(this.width),e*Math.abs(this.height))}}]),i}(M),N=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o){var s,h=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"#000000",r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"#393939",a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:25,c=arguments.length>6&&void 0!==arguments[6]?arguments[6]:void 0;return Object(d.a)(this,i),(s=e.call(this,t-o,n-o,2*o,2*o)).Offset="centered"===c?0:o,s.radius=o,s.fillColor=h,s.borderColor=r,s.borderWidth=a,s}return Object(u.a)(i,[{key:"render",value:function(t,e,i){t.fillStyle=this.fillColor,t.lineWidth=this.borderWidth*e,t.strokeStyle=this.borderColor,t.beginPath(),t.arc(i.w+e*(this.xCoord+this.Offset),i.h+e*(this.yCoord+this.Offset),this.radius*e,0*Math.PI,2*Math.PI),t.fill(),this.borderWidth>0&&t.stroke(),t.closePath()}}]),i}(M),D=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o,s){var h,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"#000000",a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"#393939",c=arguments.length>6&&void 0!==arguments[6]?arguments[6]:25,l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:void 0;return Object(d.a)(this,i),h=e.call(this,t,n,Math.abs(o),Math.abs(s)),"centered"===l?(h.xOffset=-o/2,h.yOffset=-s/2):(h.xOffset=0,h.yOffset=0),h.xCoord=t,h.yCoord=n,h.width=o,h.height=s,h.fillColor=r,h.borderColor=a,h.borderWidth=c,h}return Object(u.a)(i,[{key:"render",value:function(t,e,i){t.fillStyle=this.fillColor,t.lineWidth=e*this.borderWidth,t.strokeStyle=this.borderColor;var n=i.w+e*(this.xCoord+this.xOffset),o=i.h+e*(this.yCoord+this.yOffset),s=e*this.width,h=e*this.height;t.beginPath(),t.moveTo(n,o),t.lineTo(n+s,o),t.lineTo(n+s/2,o+h),t.lineTo(n,o),t.fill(),this.borderWidth>0&&t.stroke(),t.closePath()}}]),i}(M),R=M,T=i(12),z=i(13);function H(t,e){this.x=t,this.y=e}var U=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"#0D79F2";return Object(d.a)(this,i),(t=e.call(this,0,0,0,0)).points=[],t.addPoints(n),t.strokeWidth=o,t.strokeColor=s,t.addPoint=t.addPoint.bind(Object(z.a)(t)),t.addPoints=t.addPoint.bind(Object(z.a)(t)),t}return Object(u.a)(i,[{key:"addPoint",value:function(t,e){var i;this.points.push(new H(t,e)),(i=this.boundingBox).setBounds.apply(i,Object(T.a)(this.determineNewBounds()))}},{key:"addPoints",value:function(t){var e,i=this;t.forEach((function(t){i.points.push(new H(t[0],t[1]))})),(e=this.boundingBox).setBounds.apply(e,Object(T.a)(this.determineNewBounds()))}},{key:"determineNewBounds",value:function(){var t=this.points[0].x,e=this.points[0].y,i=this.points[0].x,n=this.points[0].y;return this.points.map((function(o){o.x<t&&(t=o.x),o.y<e&&(e=o.y),o.x>i&&(i=o.x),o.y>n&&(n=o.y)})),[t,e,i,n]}},{key:"move",value:function(t,e){var i;this.points.map((function(i){i.x+=t,i.y+=e})),(i=this.boundingBox).setBounds.apply(i,Object(T.a)(this.determineNewBounds()))}},{key:"pointDistance",value:function(t,e){var i=t.x-e.x,n=t.y-e.y;return Math.sqrt(Math.pow(i,2)+Math.pow(n,2))}},{key:"cleanUp",value:function(){for(var t=this.points.length,e=0,i=1;i<this.points.length;i++)this.pointDistance(this.points[i-1],this.points[i])<2.45&&i<this.points.length-5&&(e+=5,this.points.splice(i,5));console.log("[path cleanup] ".concat(e," points removed of ").concat(t))}},{key:"render",value:function(t,e,i){t.lineWidth=e*this.strokeWidth,t.strokeStyle=this.strokeColor,t.beginPath(),this.points.forEach((function(n){t.lineTo(i.w+e*n.x,i.h+e*n.y)})),t.stroke(),t.closePath()}}]),i}(R),L=i(11),Y=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n){var o,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",h=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Iosevka Bold",r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:100,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"#393939";return Object(d.a)(this,i),(o=e.call(this,t,n,0,0)).text=s,o.font=h,o.fontSize=r,o.fillStyle=a,o.setWidthHeight(),o.setBounds(t,n),o}return Object(u.a)(i,[{key:"setBounds",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.xCoord,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.yCoord;this.boundingBox.setBounds(t,e-this.height,t+this.width,e)}},{key:"move",value:function(t,e){this.xCoord+=t,this.yCoord+=e,this.setBounds(this.xCoord,this.yCoord)}},{key:"setWidthHeight",value:function(){this.width=this.text.length*this.fontSize/2,this.height=this.fontSize}},{key:"setText",value:function(t){this.text=t,this.setWidthHeight(),this.setBounds(this.xCoord,this.yCoord)}},{key:"addText",value:function(t){this.text+=t,this.setWidthHeight(),this.setBounds(this.xCoord,this.yCoord)}},{key:"removeLastChar",value:function(){this.text=this.text.slice(0,-1),this.setWidthHeight(),this.setBounds(this.xCoord,this.yCoord)}},{key:"clearText",value:function(){this.text="",this.setWidthHeight(),this.setBounds(this.xCoord,this.yCoord)}},{key:"setFont",value:function(t){this.font=t}},{key:"setFontSize",value:function(t){this.fontSize=t}},{key:"render",value:function(t,e,i){t.font="".concat(this.fontSize*e,"px ").concat(this.font),t.fillStyle=this.fillStyle,this.width=t.measureText(this.text).width/e,this.setBounds(this.xCoord,this.yCoord),t.fillText(this.text,i.w+e*this.xCoord,i.h+e*this.yCoord)}}]),i}(R),A=i(11),X=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o,s,h){var r;return Object(d.a)(this,i),(r=e.call(this,t,n,o,o)).fS=s,r.sS=A.darkgrey,r.lW=3,r.selectorComponent=h,r}return Object(u.a)(i)}(p),I=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t,n,o){var s,h=arguments.length>3&&void 0!==arguments[3]?arguments[3]:10,r=arguments.length>4?arguments[4]:void 0;Object(d.a)(this,i);var a=["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#FF8000","#FF0080","#FF8080","#80FF00","#00FF80","#80FF80","#8000FF","#0080FF","#8080FF","#FFFFFF","#BFBFBF","#808080","#404040","#000000"],c=Math.round(h/5*2),l=Math.ceil(a.length/o),u=c+o*(c+h),f=c+l*(c+h);(s=e.call(this,t,n,u,f)).margin=c,s.elementsX=o,s.elementsY=l,s.diameter=h,s.colors=a,s.activeColor=a[0],s.toolManager=r,s.boundingBox=new b(t,n,u,f),s.subComponents=[new X(s.coords.x+s.margin,s.coords.y+s.margin+s.elementsY*(c+h),2*s.diameter,s.toolManager,Object(z.a)(s))];for(var v=0;v<a.length;v++)s.subComponents.push(new X(s.coords.x+s.margin+v%s.elementsX*(c+h),s.coords.y+s.margin+Math.floor(v/s.elementsX)*(c+h),s.diameter,s.colors[v],Object(z.a)(s)));return s.setActiveColor(),s}return Object(u.a)(i,[{key:"setActiveColor",value:function(){this.subComponents[0].fS=this.activeColor,this.toolManager.strokeStyle=this.activeColor}},{key:"getActiveColor",value:function(){return this.activeColor}},{key:"handleColission",value:function(t,e){var i=this;this.subComponents.map((function(n){if(n.boundingBox.checkCollision(t,e))return i.activeColor=n.fS,i.setActiveColor(),n}))}},{key:"renderComponents",value:function(t,e){this.subComponents.map((function(i){i.render(t,e)}))}},{key:"render",value:function(t,e){this.renderComponents(t,e)}}]),i}(C),_=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(t){var n;Object(d.a)(this,i);return(n=e.call(this,-280,-230,120,160,16,8)).toolManager=t,n.components=[new k(5,20,"Tool Settings",17),new x(6,32,(function(){return"->"+n.toolManager.activeTool.name}),12)],n.toolSettings={select:{components:[],size:{height:160}},pencil:{components:[new I(4,35,5,15,n.toolManager),new w(10,176,"Line Width",13),new j(10,180,100,20,(function(t){n.toolManager.strokeWidth=40*t}))],size:{height:210}},eraser:{components:[new w(10,56,"Line Width",13),new j(10,60,100,20,(function(t){n.toolManager.strokeWidth=40*t}))],size:{height:160}},text:{components:[new w(10,56,"Font Size",13),new j(10,60,100,20,(function(t){n.toolManager.fontSize=250*t}))],size:{height:160}},shapes:{components:[],size:{height:100}}},n}return Object(u.a)(i,[{key:"checkBoundsCollision",value:function(t,e){var i=this.getXY();return this.boundingBox=new b(i.x-this.bhalf,i.y-this.bhalf,this.width+this.border,this.height+this.border),!!this.boundingBox.checkCollision(t,e)&&([].concat(Object(T.a)(this.components),Object(T.a)(this.toolSettings[this.toolManager.activeTool.name].components)).map((function(n){n.boundingBox.checkCollision(t-i.x,e-i.y)&&n.handleColission(t-i.x,e-i.y)})),!0)}},{key:"renderComponents",value:function(t,e){var i=this,n=e;[].concat(Object(T.a)(this.components),Object(T.a)(this.toolSettings[this.toolManager.activeTool.name].components)).map((function(e){var o=!1;e.tool===i.toolManager.activeTool&&(o=!0),e.render(t,n,o)}))}},{key:"render",value:function(t){this.height=this.toolSettings[this.toolManager.activeTool.name].size.height,this.y=-(70+this.height),t.fillStyle=A.grey,t.strokeStyle=A.darkgrey,t.lineWidth=this.border;var e=this.getXY();t.fillRect(e.x,e.y,this.width,this.height),t.strokeRect(e.x,e.y,this.width,this.height),this.renderComponents(t,e)}}]),i}(E),q=(new E,function(){function t(){Object(d.a)(this,t),this.selectedObject=NaN,this.moving=!1,this.lastPos={x:NaN,y:NaN},this.lastEventUp=!1,this.name="select",this.icon="assets/icons/tools/select.png"}return Object(u.a)(t,[{key:"collisionOnObjects",value:function(t,e){for(var i=e.objects.slice(0).reverse(),n=e.getArtboardMetadata().pixelRatio,o=0;o<i.length;o++){var s=i[o];if(s.boundingBox.checkCollision(t.x,t.y,n))return s}return!1}},{key:"select",value:function(t){this.selectedObject=t}},{key:"use",value:function(t,e){if(this.selectedObject&&"keydown"===t.type&&"Delete"===t.key&&(e.removeObject(this.selectedObject),this.selectedObject=NaN,this.moving=!1),!this.lastEventUp||"click"!==t.type){this.lastEventUp=!1;var i=e.localCoords(t.pageX,t.pageY,window.innerWidth,window.innerHeight);if("click"===t.type)this.selectedObject=this.collisionOnObjects(i,e);else if("mousedown"===t.type)this.selectedObject=this.collisionOnObjects(i,e),this.selectedObject&&(this.moving=!0),this.lastPos.x=i.x,this.lastPos.y=i.y;else if(this.moving&&"mousemove"===t.type){var n=i.x-this.lastPos.x,o=i.y-this.lastPos.y;this.selectedObject.move(n,o),this.lastPos.x=i.x,this.lastPos.y=i.y}else this.selectedObject&&"mouseup"===t.type&&(this.moving=!1,this.lastEventUp=!0)}}},{key:"deselect",value:function(){return this.selectedObject}},{key:"graphic",value:function(t,e){if(this.selectedObject){var i=this.selectedObject.boundingBox.coords[0],n=this.selectedObject.boundingBox.coords[1],o=this.selectedObject.boundingBox.wh[0],s=this.selectedObject.boundingBox.wh[1],h=e.pixelRatio,r=e.baseCoord;t.lineWidth=3,t.strokeStyle=L.midorange,t.strokeRect(r.w+h*(i-32),r.h+h*(n-32),h*(o+64),h*(s+64))}}}]),t}()),G=function(){function t(){Object(d.a)(this,t),this.currentPath=NaN,this.lastPath=NaN,this.eventCount=0,this.pointsToAdd=[],this.lastMoveEvent=new Date,this.toolManager=void 0,this.name="pencil",this.icon="assets/icons/tools/pencil.png"}return Object(u.a)(t,[{key:"select",value:function(t){}},{key:"use",value:function(t,e){this.eventCount+=1;var i=e.localCoords(t.pageX,t.pageY,window.innerWidth,window.innerHeight);"mousedown"===t.type?(this.inUse=!0,this.currentPath=new U([[i.x,i.y]],this.toolManager.strokeWidth,this.toolManager.strokeStyle),e.addObject(this.currentPath)):this.inUse&&"mousemove"===t.type?this.currentPath.addPoint(i.x,i.y):this.inUse&&"mouseup"===t.type&&(this.currentPath.addPoints(i.x,i.y),this.currentPath.cleanUp(),this.inUse=!1,this.lastPath=this.currentPath,this.currentPath=NaN)}},{key:"deselect",value:function(){return this.lastPath}},{key:"graphic",value:function(t,e){}}]),t}(),J=function(t){Object(v.a)(i,t);var e=Object(g.a)(i);function i(){var t;return Object(d.a)(this,i),(t=e.call(this)).toolManager=void 0,t.name="eraser",t.icon="assets/icons/tools/eraser.png",t}return Object(u.a)(i,[{key:"use",value:function(t,e){var i=e.localCoords(t.pageX,t.pageY,window.innerWidth,window.innerHeight);"mousedown"===t.type?(this.inUse=!0,this.currentPath=new U([[i.x,i.y]],this.toolManager.strokeWidth,e.getBackgroundColour()),e.addObject(this.currentPath)):this.inUse&&"mousemove"===t.type?this.currentPath.addPoint(i.x,i.y):this.inUse&&"mouseup"===t.type&&(this.currentPath.addPoints(i.x,i.y),this.inUse=!1,this.currentPath=NaN)}}]),i}(G),K=function(){function t(){Object(d.a)(this,t),this.activeObject=NaN,this.toolManager=void 0,this.name="text",this.icon="assets/icons/tools/text.png"}return Object(u.a)(t,[{key:"select",value:function(t){t instanceof Y&&(this.activeObject=t)}},{key:"use",value:function(t,e){var i=e.localCoords(t.pageX,t.pageY,window.innerWidth,window.innerHeight);"click"===t.type?this.activeObject=new Y(i.x,i.y,"",this.toolManager.font,this.toolManager.fontSize):"mousedown"===t.type?(this.activeObject=new Y(i.x,i.y,"",this.toolManager.font,this.toolManager.fontSize),e.objects.push(this.activeObject)):this.activeObject&&"keypress"===t.type?this.activeObject.addText(t.key):this.activeObject&&"keydown"===t.type&&("Escape"===t.key?this.activeObject=NaN:"Backspace"===t.key&&this.activeObject.removeLastChar()),this.activeObject&&(this.activeObject.fontSize=this.toolManager.fontSize,this.activeObject.setWidthHeight(),this.activeObject.setBounds())}},{key:"deselect",value:function(){return this.activeObject}},{key:"graphic",value:function(t,e){if(this.activeObject){var i=this.activeObject.boundingBox.coords[0],n=this.activeObject.boundingBox.coords[1],o=this.activeObject.boundingBox.wh[0],s=this.activeObject.boundingBox.wh[1],h=e.pixelRatio,r=e.baseCoord;t.lineWidth=3,t.strokeStyle=L.midorange,t.strokeRect(r.w+h*(i-32),r.h+h*(n-32),h*(o+64)+10,h*(s+64)),t.fillRect(r.w+h*(this.activeObject.xCoord+this.activeObject.width)+4,r.h+h*(this.activeObject.yCoord-this.activeObject.height),3,h*this.activeObject.height)}}}]),t}(),Q=function(){function t(){Object(d.a)(this,t),this.icon="assets/icons/tools/shapes.png",this.shapes=["circle","rectangle","triangle"],this.name="shapes",this.currentShape=void 0,this.lastShape=this.currentShape}return Object(u.a)(t,[{key:"select",value:function(){}},{key:"use",value:function(t,e){var i=e.localCoords(t.pageX,t.pageY,window.innerWidth,window.innerHeight),n=this.shapes[2];if("mousedown"===t.type)this.inUse=!0,this.x1=i.x,this.y1=i.y,"circle"===n?this.currentShape=new N(this.x1,this.y1,0):"rectangle"===n?this.currentShape=new P(this.x1,this.y1,0,0):"triangle"===n?this.currentShape=new D(this.x1,this.y1,0,0):console.log("ERROR SHAPE-SELECTION"),e.addObject(this.currentShape);else if(this.inUse&&"mousemove"===t.type)this.currentShape instanceof D?(this.currentShape.width=i.x-this.x1,this.currentShape.height=i.y-this.y1):this.currentShape instanceof N?this.currentShape.radius=Math.sqrt(Math.pow(this.x1-i.x,2)+Math.pow(this.y1-i.y,2)):this.currentShape instanceof P&&(this.currentShape.width=i.x-this.x1,this.currentShape.height=i.y-this.y1,this.currentShape.width<0&&this.currentShape.height>0?this.currentShape.xCoord=i.x:this.currentShape.width>0&&this.currentShape.height<0?this.currentShape.yCoord=i.y:this.currentShape.width<0&&this.currentShape.height<0&&(this.currentShape.xCoord=i.x,this.currentShape.yCoord=i.y));else if(this.inUse&&"mouseup"===t.type){if(this.currentShape instanceof N)var o=this.currentShape.xCoord-this.currentShape.radius,s=this.currentShape.yCoord-this.currentShape.radius,h=2*this.currentShape.radius,r=2*this.currentShape.radius;else{o=this.currentShape.xCoord,s=this.currentShape.yCoord,h=this.currentShape.width,r=this.currentShape.height;this.currentShape instanceof D&&(h<0&&r>0?o+=h:h>0&&r<0?s+=r:h<0&&r<0&&(o+=h,s+=r))}this.currentShape.boundingBox.setBounds(o,s,o+Math.abs(h),s+Math.abs(r)),this.inUse=!1,this.lastShape=this.currentShape,this.currentShape=void 0}}},{key:"deselect",value:function(){return this.lastShape}},{key:"graphic",value:function(t,e){}}]),t}(),V=new q,Z=new G,$=new J,tt=new K,et=new Q,it=function(){function t(e){Object(d.a)(this,t),this.Doc=e,this.tools=[],this.tools.push(V,Z,$,tt,et),this.toolUse=this.toolUse.bind(this),this.activeTool=this.tools[0],this.strokeWidth=10,this.strokeStyle="#111111",this.font="Iosevka bold",this.fontSize=100,this.lastObj=NaN,Z.toolManager=this,$.toolManager=this,tt.toolManager=this,this.panel=new W(this),this.settingsPanel=new _(this)}return Object(u.a)(t,[{key:"toolSelect",value:function(){this.activeTool.select(this.lastObj)}},{key:"toolUse",value:function(t){this.activeTool.use(t,this.Doc)}},{key:"toolDeselect",value:function(){this.lastObj=this.activeTool.deselect()}},{key:"toolGraphic",value:function(t,e){this.activeTool.graphic(t,e)}}]),t}(),nt=(i(48),i(11),new f(2100,2970,[],"#dddddd")),ot=new it(nt),st=(ot.toolUse,new E(20,-350,200,300,16,8));st.components=[new p(20,100,20,20),new k(20,30,"Test"),new w(20,50,"testing testing please"),new O(20,80,"testing"),new j(15,130,170)];var ht=[ot.panel,ot.settingsPanel,st];console.log(ht),nt.addObjects([new P(200,200,1200,600,"#FF0000"),new P(0,0,100,100,"#00DD00"),new P(1600,2200,400,600,"#3333FF"),new P(1e3,1e3,300,300,"#DD0066"),new N(1e3,1e3,300,"#DD00DD","#DD00DD",!1,null),new U([[0,100],[500,2970],[1e3,100]]),new Y(350,1200,"lalala","Iosevka bold"),new D(0,0,100,100,"#3333FF","#000000",0,!1)]);var rt,at,ct,lt=function(t){var e=Object(n.useRef)(null);return Object(n.useEffect)((function(){var t=e.current,i=t.getContext("2d");function n(){var t=nt.getArtboardMetadata();nt.draw(i,t),ot.toolGraphic(i,t),ht.map((function(t){t.render(i)}))}function o(){t.width=window.innerWidth,t.height=window.innerHeight,n()}function s(t){if("click"!==t.type){if(t.type,"click"===t.type||"mousedown"===t.type)for(var e=0;e<ht.length;e++){if(ht[e].checkBoundsCollision(t.pageX,t.pageY))return}ot.toolUse(t)}else t.type}var h=setInterval(n,1e3/120);return window.addEventListener("resize",o),t.addEventListener("click",s),t.addEventListener("mousedown",s),t.addEventListener("mouseup",s),t.addEventListener("mousemove",s),document.addEventListener("keypress",s),document.addEventListener("keydown",s),function(e){clearInterval(h),window.removeEventListener("resize",o),t.removeEventListener("click",s),t.removeEventListener("mousedown",s),t.removeEventListener("mouseup",s),t.removeEventListener("mousemove",s),document.addEventListener("keypress",s),document.addEventListener("keydown",s)}})),o.a.createElement("canvas",{ref:e,width:window.innerWidth,height:window.innerHeight,id:"theCanvas"}," ")},dt=i(25),ut=i(15),ft=i(16),vt=i(11),gt=ft.a.div(rt||(rt=Object(ut.a)(["\n\tposition: fixed;\n\tz-index: 1000;\n\tbackground-color: ",";\n\toutline-style: solid;\n\toutline-color: ",";\n\toutline-width: 1.2vh;\n\twidth: 70vw;\n\theigh: 50vh;\n\tmin-width: 75vw;\n    aspect-ratio: 2;\n\ttop: 50vh;\n\tleft: 50vw;\n\ttransform: translate(-50%, -50%)\n"])),vt.lightgrey,vt.darkgrey),bt=ft.a.div(at||(at=Object(ut.a)(["\n\tfont-family: Iosevka Extended Heavy;\n\tfont-size: ","vh;\n\tcolor: ",";\n\tmargin-top: 3vh\n"])),(function(t){return t.size||4.8}),vt.darkgrey),yt=ft.a.button(ct||(ct=Object(ut.a)(["\n\tposition: absolute;\n\tdisplay: block;\n\t",": 25%;\n\ttop: 80%;\n\tbackground-color: ",";\n\tcolor: ",";\n\tfont-size: 1vh;\n\tborder: 4px solid ",";\n    aspect-ratio: 2;\n\tfont-family: Iosevka bold;\n\tfont-size: calc(12px + 1.5vw);\n"])),(function(t){return t.side||"right"}),vt.grey,vt.darkgrey,vt.darkgrey);function mt(t){return o.a.createElement(yt,{side:t.side},t.redirect&&o.a.createElement(a.b,{to:t.redirect,style:{margin:"0.2vw",fontFamily:"inherit",color:"inherit"},onClick:function(){},dangerouslySetInnerHTML:{__html:t.text}}),t.func&&o.a.createElement("div",{style:{margin:"0.2vw",fontFamily:"inherit",color:"inherit"},onClick:function(){return t.func()},dangerouslySetInnerHTML:{__html:t.text}}))}var pt,wt=function(t){return"true"===t.isOpen?o.a.createElement(gt,null,o.a.createElement(bt,null," Create New Document "),o.a.createElement(mt,{text:"Create",redirect:t.redirect}),o.a.createElement(mt,{text:"Back",side:"left",func:t.func})):o.a.createElement(o.a.Fragment,null)},xt=ft.a.div(pt||(pt=Object(ut.a)(["\n    filter: blur(","px)\n"])),(function(t){return"true"===t.blur?"30":"0"}));function kt(t){return o.a.createElement("div",{className:"main-file-button",onClick:t.onClick},o.a.createElement("div",{className:"main-file-button-top"},o.a.createElement("h1",null," ",t.title," ")),o.a.createElement("div",{className:"main-file-button-bottom"},o.a.createElement("h3",null," ",t.subtitle," ")))}function Ot(t){return o.a.createElement(a.b,{to:t.link,className:"small-file-button"},o.a.createElement("div",{className:"small-file-button-top"},o.a.createElement("p",null,"||preview||")),o.a.createElement("div",{className:"small-file-button-bottom"},o.a.createElement("h3",null," ",t.title," ")))}var jt=function(t){var e=Object(n.useState)("false"),i=Object(dt.a)(e,2),s=i[0],h=i[1],r=Object(n.useState)("false"),a=Object(dt.a)(r,2),c=a[0],l=a[1];return Object(n.useEffect)((function(){"true"===s?l("true"):"false"===s&&l("false")})),o.a.createElement(o.a.Fragment,null,o.a.createElement(wt,{isOpen:s,redirect:"new",func:function(){h("false")}}),o.a.createElement(xt,{blur:c},o.a.createElement("div",{className:"home"},o.a.createElement("div",{className:"main-buttons"},o.a.createElement(kt,{title:"New Document",subtitle:"fileformat",onClick:function(){h("false"===s?"true":"false")}}),o.a.createElement(kt,{title:"Import",subtitle:"pdf png jgp flipchart",link:"doc/"})),o.a.createElement("div",{className:"small-buttons"},o.a.createElement(Ot,{title:"fiel1.???",link:"/"}),o.a.createElement(Ot,{title:"fiel1.???",link:"/"}),o.a.createElement(Ot,{title:"fiel1.???",link:"/"}),o.a.createElement(Ot,{title:"fiel1.???",link:"/"}),o.a.createElement(Ot,{title:"fiel1.???",link:"/"})))))};var Ct=function(){return o.a.createElement(a.a,null,o.a.createElement("div",{className:"App"},o.a.createElement(r.c,null,o.a.createElement(r.a,{path:"/new"},o.a.createElement(l,{side:"nav-bottom"}),o.a.createElement(lt,null)),o.a.createElement(r.a,{exact:!0,path:"/"},' // "/" path Route always last',o.a.createElement(l,{side:"nav-top"}),o.a.createElement(jt,null)),o.a.createElement(r.a,{render:function(){return o.a.createElement("h1",null," 404 Error: Page not Found ",o.a.createElement("br",null)," Go ",o.a.createElement(a.b,{to:"/"}," Home "))}}))))};h.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(Ct,null)),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.edcb2c30.chunk.js.map