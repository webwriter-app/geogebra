import { LitElementWw } from "@webwriter/lit"
import { localizer } from "@webwriter/lit/localize"
import { jsonData } from "@webwriter/lit/data"
import type { MsgFn } from "@lit/localize"
import { sourceLocale, targetLocales } from "../../localization/generated/locale-codes"
import {html, css, type PropertyValues} from "lit"
import {property, state} from "lit/decorators.js"
import {keyed} from "lit/directives/keyed.js"

import {geogebraAppStyles} from "./geogebra-app.styles"
import { booleanAttributeConverter } from "../model/boolean-attribute-converter"
import type { GeogebraAPI } from "../model/geogebra-api"
import { geogebraOptions } from "../model/geogebra-options"
import { appletParameters, passThroughParameters, passThroughParametersAfterLocale } from "../model/geogebra-parameters"
import { base64ToBytes, bytesToBase64, dataUrlPayload, ggbDataUrl, GGB_MEDIA_TYPE, isGgbArchive } from "../model/ggb-file"

const appletSettings = new Set<PropertyKey>([
  ...passThroughParameters,
  ...passThroughParametersAfterLocale,
  "appletId", "type", "lang", "language", "country", "ggbStyles",
])

export type { GeogebraAPI }

declare global {
  interface HTMLElementEventMap {
    "ggb-load": CustomEvent<{api: GeogebraAPI}>
  }
}

/**
 * The applet runs in an iframe and handles keyboard, pointer and touch input itself. The widget resizes it with its container (300 to 2100 px):
 * the applet fills the iframe (16:9, at least 18rem high), so `width` and `height` only set its size before the first resize.
 *
 * Theme: the host takes `--ww-text-color` and `--ww-font-family`; the focus ring uses `--ww-link-color`. The applet's own content is not themed.
 *
 * Conversions: a `.ggb` file replaces the construction (import) and the current construction downloads as `.ggb` (export).
 * `image/png` and `image/svg+xml` export the picture of the graphics view; both need the loaded applet and are lossy
 * (no construction steps, no algebra view). A file that is no zip archive is refused before the widget changes.
 *
 * @part applet - The iframe that holds the GeoGebra applet.
 * @fires focus - Fired when the GeoGebra applet gains focus.
 * @fires ggb-load - Fired when the GeoGebra API is ready. The event detail contains the API instance.
 */
export class GeogebraApp extends LitElementWw {
  static styles = geogebraAppStyles

  static options = geogebraOptions

  static actions = {
    importConstruction: {
      label: (widget: {msg: MsgFn}) => ({_: widget.msg("Import construction")}),
      input: {type: "file" as const, accept: ".ggb", multiple: false},
    },
  }

  static convertFrom = {".ggb": "importGgb"}

  static convertTo = {".ggb": "exportGgb", "image/png": "exportPng", "image/svg+xml": "exportSvg"}

  // The labels of the options are computed with msg, so the editor reads them again after a language change.
  protected readonly localize = localizer(this, {
    sourceLocale,
    targetLocales,
    load: (locale) => import(`../../localization/generated/${locale}.ts`),
    drawer: true,
  })

  readonly msg: MsgFn = this.localize.msg

