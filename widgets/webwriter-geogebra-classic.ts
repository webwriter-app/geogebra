import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

@customElement("webwriter-geogebra-classic")
export class WebwriterGeogebraClassic extends GeogebraApp {
  type = "classic" as const
  showZoomButtons = true
  showFullscreenButton = true
}