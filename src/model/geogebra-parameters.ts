// Properties of the widget that are handed to the applet as they are.
export const passThroughParameters = [
  "width", "height", "borderColor", "borderRadius", "enableRightClick", "enableLabelDrags", "enableShiftDragZoom",
  "showZoomButtons", "errorDialogsActive", "showMenuBar", "showToolBar", "showToolBarHelp", "customToolBar",
  "showAlgebraInput", "showResetIcon",
] as const

export const passThroughParametersAfterLocale = [
  "allowStyleBar", "randomize", "randomSeed", "useBrowserForJs", "showLogging", "capturingThreshold",
  "enableFileFeatures", "perspective", "enable3d", "enableCAS", "algebraInputPosition", "preventFocus",
  "scaleContainerClass", "autoHeight", "allowUpscale", "playButton", "scale", "showAnimationButton",
  "showFullscreenButton", "showSuggestionButtons", "showStartTooltip", "rounding", "buttonShadows",
  "buttonRounding", "buttonBorderColor", "editorBackgroundColor", "editorForegroundColor", "textmode",
  "showKeyboardOnFocus", "keyboardType", "transparentGraphics", "disabledJavaScript", "detachedKeyboardParent",
] as const

type Source = {
  appletId?: string
  type: string
  src?: string
  language?: string
  country?: string
} & Record<(typeof passThroughParameters)[number] | (typeof passThroughParametersAfterLocale)[number], unknown>

/** Maps the widget's properties to the parameters of the GeoGebra applet (deployggb.js). */
export function appletParameters(source: Source, lang: string, sourceLocale: string) {
  let locale: Intl.Locale
  try {
    locale = new Intl.Locale(lang.trim() || sourceLocale)
  } catch (error) {
    if (!(error instanceof RangeError)) throw error
    locale = new Intl.Locale(sourceLocale)
  }

  let filename: string | undefined, material_id: string | undefined, ggbBase64: string | undefined
  const {src, language} = source
  if (src?.startsWith("data:")) ggbBase64 = src.split(",").at(-1)
  else if (src?.startsWith("ggbid:")) material_id = src.slice("ggbid:".length)
  else if (src) filename = src

  const pick = (keys: readonly (keyof Source)[]) => Object.fromEntries(keys.map(key => [key, source[key]]))
  return {
    id: source.appletId,
    appName: source.type,
    filename,
    material_id,
    ggbBase64,
    ...pick(passThroughParameters),
    language: language ?? locale.language,
    country: source.country ?? (language ? undefined : locale.region ?? (locale.script ? locale.maximize().region : undefined)),
    ...pick(passThroughParametersAfterLocale),
  }
}
