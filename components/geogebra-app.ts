import {html, css, PropertyValues, PropertyDeclaration} from "lit"
import {LitElementWw} from "@webwriter/lit"
import {property} from "lit/decorators.js"
import {keyed} from "lit/directives/keyed.js"

import "@shoelace-style/shoelace/dist/themes/light.css"

// @ts-ignore
import LOCALIZE from "../localization/generated"
import {localized, msg} from "@lit/localize"
import {geogebraAppStyles} from "./geogebra-app.styles"
import { booleanAttributeConverter } from "../utils/boolean-attribute-converter"
import { GeogebraOptions, type PropertyConfig } from "./geogebra-options"

export interface GeogebraAPI {
  evalCommand(cmdString: string): boolean
  evalLaTex(input: string): boolean
  evalCommandGetLabels(cmdString: string): string
  evalCommandCAS(text: string): string
  insertEmbed(type: string, uri: string): void
  deleteObject(objName: string): void
  setAuxiliary(geo: any, status: boolean): void
  setValue(objName: string, value: number): void
  setTextValue(objName: string, value: string): void
  setListValue(objName: string, i: number, value: number): void
  setCoords(objName: string, x: number, y: number, z?: number): void
  setCaption(objName: string, caption: string): void
  setColor(objName: string, red: number, green: number, blue: number): void
  setVisible(objName: string, visible: boolean): void
  setLabelVisible(objName: string, visible: boolean): void
  setLabelStyle(objName: string, style: 0 | 1 | 2 | 3): void
  setFixed(objName: string, fixed: boolean, selectionAllowed: boolean): void
  setTrace(objName: string, flag: boolean): void
  renameObject(oldObjName: string, newObjName: string): boolean
  setLayer(objName: string, layer: number): void
  setLayerVisible(objName: string, visible: boolean): void
  setLineStyle(objName: string, style: 0 | 1 | 2 | 3 | 4): void
  setLineThickness(objName: string, thickness: -1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13): void
  setPointStyle(objName: string, size: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9): void
  setPointSize(objName: string, size:  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9): void
  setDisplayStyle(objName: string, style: string): void
  setFilling(objName: string, filling: number): void
  getPNGBase64(exportScale: number, transparent?: boolean, dpi?: number): string
  exportSVG(filename: string): void
  exportSVG(callback: CallableFunction): void
  exportPDF(scale: number, filename: string, sliderLabel?: string): void
  exportPDF(scale: number, callback: CallableFunction, sliderLabel?: string): void
  getScreenshotBase64(callback: CallableFunction): void
  writePNGtoFile(fileName: string, exportScale?: number, transparent?: boolean, dpi?: number): boolean
  isIndependent(objName: string): boolean
  isMovable(objName: string): boolean
  showAllObjects(): void
  registerEmbedResolver(type: string, callback: CallableFunction): void
  setAnimating(objName: string, animate: boolean): void
  setAnimationSpeed(objName: string, speed: number): void
  startAnimation(): void
  stopAnimation(): void
  isAnimationRunning(): boolean
  getXcoord(objName: string): number
  getYcoord(objName: string): number
  getZcoord(objName: string): number
  getValue(objName: string): number
  getListValue(objName: string, index: number): number
  getColor(objName: string): string
  getVisible(objName: string): boolean
  getValueString(objName: string, useLocalizedInput?: boolean): string
  getDefinitionString(objName: string): string
  getCommandString(objName: string, useLocalizedInput?: boolean): string
  getLaTeXString(objName: string, value: boolean): string
  getObjectType(objName: string): string
  exists(objName: string): boolean
  isDefined(objName: string): boolean
  getAllObjectNames(type?: string): string[]
  getObjectNumber(): number
  getCASObjectNumber(): number
  getObjectName(i: number): string
  getLayer(objName: string): string
  getLineStyle(objName: string): 0 | 1 | 2 | 3 | 4
  getLineThickness(objName: string): -1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
  getPointStyle(objName: string): -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  getPointSize(objName: string): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  getFilling(objName: string): number
  getCaption(objName: string, substitutePlaceholders?: boolean): string
  getLabelStyle(objName: string): 0 | 1 | 2 | 3
  getLabelVisible(): boolean
  isInteractive(objName: string): boolean
  setMode(mode: number): void
  getMode(): number
  reset(): void
  newConstruction(): void
  refreshViews(): void
  setOnTheFlyPointCreationActive(flag: boolean): void
  setPointCapture(view: -1 | 1 | 2, mode: 0 | 1 | 2 | 3): void
  setRounding(round: string): void
  hideCursorWhenDragging(flag: boolean): void
  setRepaintingActive(flag: boolean): void
  setErrorDialogsActive(flag: boolean): void
  setCoordSystem(xmin: number, xmax: number, ymin: number, ymax: number, zmin?: number, zmax?: number, yVertical?: boolean): void
  setAxesVisible(xAxis: boolean, yAxis: boolean, zAxis?: boolean): void
  setUndoPoint(): void
  setAxisLabels(viewNumber: number, xAxis: string, yAxis: string, zAxis: string): void
  setAxisSteps(viewNumber: number, xAxis: number, yAxis: number, zAxis: number): void
  setAxisUnits(viewNumber: number, xAxis: string, yAxis: string, zAxis: string): void
  setGridVisible(flag: boolean): void
  setGridVisible(viewNumber: number, flag: boolean): void
  getGridVisible(viewNumber: number): boolean
  getPerspectiveXML(): string
  undo(): void
  redo(): void
  showToolBar(show: boolean): void
  setCustomToolBar(toolbar: string): void
  addCustomTool(iconURL: string, name: string, category?: string, callback?: CallableFunction): void
  showMenuBar(show: boolean): void
  showAlgebraInput(show: boolean): void
  showResetIcon(show: boolean): void
  enableRightClick(enable: boolean): void
  enableLabelDrags(enable: boolean): void
  enableShiftDragZoom(enable: boolean): void
  enableCAS(enable: boolean): void
  enable3D(enable: boolean): void
  setPerspective(perspective: string): void
  setWidth(width: number): void
  setHeight(height: number): void
  setSize(width: number, height: number): void
  recalculateEnvironments(): void
  getEditorState(): any
  setEditorState(state: any): void
  getGraphicsOptions(viewId: number): any
  setGraphicsOptions(viewID: number, options: any): void
  setAlgebraOptions(options: any): void
  registerAddListener(func: CallableFunction): void
  unregisterAddListener(func: CallableFunction): void
  registerRemoveListener(func: CallableFunction): void
  unregisterRemoveListener(func: CallableFunction): void
  registerUpdateListener(func: CallableFunction): void
  unregisterUpdateListener(func: CallableFunction): void
  registerClickListener(func: CallableFunction): void
  unregisterClickListener(func: CallableFunction): void
  registerObjectUpdateListener(objName: string, func: CallableFunction): void
  unregisterObjectUpdateListener(objName: string): void
  registerObjectClickListener(objName: string, func: CallableFunction): void
  unregisterObjectClickListener(objName: string): void
  registerRenameListener(func: CallableFunction): void
  unregisterRenameListener(func: CallableFunction): void
  registerClearListener(func: CallableFunction): void
  unregisterClearListener(func: CallableFunction): void
  registerStoreUndoListener(func: CallableFunction): void
  unregisterStoreUndoListener(func: CallableFunction): void
  registerClientListener(func: CallableFunction): void
  unregisterClientListener(func: CallableFunction): void
  evalXML(xmlString: string): void
  setXML(xmlString: string): void
  getXML(objName?: string): string
  getAlgorithmXML(objName: string): string
  getFileJSON(): any
  setFileJSON(content: any): void
  getBase64(callback?: CallableFunction): string
  setBase64(value: string, callback?: CallableFunction): void
  debug(str: string): void
  getVersion(): string
  remove(): void
}

