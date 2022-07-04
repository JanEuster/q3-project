import GLOBALS from "../../../Globals";


export default class HistoryTracker {
  constructor(artboard) {
    this.document = artboard;

    this.stages = [];
    this.redoStages = [];

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
    }

    this.resetRedo();
  }

  // adds new stage even if nothing might have changed
  // basically just a bad way to avoid having to compare artboard objects in addStage method for now
  addStageForce() {
    let newStage = this.generateStageObject();
    this.stages.push(newStage);

    this.resetRedo();
  }

  undo() {
    if (this.stages.length >= 1) {
      let undo = this.stages.pop();
      this.redoStages.push(undo);

      console.log(this.redoStages);
      this.setDocumentStage();
    }
  }

  redo() {
    if (this.redoStages.length >= 1) {
      let nextStage = this.redoStages.slice(this.redoStages.length - 1);
      this.redoStages = this.redoStages.slice(0, this.redoStages.length - 1);

      console.log(this.redoStages);
      this.stages.push(...nextStage);

      this.setDocumentStage();
    }
  }

  resetRedo() {
    // whenever a new object is added to the artboard, the redo history is erased (alternate history)
    this.redoStages = [];
  }

  setDocumentStage() {
    for (let prop of GLOBALS.HISTORY_PROPERTERTIES) {
      this.document[prop] = this.stages[this.stages.length - 1][prop];
    }

    this.document.objects = this.stages[this.stages.length - 1].objects;
  }
}