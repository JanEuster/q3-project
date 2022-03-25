import Panel from "./BasePanel";
import BoundingBox from "./../Objects/BoundingBox";
import BasePanelComponent, {
  PanelButton,
  PanelFunctionalText,
  PanelSlider,
  PanelText,
  PanelTitle,
  PanelTextSwitch,
} from "./PanelComponents";
import { selectionT, pencilT, eraserT, textT, shapeT, imageT } from "../ToolManager";
import GLOBALS from "../../../Globals";

class PanelColorButton extends PanelButton {
  constructor(x, y, w, h, color, selectorComponent) {
    super(x, y, w, h);

    this.fS = color;
    this.sS = GLOBALS.COLORS.darkgrey;
    this.lW = 3;

    this.selectorComponent = selectorComponent;
  }
}

class PanelSettingsColorButton extends PanelButton {
  constructor(x, y, w, h, color, canvas, selectorComponent) {
    super(x, y, w, h);

    this.fS = color;
    this.sS = GLOBALS.COLORS.darkgrey;
    this.lW = 3;
    this.canvas = canvas

    this.selectorComponent = selectorComponent;
  }

  handleColission() {
    //console.log(this.canvas.cp.visible)
    if (this.canvas.cp.visible) {
      return
    } else {
      let cp = this.canvas.cp.getPanel();
      this.canvas.state.Panels.push(cp);
      this.canvas.cp.visible = true;
    }
  }

}

class PanelImageButton extends PanelButton {
  constructor(x, y, d, image, func = () => { }) {
    super(x, y, d, d);

    this.diameter = d;
    this.image = image;
    this.lW = 3;

    this.func = func
  }

  render(context, panelOffset) {
    context.fillStyle = this.fS;
    context.strokeStyle = this.sS;
    context.lineWidth = this.lW;

    context.fillRect(
      panelOffset.x + this.coords.x,
      panelOffset.y + this.coords.y,
      this.width,
      this.height
    );

    let icon = new Image();
    icon.src = this.image;
    // console.log("OFFSET:", panelOffset.x + this.coords.x,
    //   panelOffset.y + this.coords.y);
    context.drawImage(
      icon,
      panelOffset.x + this.coords.x,
      panelOffset.y + this.coords.y,
      this.diameter,
      this.diameter
    );

    context.strokeRect(
      panelOffset.x + this.coords.x,
      panelOffset.y + this.coords.y,
      this.width,
      this.height
    );
    //this.boundingBox.render(context, panelOffset)
  }
  handleColission() {
    this.func()
  }
}

// TODO: fix the management of shapes and their icons (this.icon and this.activeShape)
class PanelShapeSelectorComponent extends BasePanelComponent {
  constructor(x, y, elementsX, diameter = 10, toolManager) {
    let shapes = ["circle", "rectangle", "triangle"];

    let margin = Math.round((diameter / 5) * 2);
    let elementsY = Math.ceil(shapes.length / elementsX);
    let w = margin + elementsX * (margin + diameter);
    let h = margin + elementsY * (margin + diameter);
    //console.log(x, y, w, h, margin)
    super(x, y, w, h);

    this.margin = margin;
    this.elementsX = elementsX;
    this.elementsY = elementsY;
    this.diameter = diameter;

    this.shapes = shapes;
    this.activeShape = shapes[2];

    this.icons = [];
    for (let i = 0; i < shapes.length; i++) {
      this.icons.push("assets/icons/tools/" + this.shapes[i] + ".png");
    }

    this.icon = this.icons[2]; //current icon

    this.toolManager = toolManager;

    this.boundingBox = new BoundingBox(x, y, w, h);

    this.subComponents = [
      new PanelImageButton(
        this.coords.x + this.margin + 120 / 2 - diameter * 1.5,
        this.coords.y + this.margin + this.elementsY * (margin + diameter),
        this.diameter * 2,
        this.icon
      ),
    ];
    for (let i = 0; i < shapes.length; i++) {
      this.subComponents.push(
        new PanelImageButton(
          this.coords.x +
          this.margin +
          (i % this.elementsX) * (margin + diameter),
          this.coords.y +
          this.margin +
          Math.floor(i / this.elementsX) * (margin + diameter),
          this.diameter,
          this.icons[i]
        )
      );
    }

    this.setActiveShape();
  }
  setActiveShape() {
    this.subComponents[0].image = this.icon;
    this.toolManager.shape = this.activeShape;
  }

  handleColission(x, y) {
    this.subComponents.map((comp) => {
      if (comp.boundingBox.checkCollision(x, y)) {
        this.icon = comp.image; //comp.icon
        this.activeShape = this.icon.substring(19, this.icon.length - 4); //cut string to shapename

        this.setActiveShape();
        return comp;
      }
    });
  }