/**
 * @fires focus - Fired when the GeoGebra applet gains focus.
 * @fires ggb-load - Fired when the GeoGebra API is ready. The event detail contains the API instance.
 */
@localized()
export class GeogebraApp extends LitElementWw {
  protected localize = LOCALIZE

  protected static get scopedElements() {
    return {
      "geogebra-options-panel": GeogebraOptions
    }
  }

  static styles = geogebraAppStyles

  /**
   * Custom CSS styles to apply to the GeoGebra applet.
   */
  @property({type: String})
  accessor ggbStyles: string = css`
    .GeoGebraFrame .toolbar .header-open-landscape .center, .GeoGebraFrame .toolbar .header-close-landscape .center {
      top: 0 !important;
    }
  `.cssText

  /**
   * app name, default: "classic". "graphing" …​ GeoGebra Graphing Calculator "geometry" …​ GeoGebra Geometry "3d" …​ GeoGebra 3D Graphing Calculator "classic" …​ GeoGebra Classic "suite" …​ GeoGebra Calculator Suite "evaluator" …​ Equation Editor "scientific" …​Scientific Calculator "notes" …​ GeoGebra Notes
   */
  @property({type: String, attribute: true, reflect: true})
  accessor type: "classic" | "geometry" | "3d" | "suite" | "evaluator" | "scientific" | "notes" = "classic"

