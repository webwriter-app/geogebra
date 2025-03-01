import {html, css} from "lit"
import {LitElementWw} from "@webwriter/lit"
import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

@customElement("webwriter-geogebra")
export class WebwriterGeogebra extends GeogebraApp {
  type = "suite" as const
  showZoomButtons = true
  showFullscreenButton = true
  showMenuBar = true
  enableFileFeatures = false
  enableUndoRedo = false

  ggbStyles = css`
    .button.undo, .button.redo {
      display: none !important;
    }
  `.cssText
}