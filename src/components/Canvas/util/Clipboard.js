// clipboard for artboard objects across all open documents
import { copyOfObject } from "../Objects/BasicShapes";

class Clipboard {
  constructor() {
    this.content = [];
  }

  copy(content) {
    this.content = content.map((obj, i) => {
      return copyOfObject(obj);
    })
  }

  paste() {
    return this.content;
  }

  clear() {
    this.content = [];
  }
}

export default Clipboard;