import {customElement} from "lit/decorators.js"
import { GeogebraApp } from "../components/geogebra-app"

/**
 * A GeoGebra Equation Editor widget.
 */
@customElement("webwriter-geogebra-evaluator")
export class WebwriterGeogebraEvaluator extends GeogebraApp {
  constructor() {
    super()
    this.type = "evaluator" as const
    this.showZoomButtons = true
    this.showFullscreenButton = true
  }
}