import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

/**
 * A GeoGebra Geometry widget.
 */
@customElement("webwriter-geogebra-geometry")
export class WebwriterGeogebraGeometry extends GeogebraApp {
  constructor() {
    super()
    this.type = "geometry" as const
    this.showZoomButtons = true
    this.showFullscreenButton = true
  }
}