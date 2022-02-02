import xmlFormat from "xml-formatter";
import Artboard, {
  infiniteScrollArtboard,
  infiniteArtboard,
} from "./../Artboard";

function ObjectToArray(obj) {
  let values = Object.values(obj);
  return Object.keys(obj).map((k, i) => {
    let v = values[i];
    return [k, v];
  });
}
function addObjectToXML(obj, parentObj, doc) {
  let objTag = doc.createElement(obj.constructor.name);
  let info = obj.getSaveInformation();
  if ("attributes" in info) {
    let attributes = ObjectToArray(info.attributes);
    attributes.forEach((attr) => objTag.setAttribute(...attr));
  }
  if ("children" in info) {
    info.children.forEach((childObj) => {
      addObjectToXML(childObj, objTag, doc);
    });
  }
  if ("text" in info) {
    objTag.textContent = info.text;
  }

  parentObj.appendChild(objTag);
}

function saveInXML(artboard) {
  var doc = document.implementation.createDocument("", "", null);

  var artTag = doc.createElement("Artboard");
  artTag.setAttribute(
    "name",
    artboard.name ? artboard.name : "Unnamed Document"
  );

  // Artboard Type specific properties
  if (artboard instanceof Artboard) {
    artTag.setAttribute("type", "regular");
    artTag.setAttribute("width", artboard.width);
    artTag.setAttribute("height", artboard.height);
  } else if (artboard instanceof infiniteScrollArtboard) {
    artTag.setAttribute("type", "infinite-scroll");
    artTag.setAttribute("width", artboard.width);
  } else if (artboard instanceof infiniteArtboard) {
    artTag.setAttribute("type", "infinite");
    artTag.setAttribute("width", artboard.width);
  }
  artTag.setAttribute("background-color", artboard.bgColor);

  var objectsTag = doc.createElement("Objects");
  objectsTag.setAttribute("editable", artboard.editable);

  artboard.objects.forEach((obj) => {
    addObjectToXML(obj, objectsTag, doc);
  });
  artTag.appendChild(objectsTag);

  doc.appendChild(artTag);

  return xmlFormat(new XMLSerializer().serializeToString(doc.documentElement));
}

function saveArtboard(artboard) {
  // let input = document.getElementById("nav-doc-options-file-input");
  // input.onclick = () => console.log("click");
  // input.click();
  var file = new Blob([saveInXML(artboard)], { type: "xml" });

  var anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(file);
  anchor.download = "abc.board";
  anchor.click();
}

export { saveArtboard };
