import Toolbox from "./Panels/Toolbox";

// function object
function Tool(name) {
  this.name = name;
  this.icon = null; //TODO:NaN or null?
  this.select = NaN;
  this.use = NaN;
  this.deselect = NaN;
  this.activlyUsed = false;
}
var selectionTool = new Tool("selecton");
selectionTool.select = (e) => {};
selectionTool.use = (e) => {};
selectionTool.deselect = (e) => {};

var pencilTool = new Tool("pencil");
pencilTool.select = (e) => {};
pencilTool.use = (e) => {};
pencilTool.deselect = (e) => {};

class ToolManager {
  constructor() {
    this.tools = [selectionTool, pencilTool];
    this.activeTool = pencilTool;
    this.panel = new Toolbox();
  }
  get activeTool() {
    return this.activeTool;
  }

  toolSelect(e) {
    this.activeTool.select(e);
  }
  toolUse(e) {
    this.activeTool.use(e);
  }
  toolDeselect(e) {
    this.activeTool.deselect(e);
  }

  switchTool(toolName) {
    for (const tool in this.tools) {
      if (tool.name === toolName) {
        this.activeTool = tool;
        break;
      }
    }
    throw new ReferenceError(`Tool ${toolName} not defined`);
  }
}

export default ToolManager;
export { Tool };