  /**
   * Applet width
   */
  @property({type: Number, attribute: true, reflect: true})
  accessor width: number = 800

  /**
   * Applet height
   */
  @property({type: Number, attribute: true, reflect: true})
  accessor height: number = 450

  /**
   * Source of the GeoGebra file to load (base64-encoded string, material ID prefixed with "ggbid:", or file URL)
   */
  @property({type: String, attribute: true, reflect: true})
  accessor src: string

  /**
   * Color of the border line drawn around the applet panel (as hex rgb string). Default: gray
   */
  @property({type: String, attribute: true, reflect: true})
  accessor borderColor: string = "gray"

  /**
   * Size of applet's border radius in pixels.
   */
  @property({type: Number, attribute: true, reflect: true})
  accessor borderRadius: number = 1

  /**
   * States whether right clicks should be handled by the applet. Setting this parameter to "false" disables context menus, properties dialogs and right-click-zooming. Default: true. NB also enables/disables some keyboard shortcuts eg Delete and Ctrl + R (recompute all objects). Default: true
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor enableRightClick = true

  /**
   * States whether labels can be dragged. Default: true
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor enableLabelDrags = true

  /**
   * States whether the Graphics View(s) should be moveable using Shift mouse drag (or. Ctrl + mouse drag) or zoomable using Shift + mouse wheel (or Ctrl + mouse wheel). Setting this parameter to "false" disables moving and zooming of the drawing pad. Default: true
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor enableShiftDragZoom = true

  /**
   * States whether the zoom in / zoom out / home buttons should be shown in the Graphics View or not. Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showZoomButtons = false

  /**
   * States whether error dialogs will be shown if an invalid input is entered (using the Input Bar or JavaScript) Default: true
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor errorDialogsActive = true

  /**
   * States whether the menubar of GeoGebra should be shown in the applet. Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showMenuBar = false

  /**
   * States whether the toolbar with the construction mode buttons should be shown in the applet. Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showToolBar = true

  /**
   * States whether the toolbar help text right to the toolbar buttons should be shown in the applet
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showToolBarHelp = false

  /**
   * Sets the toolbar according to a custom toolbar string where the int values are Toolbar Mode Values, `,` adds a separator within a menu, `|` starts a new menu and `||` adds a separator in the toolbar before starting a new menu. This will override the saved toolbar from the .ggb file / base64 string. Custom tools are numbered 100 001, 100 002, etc
   */
  @property({type: String, attribute: true, reflect: true})
  accessor customToolBar: string

