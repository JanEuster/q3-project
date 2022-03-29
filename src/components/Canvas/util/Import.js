import Artboard from "../Artboard";
import ImageObj from "../Objects/Image";

function openImageAsBase64() {
  var anchor = document.createElement("input");
  anchor.type = "file";
  anchor.accept = "image/*" // accept all standard image formats [more formats separated by comma]
  anchor.click();

  return new Promise((res, rej) => {
    anchor.oninput = () => {
      let file = anchor.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        res(reader.result);
      }
      reader.readAsDataURL(file);
    };
  });

}


async function ImportToArtboard() {
  return new Promise((res, rej) => {
    openImageAsBase64().then(imgSrc => {

      let img = new Image();
      img.src = imgSrc;

      let imgObj, artboard;
      img.onload = () => {
        imgObj = new ImageObj(0, 0, img.width, img.height, imgSrc);
        artboard = new Artboard(img.width, img.height, "#FFFFFF");
        artboard.addObject(imgObj);
        res(artboard);
      }
    })
  }
  )

}

export { openImageAsBase64, ImportToArtboard };