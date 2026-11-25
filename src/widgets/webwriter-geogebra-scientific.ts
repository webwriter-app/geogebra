import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

/**
 * A GeoGebra Scientific Calculator widget.
 */
@customElement("webwriter-geogebra-scientific")
export class WebwriterGeogebraScientific extends GeogebraApp {
  constructor() {
    super()
    this.type = "scientific" as const
    this.showZoomButtons = true
    this.showFullscreenButton = true
  }
}