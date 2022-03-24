import Toolbox from "./Panels/Toolbox";
import ToolSettingsPanel, { ColorSettingsPanel } from "./Panels/ToolSettings";

import EraserTool from "./Tools/EraserTool";
import HandTool from "./Tools/HandTool";
import PencilTool from "./Tools/PencilTool";
import SelectionTool from "./Tools/SelectionTool";
import ShapeTool from "./Tools/ShapeTool";
import TextTool from "./Tools/TextTool";

var selectionT = new SelectionTool();
var handT = new HandTool();
var pencilT = new PencilTool();
var eraserT = new EraserTool();
var textT = new TextTool();
var shapeT = new ShapeTool();

class ToolManager {
  constructor(Doc) {
    this.Doc = Doc;
    this.tools = [];
    this.tools.push(selectionT, handT, pencilT, eraserT, textT, shapeT);
    this.toolUse = this.toolUse.bind(this);
    this.activeTool = this.tools[0];
    this.strokeWidthPencil = 10;
    this.strokeWidthEraser = 10;
    this.strokeStyle = "#111111";
    this.font = "Iosevka bold";
    this.fontSize = 100;
    this.fillColorText = "#000000";

    this.lastObj = NaN;

    selectionT.toolManager = this;
    handT.toolManager = this;
    pencilT.toolManager = this;
    eraserT.toolManager = this;
    shapeT.toolManager = this;
    textT.toolManager = this;

    this.shape = "triangle";
    this.borderWidth = 25;
    this.fillColorShape = "#000000";

    this.lastObj = NaN;

    pencilT.toolManager = this;
    eraserT.toolManager = this;
    textT.toolManager = this;
    shapeT.toolManager = this;

    this.panel = new Toolbox(this);
    this.settingsPanel = new ToolSettingsPanel(this);
    this.colorpanel = new ColorSettingsPanel(this);
  }

  toolSelect() {
    if (this.activeTool === selectionT && this.lastObj) {
      this.activeTool.select(this.lastObj);
    }
  }
  toolUse(e) {
    this.activeTool.use(e, this.Doc);
  }
  toolDeselect() {
    this.lastObj = this.activeTool.deselect();
  }

  toolGraphic(context) {
    const artMeta = this.Doc.getArtboardMetadata();
    // function to display tool related graphics on redraw; i.e. selection box if selection tool is this.activeTool
    this.activeTool.graphic(context, artMeta, this.Doc);
  }
}

export default ToolManager;
export { selectionT, pencilT, eraserT, textT, shapeT };
