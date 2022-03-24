
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


export { openImageAsBase64 };