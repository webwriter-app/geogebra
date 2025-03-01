import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

@customElement("webwriter-geogebra-notes")
export class WebwriterGeogebraNotes extends GeogebraApp {
  type = "notes" as const
  showZoomButtons = true
  showFullscreenButton = true
}