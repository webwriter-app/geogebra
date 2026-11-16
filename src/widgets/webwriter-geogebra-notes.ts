import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

/**
 * A GeoGebra Notes widget.
 */
@customElement("webwriter-geogebra-notes")
export class WebwriterGeogebraNotes extends GeogebraApp {
  constructor() {
    super()
    this.type = "notes" as const
    this.showZoomButtons = true
    this.showFullscreenButton = true
  }
}