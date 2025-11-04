import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

/**
 * A GeoGebra Classic widget.
 */
@customElement("webwriter-geogebra-classic")
export class WebwriterGeogebraClassic extends GeogebraApp {
  constructor() {
    super()
    this.type = "classic" as const
    this.showZoomButtons = true
    this.showFullscreenButton = true
  }
}