import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

@customElement("webwriter-geogebra-scientific")
export class WebwriterGeogebraScientific extends GeogebraApp {
  type = "scientific" as const
  showZoomButtons = true
  showFullscreenButton = true
}