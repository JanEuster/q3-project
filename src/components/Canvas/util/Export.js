import { infiniteArtboard, infiniteScrollArtboard } from "../Artboard";

const EDGE_BUFFER_WIDTH = 10 // buffer for infinite artboards from furtherst objects

async function exportAsImage(artboard) {
  var imgCanvas = document.createElement("canvas");
  var imgContext = imgCanvas.getContext("2d");

  // Make sure canvas is as big as the picture

  var offset = {
    x: 0,
    y: 0,
    w: artboard.width,
    h: artboard.height,
  }

  if (artboard instanceof infiniteArtboard) {
    var xLow = artboard.objects[0].xCoord;
    var xHigh = artboard.objects[0].xCoord;
    artboard.objects.forEach(obj => {
      if (obj.boundingBox.coords[0] < xLow) xLow = obj.boundingBox.coords[0]
      if (obj.boundingBox.endCoords[0] > xHigh) xHigh = obj.boundingBox.endCoords[0]
    })
    offset.x = -xLow + EDGE_BUFFER_WIDTH;
    offset.w = xHigh - xLow + 2 * EDGE_BUFFER_WIDTH;
  }
  if (artboard instanceof infiniteArtboard || artboard instanceof infiniteScrollArtboard) {
    var yLow = artboard.objects[0].yCoord;
    var yHigh = artboard.objects[0].yCoord;
    artboard.objects.forEach(obj => {
      if (obj.boundingBox.coords[1] < yLow) yLow = obj.boundingBox.coords[1]
      if (obj.boundingBox.endCoords[1] > yHigh) yHigh = obj.boundingBox.endCoords[1]
    })
    offset.y = -yLow + EDGE_BUFFER_WIDTH;
    offset.h = yHigh - yLow + 2 * EDGE_BUFFER_WIDTH;
    console.log(yLow, yHigh)
  }
  console.log(offset)
  imgCanvas.width = offset.w;
  imgCanvas.height = offset.h;


  // Draw image into canvas element
  artboard.drawExport(imgContext, offset);

  var anchor = document.createElement("a");
  return new Promise(() => {
    imgCanvas.toBlob((blob) => {
      anchor.href = window.URL.createObjectURL(blob, { type: "image/png" });
      anchor.download = artboard.name ?? "untitled";
      anchor.type = "image/png";
      anchor.click();
    })
  })

}


export default exportAsImage;