  /**
   * States whether the algebra input line (with input field, greek letters and command list) should be shown in the applet. Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showAlgebraInput = true

  /**
   * States whether a small icon (GeoGebra ellipse) should be shown in the upper right corner of the applet. Clicking on this icon resets the applet (i.e. it reloads the file given in the filename parameter). Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showResetIcon = false

  /**
   * ISO language string. GeoGebra tries to set your local language automatically (if it is available among the supported languages, of course). The default language for unsupported languages is English. If you want to specify a certain language manually, please use this parameter.
   */
  @property({type: String, attribute: true, reflect: true})
  accessor language: String

  /**
   * ISO country string. This parameter only makes sense if you use it together with the language parameter.
   */
  @property({type: String, attribute: true, reflect: true})
  accessor country: String

  /**
   * This parameter allows you to specify the argument passed to the JavaScript function ggbOnInit(), which is called once the applet is fully initialised. This is useful when you have multiple applets on a page.
   */
  @property({type: String, attribute: true, reflect: true})
  accessor appletId: String

  /**
   * Determines whether the Style Bar can be shown (or will be shown if just Graphics View 1 is showing). Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor allowStyleBar = false

  /**
   * Determines whether random numbers should be randomized on file load. Useful when you want the app to reload in exactly the same state it was saved. Default: true
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor randomize = true

  /**
   * Specify seed for random numbers. Note that if you save a state of the app after user interacted with it and try to reload that state with the same randomSeed, you may get a different result. Use randomize for those use-cases.
   */
  @property({type: Number, attribute: true, reflect: true})
  accessor randomSeed: number

  /**
   * When true, GeoGebra: runs ggbOnInit from HTML, ignores ggbOnInit from file, and ignores JS update scripts of objects in file. When false, GeoGebra: ignores ggbOnInit from HTML (use appletOnLoad parameter of GGBApplet instead), runs ggbOnInit from file, and runs JS update scripts of objects in file. Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor useBrowserForJs = false

  /**
   * Determines whether logging is shown in the Browser's console. Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showLogging = false

  /**
   * Determines the sensitivity of object selection. The default value of 3 is usually fine to select and drag objects both with the mouse and touch. Use larger values (e.g. 4 or 5) to make it easier to select and drag objects. Default: 3
   */
  @property({type: Number, attribute: true, reflect: true})
  accessor capturingThreshold = 3

  /**
   * Determines whether file saving, file loading, sign in and Options > Save settings are enabled. This argument is ignored when menubar is not showing. Default: true
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor enableFileFeatures = true

  /**
   * Determines whether Undo and Redo icons are shown. This argument is ignored when toolbar is not showing. Default: true
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor enableUndoRedo = true

  /**
   * For values see SetPerspective_Command in the GeoGebra Manual. Just for a blank start ie shouldn't be used with material_id, filename or ggbBase64 parameters
   */
  @property({type: String, attribute: true, reflect: true})
  accessor perspective: String

  /**
   * Whether 3D should be enabled (for exam mode).
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor enable3d: boolean

  /**
   * Whether CAS should be enabled (for exam mode).
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor enableCAS: boolean

  /**
   * Determines whether input bar should be shown in algebra, on top of the applet or under the applet. When left empty (default), the position depends on file.
   */
  @property({type: String, attribute: true, reflect: true})
  accessor algebraInputPosition: "algebra" | "top" | "bottom"

  /**
   * When set to true, this prevents the applet from getting focus automatically at the start. Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor preventFocus = false

  /**
   * Name of CSS class that is used as container; applet will scale to fit into the container.
   */
  @property({type: String, attribute: true, reflect: true})
  accessor scaleContainerClass: string

  /**
   * `true` to restrict the width of the applet and compute height automatically, add autoHeight: true. `false` if you want the applet to be restricted by both width and height of the container
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor autoHeight = true

  /**
   * Determines whether automatic scaling may scale the applet up. Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor allowUpscale = false

  /**
   * Determines whether a preview image and a play button should be rendered in place of the applet. Pushing the play button initializes the applet. Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor playButton = false

  /**
   * Ratio by which the applet should be scaled (eg. 2 makes the applet 2 times bigger, including all texts and UI elements). Default: 1
   */
  @property({type: Number, attribute: true, reflect: true})
  accessor scale = 1