  renderComponents(context, panelOffset) {
    this.subComponents.map((comp) => {
      comp.render(context, panelOffset);
    });
  }
  render(context, panelOffset) {
    this.renderComponents(context, panelOffset);
  }
}

class ColorSettingsPanel extends Panel {
  constructor(toolManager, canvas) {
    let colors = [
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#FF00FF",
      "#00FFFF",
      "#FF8000",
      "#FF0080",
      "#FF8080",
      "#80FF00",
      "#00FF80",
      "#80FF80",
      "#8000FF",
      "#0080FF",
      "#8080FF",
      "#FFFFFF",
      "#BFBFBF",
      "#808080",
      "#404040",
      "#000000",
    ];

    var elementsX = 5;
    var diameter = 15;
    var border = 8;
    var margin = Math.round((diameter / elementsX) * 2);
    var elementsY = Math.ceil(colors.length / elementsX)
    var width = margin + elementsX * (margin + diameter);
    var height = margin + elementsY * (margin + diameter);




    super(-150, -(70 + height) - 260, 120, 160, margin, border);

    this.toolManager = toolManager;
    this.components = [];
    this.canvas = canvas;
    this.visible = false;


    var activeColor = this.toolManager.strokeStyle;

    this.components.push(
      new PanelText(this.bhalf + margin + (0 % elementsX) * (margin + diameter), border + margin + this.bhalf, "Color-Selection", 13),
    );

    this.components.push(
      new PanelColorButton(
        this.bhalf + margin + (colors.length % elementsX) * (margin + diameter),
        this.bhalf + margin + Math.floor(colors.length / elementsX) * (margin + diameter) + diameter * 1.5,
        width - (this.bhalf + margin),
        diameter + 10,
        activeColor,
        this
      )
    ) //active Color


    for (let i = 0; i < colors.length; i++) {
      this.components.push(
        new PanelColorButton(
          this.bhalf + margin +
          (i % elementsX) * (margin + diameter),
          this.bhalf + margin +
          Math.floor(i / elementsX) * (margin + diameter) + diameter * 1.5,
          diameter,
          diameter,
          colors[i],
          this
        )
      );
    }

  }

  setActiveColor(c) {
    // console.log(this.canvas.state.Panels)
    // console.log(this.toolManager.activeTool)
    if (this.toolManager.activeTool === pencilT) {
      this.canvas.state.Panels[1].toolSettings["pencil"].components[0].fS = c;
      this.components[1].fS = c;
      this.toolManager.strokeStyle = c;
      //console.log(this.toolManager.strokeStyle, this.components[1].fS);
    } else if (this.toolManager.activeTool === shapeT) {
      this.canvas.state.Panels[1].toolSettings["shapes"].components[0].fS = c;
      this.components[1].fS = c;
      this.toolManager.fillColorShape = c;
    } else if (this.toolManager.activeTool === textT) {
      this.canvas.state.Panels[1].toolSettings["text"].components[0].fS = c;
      this.components[1].fS = c;
      this.toolManager.fillColorText = c;
    }

    this.vanishPanel();
  }

  vanishPanel() {
    this.canvas.state.Panels.pop(this.canvas.state.Panels.indexOf("ColorSettingsPanel"));
    this.visible = false;
    return
  }

  getPanel() { return this }

  checkBoundsCollision(x, y) {
    let panelXY = this.getXY();
    this.boundingBox = new BoundingBox(
      panelXY.x - this.bhalf,
      panelXY.y - this.bhalf,
      this.width + this.border,
      this.height + this.border
    );
    if (this.boundingBox.checkCollision(x, y)) {
      this.components.map((comp) => {
        if (comp.boundingBox.checkCollision(x - panelXY.x, y - panelXY.y))
          this.setActiveColor(comp.fS);
      });
      return true;
    }
    return false;
  }

  renderComponents(context, panelXY) {
    let panelOffset = panelXY;
    this.components.map((comp) => {
      let active = false;
      if (comp.tool === this.toolManager.activeTool) active = true;

      comp.render(context, panelOffset, active);
    });
  }
}

