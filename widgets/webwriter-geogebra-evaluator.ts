import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

@customElement("webwriter-geogebra-evaluator")
export class WebwriterGeogebraEvaluator extends GeogebraApp {
  type = "evaluator" as const
  showZoomButtons = true
  showFullscreenButton = true
}