  /**
   * Whether animation button should be visible
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showAnimationButton = false

  /**
   * Whether fullscreen button should be visible
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showFullscreenButton = false

  /**
   * Whether suggestion buttons (special points, solve) in Algebra View should be visible
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showSuggestionButtons = false

  /**
   * Whether "Welcome" tooltip should be shown
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showStartTooltip = false

  /**
   * String composed of number of decimal places and flags — valid flags are "s" for significant digits and "r" for rational numbers. Hence "10" means 10 decimal places, "10s" stands for 10 significant digits.
   */
  @property({type: String, attribute: true, reflect: true})
  accessor rounding: string

  /**
   * Whether buttons should have shadow
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor buttonShadows = false

  /**
   * Relative radius of button's rounded border. The border radius in pixels is buttonRounding * height /2, where height is the height of the button. Default: 0.2
   */
  @property({type: Number, attribute: true, reflect: true})
  accessor buttonRounding: Number = 0.2

  /**
   * Border color of buttons on the graphics view. Default is black, if the button background is white, otherwise one shade darker than the background color
   */
  @property({type: String, attribute: true, reflect: true})
  accessor buttonBorderColor: string

  /**
   * Background color of the evaluator app
   */
  @property({type: String, attribute: true, reflect: true})
  accessor editorBackgroundColor: string

  /**
   * Foreground (text) color of the equation editor (appname = "evaluator")
   */
  @property({type: String, attribute: true, reflect: true})
  accessor editorForegroundColor: string

  /**
   * Whether editor is in text mode or not (appname = "evaluator"). Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor textmode = false

  /**
   * Whether to show keyboard when input is focused. When set to true, keyboard is always shown, for false it never appears, for auto it's shown unless closed by user. Default: true in evaluator app, auto in other apps
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showKeyboardOnFocus: boolean

  /**
   * Which keyboard is shown for equation editor (appname = "evaluator")
   */
  @property({type: String, attribute: true, reflect: true})
  accessor keyboardType: "scientific" | "normal" | "notes"

  /**
   * Whether the Graphics View and Graphics View 2 should be transparent
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor transparentGraphics = false

  /**
   * Whether running JavaScript from material files is disabled or not.
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor disabledJavaScript = false

  /**
   * When set, the keyboard should be attached to the first element in DOM that fits the selector.
   */
  @property({type: String, attribute: true, reflect: true})
  accessor detachedKeyboardParent: string

  /**
   * Used to force reset of the applet. Increment this property to reset the applet.
   */
  @property({type: Number})
  protected accessor resetKey: number = 0

  // A map of parameter names to their corresponding update functions in the GeoGebra API
  private paramUpdateMap: Map<string, (value: number | string | boolean) => void>

  private getConfigurableProperties() {
    const properties: PropertyConfig[] = []
    const ownProperties = (this.constructor as any).elementProperties as Map<string, PropertyDeclaration>

    const excludedProperties = new Set([
      "contentEditable",
      "lang",
      "src",
      "width",
      "height",
      "ggbStyles",
      "resetKey"
    ])

    ownProperties.forEach((config, propName) => {
      if (excludedProperties.has(propName)) return

      const currentValue = (this as any)[propName]
      let propConfig: PropertyConfig = {
        name: propName,
        type: "string",
        value: currentValue
      }

      if (config.type === Boolean || typeof currentValue === "boolean") {
        propConfig.type = "boolean"
      } else if (config.type === Number || typeof currentValue === "number") {
        propConfig.type = "number"
      } else if (config.type === String || typeof currentValue === "string") {
        const selectProps: Record<string, string[]> = {
          "algebraInputPosition": ["algebra", "top", "bottom"],
          "type": ["classic", "geometry", "3d", "suite", "evaluator", "scientific", "notes"],
          "keyboardType": ["scientific", "normal", "notes"]
        }

        if (selectProps[propName]) {
          propConfig.type = "select"
          propConfig.options = selectProps[propName]
        }
      }

      properties.push(propConfig)
    })

    return properties
  }

