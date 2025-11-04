import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

/**
 * A GeoGebra 3D Graphing Calculator widget.
 */
@customElement("webwriter-geogebra-3d")
export class WebwriterGeogebra3D extends GeogebraApp {
  constructor() {
    super()
    this.type = "3d" as const
    this.showZoomButtons = true
    this.showFullscreenButton = true
  }
}