  // The embedded construction is the "src" key of the JSON data block.
  #data = jsonData<{src?: string}>(this, {
    defaults: {},
    changed: ({src}) => {
      if (typeof src === "string" && src.startsWith("data:")) this.src = src
    },
  })

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
  @property({type: String, attribute: true, reflect: true, converter: {
    fromAttribute: (value: string | null) => value,
    toAttribute: (value: string | null) => value?.startsWith("data:") ? null : value,
  }})
  accessor src: string | undefined

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
  accessor customToolBar: string | undefined

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
  accessor language: string | undefined

  /**
   * ISO country string. This parameter only makes sense if you use it together with the language parameter.
   */
  @property({type: String, attribute: true, reflect: true})
  accessor country: string | undefined

  /**
   * This parameter allows you to specify the argument passed to the JavaScript function ggbOnInit(), which is called once the applet is fully initialised. This is useful when you have multiple applets on a page.
   */
  @property({type: String, attribute: true, reflect: true})
  accessor appletId: string | undefined

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
  accessor randomSeed: number | undefined

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
  accessor perspective: string | undefined

  /**
   * Whether 3D should be enabled (for exam mode).
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor enable3d: boolean | undefined

  /**
   * Whether CAS should be enabled (for exam mode).
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor enableCAS: boolean | undefined

  /**
   * Determines whether input bar should be shown in algebra, on top of the applet or under the applet. When left empty (default), the position depends on file.
   */
  @property({type: String, attribute: true, reflect: true})
  accessor algebraInputPosition: "algebra" | "top" | "bottom" | undefined

  /**
   * When set to true, this prevents the applet from getting focus automatically at the start. Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor preventFocus = false

  /**
   * Name of CSS class that is used as container; applet will scale to fit into the container.
   */
  @property({type: String, attribute: true, reflect: true})
  accessor scaleContainerClass: string | undefined

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
  accessor rounding: string | undefined

  /**
   * Whether buttons should have shadow
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor buttonShadows = false

  /**
   * Relative radius of button's rounded border. The border radius in pixels is buttonRounding * height /2, where height is the height of the button. Default: 0.2
   */
  @property({type: Number, attribute: true, reflect: true})
  accessor buttonRounding = 0.2

  /**
   * Border color of buttons on the graphics view. Default is black, if the button background is white, otherwise one shade darker than the background color
   */
  @property({type: String, attribute: true, reflect: true})
  accessor buttonBorderColor: string | undefined

  /**
   * Background color of the evaluator app
   */
  @property({type: String, attribute: true, reflect: true})
  accessor editorBackgroundColor: string | undefined

  /**
   * Foreground (text) color of the equation editor (appname = "evaluator")
   */
  @property({type: String, attribute: true, reflect: true})
  accessor editorForegroundColor: string | undefined

  /**
   * Whether editor is in text mode or not (appname = "evaluator"). Default: false
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor textmode = false

  /**
   * Whether to show keyboard when input is focused. When set to true, keyboard is always shown, for false it never appears, for auto it's shown unless closed by user. Default: true in evaluator app, auto in other apps
   */
  @property({type: Boolean, attribute: true, reflect: true, converter: booleanAttributeConverter})
  accessor showKeyboardOnFocus: boolean | undefined

  /**
   * Which keyboard is shown for equation editor (appname = "evaluator")
   */
  @property({type: String, attribute: true, reflect: true})
  accessor keyboardType: "scientific" | "normal" | "notes" | undefined

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
  accessor detachedKeyboardParent: string | undefined

  /**
   * Used to force reset of the applet. Increment this property to reset the applet.
   */
  @property({type: Number})
  protected accessor resetKey: number = 0

  // A map of parameter names to their corresponding update functions in the GeoGebra API
  private paramUpdateMap?: Map<string, (value: never) => void>

  private api?: GeogebraAPI
  private listeners?: AbortController
  private srcFrame = 0
  @state()
  private accessor ready = false

  private resizer?: ResizeObserver
  private resizeFrame = 0
  private updatingGgb = false

  private get ggbProperties() {
    return appletParameters(this, this.lang, sourceLocale)
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.listeners = new AbortController()
    this.addEventListener("ggb-load", (e) => {
      const api = e.detail.api
      this.api = api
      this.ready = true
      this.observeSize()
      api.registerAddListener(this.updateSrc)
      api.registerClearListener(this.updateSrc)
      api.registerUpdateListener(this.updateSrc)
      api.registerRenameListener(this.updateSrc)
      api.registerRemoveListener(this.updateSrc)

      // showMenuBar is not updated live, because showMenuBar(false) does not work.
      this.paramUpdateMap = new Map<string, (value: never) => void>([
        ["width", api.setWidth],
        ["height", api.setHeight],
        ["enableRightClick", api.enableRightClick],
        ["enableLabelDrags", api.enableLabelDrags],
        ["enableShiftDragZoom", api.enableShiftDragZoom],
        ["errorDialogsActive", api.setErrorDialogsActive],
        ["showToolBar", api.showToolBar],
        ["customToolBar", api.setCustomToolBar],
        ["showAlgebraInput", api.showAlgebraInput],
        ["showResetIcon", api.showResetIcon],
        ["perspective", api.setPerspective],
        ["enable3d", api.enable3D],
        ["enableCAS", api.enableCAS],
        ["rounding", api.setRounding],
      ])
    }, {signal: this.listeners.signal})
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.listeners?.abort()
    this.resizer?.disconnect()
    this.resizer = undefined
    cancelAnimationFrame(this.resizeFrame)
    this.resizeFrame = 0
    this.ready = false
    if (this.srcFrame) {
      cancelAnimationFrame(this.srcFrame)
      this.writeSrc()
    }
    this.api = undefined
  }

  protected updated(changed: PropertyValues<this>): void {
    super.updated(changed)

    if (changed.has("src")) this.#data.set({src: this.src?.startsWith("data:") ? this.src : undefined})

    const api = this.api
    if(!api) {
      this.resetIFrame()
      return
    }
    if (this.paramUpdateMap) {
      let needFullReload = false

      changed.forEach((_, key) => {
        // Saving a construction changes WebWriter's reactive data property. Only applet
        // settings can require reinitialization. Construction changes are handled below.
        if (!appletSettings.has(key)) return
        const updateFunc = this.paramUpdateMap?.get(key.toString())
        if(updateFunc) {
          updateFunc.call(api, this[key as keyof this] as never)
        } else {
          needFullReload = true
        }
      })

      if(needFullReload) {
        this.resetIFrame()
        return
      }
    }

    if(!changed.has("src")) {
      return
    }
    const base64 = this.src?.split(",").at(-1)
    if(this.src && base64 !== api.getBase64()) {
      this.updatingGgb = true
      api.setBase64(base64 ?? "", () => {
        this.updatingGgb = false
      })
    }
    else if(!this.src) {
      this.updatingGgb = true
      api.setBase64("", () => {
        this.updatingGgb = false
      })
    }
  }

  async importConstruction(files: File[]) {
    const file = files[0]
    if (!file || !this.isConnected) return
    this.src = ggbDataUrl(bytesToBase64(new Uint8Array(await file.arrayBuffer())))
  }

  async importGgb(file: File) {
    const bytes = new Uint8Array(await file.arrayBuffer())
    if (!isGgbArchive(bytes)) throw new Error(this.msg("The file is not a GeoGebra construction (.ggb)."))
    const src = ggbDataUrl(bytesToBase64(bytes))
    return () => { this.src = src }
  }

  exportGgb() {
    const base64 = this.api?.getBase64() || dataUrlPayload(this.src)
    if (!base64) return null
    return new File([base64ToBytes(base64) as BlobPart], "construction.ggb", {type: GGB_MEDIA_TYPE})
  }

  exportPng() {
    const base64 = this.api?.getPNGBase64(1, false, 72)
    if (!base64) return null
    return new File([base64ToBytes(base64) as BlobPart], "construction.png", {type: "image/png"})
  }

  exportSvg() {
    const api = this.api
    if (!api) return null
    return new Promise<File | null>(resolve => {
      const timeout = setTimeout(() => resolve(null), 8000)
      api.exportSVG((svg: string) => {
        clearTimeout(timeout)
        resolve(svg ? new File([svg], "construction.svg", {type: "image/svg+xml"}) : null)
      })
    })
  }

  // Serializing the construction is costly and the applet reports every change of a drag, so it runs once per frame.
  private updateSrc = () => {
    if (this.updatingGgb || !this.api || this.srcFrame) return
    this.srcFrame = requestAnimationFrame(this.writeSrc)
  }

  private writeSrc = () => {
    this.srcFrame = 0
    if(!this.updatingGgb && this.api) {
      this.src = `data:application/vnd.geogebra.file;base64,${this.api.getBase64()}`
    }
  }

  private initializeIFrame(iframe: HTMLIFrameElement) {
    const doc = iframe.contentDocument
    if (!doc || doc.getElementById("ggb-element")) {
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
      doc.addEventListener("ggb-load", (e) => this.dispatchEvent(new CustomEvent("ggb-load", {bubbles: true, composed: true, detail: (e as CustomEvent<{api: GeogebraAPI}>).detail})))
      doc.body.append(createScript)
    })
    doc.body.append(deployScript)
  }

  // The applet follows the size of the iframe, which follows the container; one resize per frame avoids loops.
  private observeSize() {
    const iframe = this.renderRoot.querySelector("iframe")
    if (!iframe) return
    this.resizer?.disconnect()
    let last = ""
    this.resizer = new ResizeObserver(() => {
      cancelAnimationFrame(this.resizeFrame)
      this.resizeFrame = requestAnimationFrame(() => {
        const {width, height} = iframe.getBoundingClientRect()
        const size = `${Math.round(width)}x${Math.round(height)}`
        if (!this.api || !iframe.isConnected || width < 1 || size === last) return
        last = size
        this.api.setSize(Math.round(width), Math.round(height))
      })
    })
    this.resizer.observe(iframe)
  }

  focus(options?: FocusOptions) {
    this.renderRoot.querySelector("iframe")?.focus(options)
  }

  private resetIFrame() {
    if(!this.api) {
      return
    }

    this.api = undefined
    this.ready = false
    this.resetKey++
  }

  render() {
    return html`
      <div class="applet" ?data-ready=${this.ready}>
      ${keyed(this.resetKey, html`<iframe id="ggb" part="applet" title=${this.msg("GeoGebra applet")} @load=${(e: Event) => this.initializeIFrame(e.target as HTMLIFrameElement)}></iframe>`)}
      <p class="print-note">${this.msg("Interactive content: open the document online to use the GeoGebra applet.")}</p>
      </div>
    `
  }
}