  private get ggbProperties() {
    const {appletId: id, type: appName, width, height, borderColor, borderRadius, enableRightClick, enableLabelDrags, enableShiftDragZoom, showZoomButtons, errorDialogsActive, showMenuBar, showToolBar, showToolBarHelp, customToolBar, showAlgebraInput, showResetIcon, language, country, allowStyleBar, randomize, randomSeed, useBrowserForJs, showLogging, capturingThreshold, enableFileFeatures, perspective, enable3d, enableCAS, algebraInputPosition, preventFocus, scaleContainerClass, autoHeight, allowUpscale, playButton, scale, showAnimationButton, showFullscreenButton, showSuggestionButtons, showStartTooltip, rounding, buttonShadows, buttonRounding, buttonBorderColor, editorBackgroundColor, editorForegroundColor, textmode, showKeyboardOnFocus, keyboardType, transparentGraphics, disabledJavaScript, detachedKeyboardParent} = this

    let filename: string, material_id: string, ggbBase64: string
    if(this.src && this.src.startsWith("data:")) {
      ggbBase64 = this.src.split(",").at(-1)
    }
    else if(this.src && this.src.startsWith("ggbid:")) {
      material_id = this.src.slice("ggbid:".length)
    }
    else if(this.src) {
      filename = this.src
    }

    return {id, appName, filename, material_id, ggbBase64, width, height, borderColor, borderRadius, enableRightClick, enableLabelDrags, enableShiftDragZoom, showZoomButtons, errorDialogsActive, showMenuBar, showToolBar, showToolBarHelp, customToolBar, showAlgebraInput, showResetIcon, language: language ?? this.lang, country, allowStyleBar, randomize, randomSeed, useBrowserForJs, showLogging, capturingThreshold, enableFileFeatures, perspective, enable3d, enableCAS, algebraInputPosition, preventFocus, scaleContainerClass, autoHeight, allowUpscale, playButton, scale, showAnimationButton, showFullscreenButton, showSuggestionButtons, showStartTooltip, rounding, buttonShadows, buttonRounding, buttonBorderColor, editorBackgroundColor, editorForegroundColor, textmode, showKeyboardOnFocus, keyboardType, transparentGraphics, disabledJavaScript, detachedKeyboardParent}
  }

  private updateSrc = (a) => {
    console.log("updateSrc called", a)
    if(!this.updatingGgb) {
      this.src = `data:application/vnd.geogebra.file;base64,${this.api.getBase64()}`
    }
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.apiReady = new Promise(r => {
      this.addEventListener("ggb-load", (e: any) => {
        r(e.detail.api)
        this.api = e.detail.api
        this.api.registerAddListener(this.updateSrc)
        this.api.registerClearListener(this.updateSrc)
        this.api.registerUpdateListener(this.updateSrc)
        this.api.registerRenameListener(this.updateSrc)
        this.api.registerRemoveListener(this.updateSrc)

        this.paramUpdateMap = new Map<string, (value: number | string | boolean) => void>([
          ["width", this.api.setWidth],
          ["height", this.api.setHeight],
          ["enableRightClick", this.api.enableRightClick],
          ["enableLabelDrags", this.api.enableLabelDrags],
          ["enableShiftDragZoom", this.api.enableShiftDragZoom],
          ["errorDialogsActive", this.api.setErrorDialogsActive],
          // ["showMenuBar", this.api.showMenuBar], // disabled because showMenuBar(false) does not work
          ["showToolBar", this.api.showToolBar],
          ["customToolBar", this.api.setCustomToolBar],
          ["showAlgebraInput", this.api.showAlgebraInput],
          ["showResetIcon", this.api.showResetIcon],
          ["perspective", this.api.setPerspective],
          ["enable3d", this.api.enable3D],
          ["enableCAS", this.api.enableCAS],
          ["rounding", this.api.setRounding],
        ])
      })
    })
  }

