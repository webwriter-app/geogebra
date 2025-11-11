import { msg } from "@lit/localize";
import { SlButton, SlChangeEvent, SlDetails, SlIcon, SlInput, SlOption, SlSelect, SlSwitch } from "@shoelace-style/shoelace";
import { LitElementWw } from "@webwriter/lit";
import { html } from "lit";
import FileEarmarkArrowUp from "../assets/icons/file-earmark-arrow-up.svg"
import { geogebraOptionsStyles } from "./geogebra-options.styles";
import { property } from "lit/decorators.js";

export interface PropertyConfig {
  name: string
  type: "boolean" | "number" | "string" | "select"
  options?: string[]
  value: number | string | boolean
}

export class GeogebraOptions extends LitElementWw {
  protected static get scopedElements() {
    return {
      "sl-button": SlButton,
      "sl-icon": SlIcon,
      "sl-switch": SlSwitch,
      "sl-details": SlDetails,
      "sl-select": SlSelect,
      "sl-option": SlOption,
      "sl-input": SlInput
    }
  }

  static styles = geogebraOptionsStyles

  @property({type: Boolean})
  accessor visible: boolean = false

  @property({type: Array})
  accessor properties: PropertyConfig[] = []

  private formatLabel(name: string): string {
    const customLabels: Map<string,string> = new Map([
      ["enable3d", "Enable 3D"],
      ["enableCAS", "Enable CAS"],
      ["useBrowserForJs", "Use Browser for JS"],
      ["disabledJavaScript", "Disable JavaScript"],
    ])
    if(customLabels.has(name)) {
      return customLabels.get(name)!
    }

    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  }

  private handleFileImport(e: SlChangeEvent) {
    const input = e.target as HTMLInputElement
    const file = input.files?.item(0)
    if(!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const base64 = (reader.result as string).split(",").at(-1)
      this.dispatchEvent(new CustomEvent("import-file", {
        detail: {base64},
        bubbles: true,
        composed: true
      }))
    }
    reader.readAsDataURL(file)
  }

  private handlePropertyChange(name: string, e: Event) {
    const target = e.target as any
    let newValue: string | boolean | number

    const prop = this.properties.find(p => p.name === name)
    if(!prop) return

    switch(prop.type) {
      case "boolean":
        newValue = target.checked
        break
      case "number":
        newValue = parseFloat(target.value)
        break
      default:
        newValue = target.value
    }

    this.dispatchEvent(new CustomEvent("property-change", {
      detail: {
        name,
        value: newValue
      },
      bubbles: true,
      composed: true
    }))
  }

  private renderPropertyInput(prop) {
    const label = this.formatLabel(prop.name)

    switch(prop.type) {
      case "boolean":
        return html`
          <sl-switch
            ?checked=${prop.value}
            @sl-change=${(e: Event) => {this.handlePropertyChange(prop.name, e)}}
          >
            ${label}
          </sl-switch>
        `

      case "number":
        return html`
          <sl-input
            type="number"
            size="small"
            label=${label}
            value=${prop.value ?? ""}
            @sl-change=${(e: Event) => this.handlePropertyChange(prop.name, e)}
          ></sl-input>
        `
      
      case "select":
        return html`
          <sl-select
            label=${label}
            size="small"
            value=${prop.value ?? ""}
            @sl-change=${(e: Event) => this.handlePropertyChange(prop.name, e)}
          >
            ${prop.options?.map(opt => html`
              <sl-option value=${opt}>${opt}</sl-option>
            `)}
          </sl-select>
        `
      
      case "string":
      default:
        return html`
          <sl-input
            type="text"
            size="small"
            label=${label}
            value=${prop.value ?? ""}
            @sl-change=${(e: Event) => this.handlePropertyChange(prop.name, e)}
          ></sl-input>
        `
    }
  }

  private renderPropertyInputs() {
    return html`${this.properties.map(prop => this.renderPropertyInput(prop))}`
  }

  render() {
    return html`
      <div class=${this.visible ? "" : "hidden"}>
        <input type="file" accept=".ggb" id="ggb-upload" name="ggb-upload" @change=${this.handleFileImport}>
        <sl-button @click=${
          () => {
            const input = this.renderRoot.querySelector("#ggb-upload") as HTMLInputElement
            input.value = ""
            input.click()
          }
        }>
          <sl-icon src=${FileEarmarkArrowUp} slot="prefix"></sl-icon>
          ${msg("Import GeoGebra File")}
        </sl-button>

        <sl-details summary=${msg("Advanced Settings")}>
          <p>
            ${msg("These settings are not relevant for most users and should not usually be changed. Changing them can completely break your applet.")} 
            ${msg(html`See the 
              <a 
                href="https://geogebra.github.io/docs/reference/en/GeoGebra_App_Parameters/"
                target="_blank">
                GeoGebra docs</a>
              for more information.`
            )}
          </p>
          ${this.renderPropertyInputs()}
        </sl-details>
      </div>
    `
  }
}