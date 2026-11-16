import {html, css} from "lit"
import {LitElementWw} from "@webwriter/lit"
import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

/**
 * A GeoGebra Calculator Suite widget.
 */
@customElement("webwriter-geogebra")
export class WebwriterGeogebra extends GeogebraApp {
  constructor() {
    super()
    this.type = "suite" as const
    this.showZoomButtons = true
    this.showFullscreenButton = true
    this.enableFileFeatures = false
    this.enableUndoRedo = false
  
    this.ggbStyles = css`
      .button.undo, .button.redo {
        display: none !important;
      }

      .GeoGebraFrame .toolbar .header-open-landscape .center, .GeoGebraFrame .toolbar .header-close-landscape .center {
        top: 0 !important;
      }
    `.cssText
  }
}