import {LitElement, html, css, PropertyValues} from "lit"
import {LitElementWw, option} from "@webwriter/lit"
import {customElement, property, query, queryAsync} from "lit/decorators.js"

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

export class GeogebraApp extends LitElementWw {

  static styles = css`
    iframe {
      border: none;
      width: 100%;
      aspect-ratio: 16/9;
    }
  `

  @property({type: String})
  ggbStyles: string

  @property({reflect: true})
  type: "classic" | "geometry" | "3d" | "suite" | "evaluator" | "scientific" | "notes" = "classic"

  @property({type: Number, reflect: true})
  width: number = 800

  @property({type: Number, reflect: true})
  height: number = 450

  @property({type: String, attribute: true, reflect: true}) // base64, material ID, file url
  accessor src: string

  @property({type: String, reflect: true})
  borderColor: string = "gray"

  @property({type: Number, reflect: true})
  borderRadius: number = 1

  @property({type: Boolean, reflect: true})
  enableRightClick = true

  @property({type: Boolean, reflect: true})
  enableLabelDrags = true

  @property({type: Boolean, reflect: true})
  enableShiftDragZoom = true

  @property({type: Boolean, reflect: true})
  showZoomButtons = false

  @property({type: Boolean, reflect: true})
  errorDialogsActive = true

  @property({type: Boolean, reflect: true})
  showMenuBar = false

  @property({type: Boolean, reflect: true})
  showToolBar = false

  @property({type: Boolean, reflect: true})
  showToolBarHelp = false

  @property({type: String, reflect: true})
  customToolBar: string

  @property({type: Boolean, reflect: true})
  showAlgebraInput = true

  @property({type: Boolean, reflect: true})
  showResetIcon = false

  @property({type: String, reflect: true})
  language: String

  @property({type: String, reflect: true})
  country: String

  @property({type: String, reflect: true})
  appletId: String

  @property({type: Boolean, reflect: true})
  allowStyleBar = false

  @property({type: Boolean, reflect: true})
  randomize = true

  @property({type: Number, reflect: true})
  randomSeed: number

  @property({type: Boolean, reflect: true})
  useBrowserForJs = false

  @property({type: Boolean, reflect: true})
  showLogging = false

  @property({type: Number, reflect: true})
  capturingThreshold = 3

  @property({type: Boolean, reflect: true})
  enableFileFeatures = true

  @property({type: Boolean, reflect: true})
  enableUndoRedo = true

  @property({type: String, reflect: true})
  perspective: String

  @property({type: Boolean, reflect: true})
  enable3d: boolean

  @property({type: Boolean, reflect: true})
  enableCAS: boolean

  @property({type: String, reflect: true})
  algebraInputPosition: "algebra" | "top" | "bottom"

  @property({type: Boolean, reflect: true})
  preventFocus = false

  @property({type: String, reflect: true})
  scaleContainerClass: string

  @property({type: Boolean, reflect: true})
  autoHeight = true

  @property({type: Boolean, reflect: true})
  allowUpscale = false

  @property({type: Boolean, reflect: true})
  playButton = false

  @property({type: Number, reflect: true})
  scale = 1

  @property({type: Boolean, reflect: true})
  showAnimationButton = false

  @property({type: Boolean, reflect: true})
  showFullscreenButton = false

  @property({type: Boolean, reflect: true})
  showSuggestionButtons = false

  @property({type: Boolean, reflect: true})
  showStartTooltip = false

  @property({type: String, reflect: true})
  rounding: string

  @property({type: Boolean, reflect: true})
  buttonShadows = false

  @property({type: Number, reflect: true})
  buttonRounding: Number = 0.2

  @property({type: String, reflect: true})
  buttonBorderColor: string

  @property({type: String, reflect: true})
  editorBackgroundColor: string

  @property({type: String, reflect: true})
  editorForegroundColor: string

  @property({type: Boolean, reflect: true})
  textmode = false

  @property({type: Boolean, reflect: true})
  showKeyboardOnFocus: boolean

  @property({type: String, reflect: true})
  keyboardType: "scientific" | "normal" | "notes"

  @property({type: Boolean, reflect: true})
  transparentGraphics = false

  @property({type: Boolean, reflect: true})
  disabledJavaScript = false

  @property({type: String, reflect: true})
  detachedKeyboardParent: string

  private get ggbProperties() {
    const {appletId: id, type: appName, width, height, borderColor, borderRadius, enableLabelDrags, enableShiftDragZoom, showZoomButtons, errorDialogsActive, showMenuBar, showToolBar, showToolBarHelp, customToolBar, showAlgebraInput, showResetIcon, language, country, allowStyleBar, randomize, randomSeed, useBrowserForJs, showLogging, capturingThreshold, enableFileFeatures, perspective, enable3d, enableCAS, algebraInputPosition, preventFocus, scaleContainerClass, autoHeight, allowUpscale, playButton, scale, showAnimationButton, showFullscreenButton, showSuggestionButtons, showStartTooltip, rounding, buttonShadows, buttonRounding, buttonBorderColor, editorBackgroundColor, editorForegroundColor, textmode, showKeyboardOnFocus, keyboardType, transparentGraphics, disabledJavaScript, detachedKeyboardParent} = this

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

    return {id, appName, filename, material_id, ggbBase64, width, height, borderColor, borderRadius, enableLabelDrags, enableShiftDragZoom, showZoomButtons, errorDialogsActive, showMenuBar, showToolBar, showToolBarHelp, customToolBar, showAlgebraInput, showResetIcon, language: language ?? this.lang, country, allowStyleBar, randomize, randomSeed, useBrowserForJs, showLogging, capturingThreshold, enableFileFeatures, perspective, enable3d, enableCAS, algebraInputPosition, preventFocus, scaleContainerClass, autoHeight, allowUpscale, playButton, scale, showAnimationButton, showFullscreenButton, showSuggestionButtons, showStartTooltip, rounding, buttonShadows, buttonRounding, buttonBorderColor, editorBackgroundColor, editorForegroundColor, textmode, showKeyboardOnFocus, keyboardType, transparentGraphics, disabledJavaScript, detachedKeyboardParent}
  }

  updateSrc = () => {
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
      })
    })
  }

  updatingGgb = false

  protected updated(changed: PropertyValues): void {

    if(changed.has("src") && this.src && this.src.split(",").at(-1) !== this?.api?.getBase64()) {
      this.updatingGgb = true
      this?.api?.setBase64(this.src.split(",").at(-1), () => this.updatingGgb = false)
    }
    else if(changed.has("src") && !this.src) {
      this.updatingGgb = true
      this?.api?.setBase64("", () => this.updatingGgb = false)
    }
  }

  apiReady: Promise<GeogebraAPI>
  api?: GeogebraAPI

  initializeIFrame(e: Event) {
    const iframe = e.target as HTMLIFrameElement
    const doc = iframe.contentDocument
    const win = iframe.contentWindow
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

  render() {
    return html`
      <iframe id="ggb" @load=${this.initializeIFrame}></iframe>
    `
  }
}