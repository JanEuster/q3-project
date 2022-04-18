// clipboard for artboard objects across all open documents

class Clipboard {
  constructor() {
    this.content = [];
  }

  copy(content) {
    this.content = content.map((obj, i) => {
      return this.copyOfObject(obj);
    })
  }

  paste() {
    return this.content;
  }

  clear() {
    this.content = [];
  }


  copyOfObject(obj) {
    let newObj = new obj.constructor()
    Object.keys(obj).forEach((attr, i) => {
      newObj[attr] = obj[attr];
    })
    newObj.newBounds();
    return newObj
  }
}

export default Clipboard;