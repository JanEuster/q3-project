import xmlFormat from "xml-formatter";
import Artboard, {
  infiniteScrollArtboard,
  infiniteArtboard,
} from "./../Artboard";
import GLOBALS from "../../../Globals";

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

  // combine xml prolog and stringified xml artboard document
  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    xmlFormat(new XMLSerializer().serializeToString(doc.documentElement), {
      collapseContent: true,
      whiteSpaceAtEndOfSelfclosingTag: true,
    })
  );
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

function XMLToObjects(objectArray) {
  let objects = [];
  console.log(GLOBALS.SAVE.OBJECT_TYPES);

  objectArray.forEach((obj, i) => {
    // console.log(obj.nodeName);
    // console.log(obj.children);

    let objectType = GLOBALS.SAVE.OBJECT_TYPES[obj.nodeName];
    // initialize new class instance of this object
    let newObject = new objectType.class();

    // console.log(obj.attributes);
    objectType.attributes.forEach((attr) => {
      // console.log("attr", attr);
      // console.log(obj.attributes[attr]);
      // console.log(obj.attributes[attr].nodeValue);

      // set the object instances attribute
      // first use GLOBALS.SAVE.ATTRIBUTE_TYPES() to convert the nodeValue string to the attributes datatype
      try {
        newObject[attr] = GLOBALS.SAVE.ATTRIBUTE_TYPES[attr](
          obj.attributes[attr].nodeValue
        );
      } catch (error) {
        console.error(
          "Convert Object Attritube to correct Datatype: probablty no attribute type defined in GLOBALS"
        );
        console.error(error);
      }
    });

    if (objectType.children) {
      let childObjs = [];
      Object.values(obj.children).forEach((child) => {
        let childObj = new objectType.children.class();
        Object.values(child.attributes).forEach((childAttr) => {
          // console.log(childAttr, Object.values(child.attributes));
          childObj[childAttr.nodeName] = GLOBALS.SAVE.ATTRIBUTE_TYPES[
            childAttr.nodeName
          ](childAttr.nodeValue);
        });
        childObjs.push(childObj);
      });
      newObject[objectType.children.setFunction](childObjs);
    }

    if (objectType.text) {
      newObject.text = obj.textContent;
    }

    newObject.newBounds();
    console.log(newObject);
    objects.push(newObject);

    // let object = new OBJECT_TYPES[obj.nodeName]();
    // objects.push(new window.[obj])
    // let attr = artTag.attributes.item(i);
    // artboard[attr.nodeName] = attr.nodeValue;
  });
  return objects;
}

function XMLToArtboard(xml) {
  var artboard = new Artboard(10, 10, "#FFFFFF");
  var artTag = xml.getElementsByTagName("Artboard")[0];

  // set Artboard attributes via the attribute.item(index) .nodeName .nodeValue statements
  for (let i = 0; i < artTag.attributes.length; i++) {
    let attr = artTag.attributes.item(i);
    artboard[attr.nodeName] = attr.nodeValue;
  }

  var objectsTag = xml.getElementsByTagName("Objects")[0];
  artboard.editable = Boolean(objectsTag.attributes.editable);

  // add objects width their corresponding attributes
  // parameter is an array of all objects
  artboard.objects = XMLToObjects(Object.values(objectsTag.children));

  return artboard;
}

async function loadArtboard() {
  var anchor = document.createElement("input");
  anchor.type = "file";
  anchor.click();

  return new Promise((res, rej) => {
    let xml;
    anchor.oninput = () => {
      let file = anchor.files[0];
      file.text().then((value) => {
        xml = new DOMParser().parseFromString(value, "text/xml");
        res(XMLToArtboard(xml));
      });
    };
  });
}

export { saveArtboard, loadArtboard };
