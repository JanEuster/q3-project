import Panel from "./BasePanel";
import BoundingBox from "./../Objects/BoundingBox";
import BasePanelComponent, {
  PanelButton,
  PanelFunctionalText,
  PanelSlider,
  PanelText,
  PanelTitle,
} from "./PanelComponents";
import { selectionT, pencilT, eraserT, textT } from "../Tools";
import GLOBALS from "../../../Globals";

class PanelColorButton extends PanelButton {
  constructor(x, y, d, color, selectorComponent) {
    super(x, y, d, d);

    this.fS = color;
    this.sS = GLOBALS.COLORS.darkgrey;
    this.lW = 3;

    this.selectorComponent = selectorComponent;
  }
}

class PanelColorSelectorComponent extends BasePanelComponent {
  constructor(x, y, elementsX, diameter = 10, toolManager) {
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

    let margin = Math.round((diameter / 5) * 2);
    let elementsY = Math.ceil(colors.length / elementsX);
    let w = margin + elementsX * (margin + diameter);
    let h = margin + elementsY * (margin + diameter);
    super(x, y, w, h);

    this.margin = margin;
    this.elementsX = elementsX;
    this.elementsY = elementsY;
    this.diameter = diameter;

    this.colors = colors;
    this.activeColor = colors[0];

    this.toolManager = toolManager;

    this.boundingBox = new BoundingBox(x, y, w, h);

    this.subComponents = [
      new PanelColorButton(
        this.coords.x + this.margin,
        this.coords.y + this.margin + this.elementsY * (margin + diameter),
        this.diameter * 2,
        this.toolManager,
        this
      ),
    ];
    for (let i = 0; i < colors.length; i++) {
      this.subComponents.push(
        new PanelColorButton(
          this.coords.x +
            this.margin +
            (i % this.elementsX) * (margin + diameter),
          this.coords.y +
            this.margin +
            Math.floor(i / this.elementsX) * (margin + diameter),
          this.diameter,
          this.colors[i],
          this
        )
      );
    }

    this.setActiveColor();
  }

  setActiveColor() {
    this.subComponents[0].fS = this.activeColor;
    this.toolManager.strokeStyle = this.activeColor;
  }
  getActiveColor() {
    return this.activeColor;
  }

  handleColission(x, y) {
    this.subComponents.map((comp) => {
      if (comp.boundingBox.checkCollision(x, y)) {
        this.activeColor = comp.fS;

        this.setActiveColor();
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

class PanelShapeButton extends PanelButton {
  constructor(x, y, d, shape) {
    super(x, y, d, d);
    console.log(x, y, d, shape);

    this.diameter = d;
    this.shape = shape;
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
    icon.src = this.shape;
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
}

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
      new PanelShapeButton(
        this.coords.x + this.margin,
        this.coords.y + this.margin + this.elementsY * (margin + diameter),
        this.diameter * 2,
        this.icon
      ),
    ];
    for (let i = 0; i < shapes.length; i++) {
      this.subComponents.push(
        new PanelShapeButton(
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
    this.subComponents[0].shape = this.icon;
    this.toolManager.shape = this.activeShape;
  }

  handleColission(x, y) {
    this.subComponents.map((comp) => {
      if (comp.boundingBox.checkCollision(x, y)) {
        console.log(comp, this.activeShape);
        this.icon = comp.shape; //comp.icon
        this.activeShape = this.icon.substring(19, this.icon.length - 4); //cut string to shapename
        console.log(this.activeShape);

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

class ToolSettingsPanel extends Panel {
  constructor(toolManager) {
    let width = 120;
    let height = 160;
    let margin = 16;
    let border = 8;

    super(-280, -(70 + height), width, height, margin, border);
    this.toolManager = toolManager;

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
        components: [],
        size: { height: 160 },
      },
      pencil: {
        components: [
          new PanelColorSelectorComponent(4, 35, 5, 15, this.toolManager),
          new PanelText(10, 176, "Line Width", 13),
          new PanelSlider(10, 180, 100, 20, (pos) => {
            this.toolManager.strokeWidthPencil = pos * 40;
          }),
        ],
        size: { height: 210 },
      },
      pencil: {
        components: [
          new PanelColorSelectorComponent(4, 35, 5, 15, this.toolManager),
          new PanelText(10, 176, "Line Width", 13),
          new PanelSlider(10, 180, 100, 20, (pos) => {
            this.toolManager.strokeWidth = pos * 40;
          }),
        ],
        size: { height: 210 },
      },
      eraser: {
        components: [
          new PanelText(10, 56, "Line Width", 13),
          new PanelSlider(10, 60, 100, 20, (pos) => {
            this.toolManager.strokeWidth = pos * 40;
          }),
        ],
        size: { height: 160 },
      },
      text: {
        components: [
          new PanelText(10, 56, "Font Size", 13),
          new PanelSlider(10, 60, 100, 20, (pos) => {
            this.toolManager.fontSize = pos * 250;
          }),
        ],
        size: { height: 160 },
      },
      shapes: {
        components: [
          new PanelShapeSelectorComponent(4, 35, 3, 25, this.toolManager),
          new PanelText(10, 156, "Border Width", 13),
          new PanelSlider(10, 160, 100, 20, (pos) => {
            this.toolManager.borderWidth = pos * 40;
          }),
        ],
        size: { height: 210 },
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
export { PanelShapeSelectorComponent };
