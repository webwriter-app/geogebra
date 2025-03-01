import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

@customElement("webwriter-geogebra-3d")
export class WebwriterGeogebra3D extends GeogebraApp {
  type = "3d" as const
  showZoomButtons = true
  showFullscreenButton = true
}