class ToolSettingsPanel extends Panel {
  constructor(toolManager, canvas) {
    let width = 120;
    let height = 160;
    let margin = 16;
    let border = 8;

    super(-280, -(70 + height), width, height, margin, border);
    this.toolManager = toolManager;
    this.canvas = canvas;

    this.components = [
      new PanelTitle(5, 20, "Tool Settings", 17),
      new PanelFunctionalText(
        6,
        32,
        () => {
          return "->" + this.toolManager.activeTool.name;
        },
        12
      ),
    ];
    this.toolSettings = {
      select: {
        components: [
          new PanelImageButton(10, 75, 30, process.env.PUBLIC_URL + "/assets/icons/ui/delete.svg", () => selectionT.deleteSelected()),
          new PanelImageButton(10, 40, 30, process.env.PUBLIC_URL + "/assets/icons/ui/copy.svg"),
          new PanelImageButton(45, 40, 30, process.env.PUBLIC_URL + "/assets/icons/ui/cut.svg"),
          new PanelImageButton(80, 40, 30, process.env.PUBLIC_URL + "/assets/icons/ui/paste.svg"),
        ],
        size: { height: 160 },
      },
      hand: {
        components: [
          new PanelSlider(
            10,
            40,
            100,
            20,
            (pos) => {
              console.log("pos", pos);
              this.toolManager.Doc.zoom = pos;
            },
            1,
            [0.01, 3]
          ),
        ],
        size: { height: 100 },
      },
      pencil: {
        components: [
          new PanelSettingsColorButton(10, 45, 100, 30, this.toolManager.strokeStyle, this.canvas, "pencilTool"),//new PanelColorSelectorComponent(4, 35, 5, 15, this.toolManager, this.canvas),
          new PanelText(10, 100, "Line Width", 13),
          new PanelSlider(10, 104, 100, 20, (pos) => {
            this.toolManager.strokeWidthPencil = pos * 40;
          }),
        ],
        size: { height: 160 },
      },
      eraser: {
        components: [
          new PanelText(10, 56, "Line Width", 13),
          new PanelSlider(10, 60, 100, 20, (pos) => {
            this.toolManager.strokeWidthEraser = pos * 40;
          }),
        ],
        size: { height: 160 },
      },
      text: {
        components: [
          new PanelSettingsColorButton(10, 45, 100, 30, this.toolManager.fillColorText, this.canvas, "textTool"),
          new PanelText(10, 101, "Font Size", 13),
          new PanelSlider(10, 105, 100, 20, (pos) => {
            this.toolManager.fontSize = pos * 250;
          }),
        ],
        size: { height: 160 },
      },
      shapes: {
        components: [
          new PanelSettingsColorButton(10, 45, 100, 30, this.toolManager.fillColorShape, this.canvas, "shapeTool"),
          new PanelShapeSelectorComponent(4, 80, 3, 25, this.toolManager),
          new PanelText(10, 201, "Border Width", 13),
          new PanelSlider(10, 205, 100, 20, (pos) => {
            this.toolManager.borderWidth = pos * 40;
          }),
        ],
        size: { height: 250 },
      },
      image: {
        components: [
          new PanelImageButton(10, 45, 30, "assets/icons/ui/upload.svg", imageT.loadImage),
          new PanelTextSwitch(10, 100, "aspect ratio", imageT.getMaintainAspectRatio, true)
        ],
        size: { width: 130, height: 150 },
      },
    };
  }

  checkBoundsCollision(x, y) {
    let panelXY = this.getXY();
    this.boundingBox = new BoundingBox(
      panelXY.x - this.bhalf,
      panelXY.y - this.bhalf,
      this.width + this.border,
      this.height + this.border
    );

    if (this.boundingBox.checkCollision(x, y)) {
      let components = [
        ...this.components,
        ...this.toolSettings[this.toolManager.activeTool.name].components,
      ];

      components.map((comp) => {
        if (comp.boundingBox.checkCollision(x - panelXY.x, y - panelXY.y)) {
          comp.handleColission(x - panelXY.x, y - panelXY.y);
        }
      });
      return true;
    }
    return false;
  }

  renderComponents(context, panelXY) {
    let panelOffset = panelXY; // {x: x, y: y} panel offset to

    let components = [
      ...this.components,
      ...this.toolSettings[this.toolManager.activeTool.name].components,
    ]; // list of all components
    components.map((comp) => {
      let active = false;
      if (comp.tool === this.toolManager.activeTool) active = true; // if tool is the active tool it needs to rendered distictively
      comp.render(context, panelOffset, active);
    });
  }

  render(context) {
    if (this.toolSettings[this.toolManager.activeTool.name].size.width) {
      this.width =
        this.toolSettings[this.toolManager.activeTool.name].size.width;
      this.x = -(160 + this.width);
    }
    this.height =
      this.toolSettings[this.toolManager.activeTool.name].size.height;
    this.y = -(70 + this.height);

    context.fillStyle = GLOBALS.COLORS.grey;
    context.strokeStyle = GLOBALS.COLORS.darkgrey;
    context.lineWidth = this.border;

    let panelXY = this.getXY();

    context.fillRect(panelXY.x, panelXY.y, this.width, this.height);
    context.strokeRect(panelXY.x, panelXY.y, this.width, this.height);

    this.renderComponents(context, panelXY);
  }
}

export default ToolSettingsPanel;
export { PanelShapeSelectorComponent, ColorSettingsPanel };
