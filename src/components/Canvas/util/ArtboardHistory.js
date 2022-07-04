import GLOBALS from "../../../Globals";


export default class HistoryTracker {
  constructor(artboard) {
    this.document = artboard;

    this.stages = [];
    this.redoStages = this.stages;

    this.addStage();
  }

  generateStageObject() {
    let obj = {}
    for (let prop of GLOBALS.HISTORY_PROPERTERTIES) {
      obj[prop] = this.document[prop];
    }

    obj.objects = [...this.document.objects];
    return obj
  }

  hasContentChanged(stage1, stage2) {
    for (let prop of GLOBALS.HISTORY_PROPERTERTIES) {
      if (prop !== "objects" && stage1[prop] != stage2[prop]) return true;

      // objects are changed if arrays are not the same length and not every item is in the other array
      if (prop === "objects" && !(stage1.objects.length === stage2.objects.length && stage1.objects.every((value, index) => value === stage2.objects[index]))) return true;
    }
    return false
  }

  addStage() {
    let newStage = this.generateStageObject();
    // only add stages with different content
    if (this.stages.length >= 1) console.log("changed?", this.hasContentChanged(newStage, this.stages[this.stages.length - 1]))
    if (this.stages.length < 1 || this.hasContentChanged(newStage, this.stages[this.stages.length - 1])) {
      this.stages.push(newStage);
      console.log(this.stages[this.stages.length - 1])
    }
  }

  undo() {
    this.redoStages = this.stages;

    this.stages.pop();

    this.setDocumentStage();
  }

  redo() {
    let nextStage = this.redoStages.slice(0, 1);
    this.redoStages = this.redoStages.slice(1);

    this.stages.push(nextStage)

    this.setDocumentStage()
  }

  setDocumentStage() {
    for (let prop of GLOBALS.HISTORY_PROPERTERTIES) {
      this.document[prop] = this.stages[this.stages.length - 1][prop];
    }
  }
}