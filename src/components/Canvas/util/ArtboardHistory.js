import GLOBALS from "../../../Globals";
import { copyOfObject, isDifferentObject } from "../Objects/BasicShapes";


export default class HistoryTracker {
  constructor(artboard) {
    this.document = artboard;

    this.stages = [];
    this.redoStages = [];

    this.addStageForce();
  }

  generateStage() {
    let stage = {}
    for (let prop of GLOBALS.HISTORY_PROPERTERTIES) {
      stage[prop] = this.document[prop];
    }
    let artObjs = [];
    this.document.objects.forEach((obj) => {
      artObjs.push(copyOfObject(obj));
    })
    stage.objects = artObjs;
    return stage;
  }

  copyOfStage(stage) {
    let stageCopy = {};
    for (let prop of GLOBALS.HISTORY_PROPERTERTIES) {
      stageCopy[prop] = stage[prop];
    }
    let artObjs = [];
    stage.objects.forEach((obj) => {
      artObjs.push(copyOfObject(obj));
    })
    stage.objects = artObjs;
    return stageCopy;
  }

  hasContentChanged(stage1, stage2) {
    for (let prop of GLOBALS.HISTORY_PROPERTERTIES) {
      if (prop !== "objects" && stage1[prop] !== stage2[prop]) return true;
    }

    // objects are changed if arrays are not the same length and not every item is in the other array
    // console.log(stage1)
    // console.log(stage2)
    if (stage1.objects.length !== stage2.objects.length) {
      return true;
    }
    // objects also changed if properties of a object changed
    else {
      for (let i = 0; i < stage1.objects.length; i++) {
        let obj1 = stage1.objects[i];
        let obj2 = stage2.objects[i];
        if (isDifferentObject(obj1, obj2)) {
          return true
        };
      }
    }
    return false;
  }

  addStage() {
    console.log("current", this.stages[this.stages.length - 1].objects.length);
    let newStage = this.generateStage();
    // only add stages with different content
    console.log("new", newStage.objects.length);
    console.log("stages", this.stages);
    console.log("redos", this.redoStages);
    console.log(this.stages.length ? this.hasContentChanged(newStage, this.stages[this.stages.length - 1]) : "");
    if (this.stages.length < 1 || this.hasContentChanged(newStage, this.stages[this.stages.length - 1])) {
      console.log("[HISTORY] STAGE ADDED");
      this.stages.push(newStage);
      console.log("stages", this.stages)
      console.log("redos", this.redoStages);
    }

    this.resetRedo();
  }

  // adds new stage even if nothing might have changed
  // basically just a bad way to avoid having to compare artboard objects in addStage method for now
  addStageForce() {
    let newStage = this.generateStage();
    this.stages.push(newStage);

    this.resetRedo();
  }

  undo() {
    if (this.stages.length > 1) {
      this.redoStages.push(this.copyOfStage(this.stages[this.stages.length - 1]));
      this.stages = this.stages.slice(0, -1);

      console.log("stages", this.stages)
      console.log("redos", this.redoStages);

      this.setDocumentStage();
    }

    this.document.toolManager.deselectAllObjects();
  }

  redo() {
    if (this.redoStages.length >= 1) {
      let nextStage = this.redoStages.slice(this.redoStages.length - 1);
      this.redoStages = this.redoStages.slice(0, this.redoStages.length - 1);

      this.stages.push(...nextStage);
      console.log("stages", this.stages)
      console.log("redos", this.redoStages);

      this.setDocumentStage();
    }

    this.document.toolManager.deselectAllObjects();
  }

  resetRedo() {
    // whenever a new object is added to the artboard, the redo history is erased (alternate history)
    this.redoStages = [];
  }

  setDocumentStage() {
    for (let prop of GLOBALS.HISTORY_PROPERTERTIES) {
      this.document[prop] = this.stages[this.stages.length - 1][prop];
    }

    this.document.objects = this.stages[this.stages.length - 1].objects.map((obj) =>
      copyOfObject(obj)
    );
  }
}