  private handlePropertyChange(e: CustomEvent) {
    const {name, value} = e.detail;
    (this as any)[name] = value
  }

  private handleFileImport(e: CustomEvent) {
    const { base64 } = e.detail
    this.src = `data:application/vnd.geogebra.file;base64,${base64}`
  }

  private updatingGgb = false

  protected updated(changed: PropertyValues): void {
    console.log("GeogebraApp updated:", changed)
    super.updated(changed)

    if(!this.api) {
      this.resetIFrame()
      return
    }
    if (this.paramUpdateMap) {
      let needFullReload = false

      changed.forEach((_, key: PropertyKey) => {
        const propName = key.toString()
        console.log(`Property changed: ${propName}`)
        if(propName === "src") {
          return
        }
        if(this.paramUpdateMap.has(propName) && this.api) {
          const updateFunc = this.paramUpdateMap.get(propName)
          if(updateFunc) {
            updateFunc.call(this.api, (this as any)[propName])
            console.log(`Updated GeoGebra property ${propName} to value ${(this as any)[propName]}`)
          }
        } else {
          console.log(`No update function found for property: ${propName}, reloading entire applet...`)
          needFullReload = true
        }
      })

      if(needFullReload) {
        this.resetIFrame()
        return
      }
    }
    

    if(!changed.has("src") || !this.api) {
      return
    }
    if(this.src && this.src.split(",").at(-1) !== this?.api?.getBase64()) {
      this.updatingGgb = true
      this?.api?.setBase64(this.src.split(",").at(-1), () => {
        this.updatingGgb = false
      })
    }
    else if(!this.src) {
      this.updatingGgb = true
      this?.api?.setBase64("", () => {
        this.updatingGgb = false
      })
    }
  }

  private apiReady: Promise<GeogebraAPI>
  private api?: GeogebraAPI

  private initializeIFrame(iframe: HTMLIFrameElement) {
    const doc = iframe.contentDocument
    const win = iframe.contentWindow
    if (doc.getElementById("ggb-element")) {
      return
    }
    doc.body.style.margin = "0"
    if(this.ggbStyles) {
      const style = doc.createElement("style")
      style.textContent = this.ggbStyles
      doc.head.append(style)
    }
    doc.body.addEventListener("focusin", () => this.dispatchEvent(new FocusEvent("focus", {bubbles: true, composed: true})))
    const ggbEl = doc.createElement("div")
    ggbEl.id = "ggb-element"
    doc.body.append(ggbEl);
    const deployScript = doc.createElement("script")
    deployScript.src = "https://www.geogebra.org/apps/deployggb.js"
    deployScript.addEventListener("load", () => {
      const createScript = doc.createElement("script")
      createScript.textContent = `
        const applet = new GGBApplet({${JSON.stringify(this.ggbProperties).slice(1, -1)}, appletOnLoad: api => document.dispatchEvent(new CustomEvent("ggb-load", {bubbles: true, composed: true, detail: {api}}))})
        applet.inject("ggb-element")
      `
      doc.addEventListener("ggb-load", (e: any) => this.dispatchEvent(new CustomEvent("ggb-load", {bubbles: true, composed: true, detail: e.detail})))
      doc.body.append(createScript)
    })
    doc.body.append(deployScript)
  }

  private resetIFrame() {
    if(!this.api) {
      return
    }

    this.api = undefined
    this.apiReady = new Promise(r => {
      this.addEventListener("ggb-load", (e: any) => {
        r(e.detail.api)
      }, {once: true})
    })

    this.resetKey++
  }

  render() {
    return html`
      ${keyed(this.resetKey, html`<iframe id="ggb" @load=${(e: Event) => this.initializeIFrame(e.target as HTMLIFrameElement)}></iframe>`)}
      <geogebra-options-panel
        part="options"
        ?visible=${this.isContentEditable}
        .properties=${this.getConfigurableProperties()}
        @property-change=${this.handlePropertyChange}
        @import-file=${this.handleFileImport}
      ></geogebra-options-panel>
    `
  }
}