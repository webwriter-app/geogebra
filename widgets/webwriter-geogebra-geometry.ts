import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

@customElement("webwriter-geogebra-geometry")
export class WebwriterGeogebraGeometry extends GeogebraApp {
  type = "geometry" as const
  showZoomButtons = true
  showFullscreenButton = true
}