# Geogebra (`@webwriter/geogebra@1.1.0`)
[License: MIT](LICENSE) | Version: 1.1.0

Use the mathematics learning apps of GeoGebra for algebra and geometry.





## `WebwriterGeogebra` (`<webwriter-geogebra>`)
A GeoGebra Calculator Suite widget.

### Usage

Use with a CDN (e.g. [jsdelivr](https://jsdelivr.com)):
```html
<link href="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra.css" rel="stylesheet">
<script type="module" src="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra.js"></script>
<webwriter-geogebra></webwriter-geogebra>
```

Or use with a bundler (e.g. [Vite](https://vite.dev)):

```
npm install @webwriter/geogebra
```

```html
<link href="@webwriter/geogebra/widgets/webwriter-geogebra.css" rel="stylesheet">
<script type="module" src="@webwriter/geogebra/widgets/webwriter-geogebra.js"></script>
<webwriter-geogebra></webwriter-geogebra>
```

## Fields
| Name (Attribute Name) | Type | Description | Default | Reflects |
| :-------------------: | :--: | :---------: | :-----: | :------: |
| `type` (`type`) | `"classic" \| "geometry" \| "3d" \| "suite" \| "evaluator" \| "scientific" \| "notes"` | app name, default: "classic". "graphing" …​ GeoGebra Graphing Calculator "geometry" …​ GeoGebra Geometry "3d" …​ GeoGebra 3D Graphing Calculator "classic" …​ GeoGebra Classic "suite" …​ GeoGebra Calculator Suite "evaluator" …​ Equation Editor "scientific" …​Scientific Calculator "notes" …​ GeoGebra Notes | `"suite"` | ✓ |
| `showZoomButtons` (`showZoomButtons`) | `boolean` | States whether the zoom in / zoom out / home buttons should be shown in the Graphics View or not. Default: false | `true` | ✓ |
| `showFullscreenButton` (`showFullscreenButton`) | `boolean` | Whether fullscreen button should be visible | `true` | ✓ |
| `enableFileFeatures` (`enableFileFeatures`) | `boolean` | Determines whether file saving, file loading, sign in and Options > Save settings are enabled. This argument is ignored when menubar is not showing. Default: true | `false` | ✓ |
| `enableUndoRedo` (`enableUndoRedo`) | `boolean` | Determines whether Undo and Redo icons are shown. This argument is ignored when toolbar is not showing. Default: true | `false` | ✓ |
| `ggbStyles` (`ggbStyles`) | `string` | Custom CSS styles to apply to the GeoGebra applet. | - | ✗ |
| `width` (`width`) | `number` | Applet width | `800` | ✓ |
| `height` (`height`) | `number` | Applet height | `450` | ✓ |
| `src` (`src`) | `string` | Source of the GeoGebra file to load (base64-encoded string, material ID prefixed with "ggbid:", or file URL) | - | ✓ |
| `borderColor` (`borderColor`) | `string` | Color of the border line drawn around the applet panel (as hex rgb string). Default: gray | `"gray"` | ✓ |
| `borderRadius` (`borderRadius`) | `number` | Size of applet's border radius in pixels. | `1` | ✓ |
| `enableRightClick` (`enableRightClick`) | `boolean` | States whether right clicks should be handled by the applet. Setting this parameter to "false" disables context menus, properties dialogs and right-click-zooming. Default: true. NB also enables/disables some keyboard shortcuts eg Delete and Ctrl + R (recompute all objects). Default: true | `true` | ✓ |
| `enableLabelDrags` (`enableLabelDrags`) | `boolean` | States whether labels can be dragged. Default: true | `true` | ✓ |
| `enableShiftDragZoom` (`enableShiftDragZoom`) | `boolean` | States whether the Graphics View(s) should be moveable using Shift mouse drag (or. Ctrl + mouse drag) or zoomable using Shift + mouse wheel (or Ctrl + mouse wheel). Setting this parameter to "false" disables moving and zooming of the drawing pad. Default: true | `true` | ✓ |
| `errorDialogsActive` (`errorDialogsActive`) | `boolean` | States whether error dialogs will be shown if an invalid input is entered (using the Input Bar or JavaScript) Default: true | `true` | ✓ |
| `showMenuBar` (`showMenuBar`) | `boolean` | States whether the menubar of GeoGebra should be shown in the applet. Default: false | `false` | ✓ |
| `showToolBar` (`showToolBar`) | `boolean` | States whether the toolbar with the construction mode buttons should be shown in the applet. Default: false | `true` | ✓ |
| `showToolBarHelp` (`showToolBarHelp`) | `boolean` | States whether the toolbar help text right to the toolbar buttons should be shown in the applet | `false` | ✓ |
| `customToolBar` (`customToolBar`) | `string` | Sets the toolbar according to a custom toolbar string where the int values are Toolbar Mode Values, `,` adds a separator within a menu, `\|` starts a new menu and `\|\|` adds a separator in the toolbar before starting a new menu. This will override the saved toolbar from the .ggb file / base64 string. Custom tools are numbered 100 001, 100 002, etc | - | ✓ |
| `showAlgebraInput` (`showAlgebraInput`) | `boolean` | States whether the algebra input line (with input field, greek letters and command list) should be shown in the applet. Default: false | `true` | ✓ |
| `showResetIcon` (`showResetIcon`) | `boolean` | States whether a small icon (GeoGebra ellipse) should be shown in the upper right corner of the applet. Clicking on this icon resets the applet (i.e. it reloads the file given in the filename parameter). Default: false | `false` | ✓ |
| `language` (`language`) | `String` | ISO language string. GeoGebra tries to set your local language automatically (if it is available among the supported languages, of course). The default language for unsupported languages is English. If you want to specify a certain language manually, please use this parameter. | - | ✓ |
| `country` (`country`) | `String` | ISO country string. This parameter only makes sense if you use it together with the language parameter. | - | ✓ |
| `appletId` (`appletId`) | `String` | This parameter allows you to specify the argument passed to the JavaScript function ggbOnInit(), which is called once the applet is fully initialised. This is useful when you have multiple applets on a page. | - | ✓ |
| `allowStyleBar` (`allowStyleBar`) | `boolean` | Determines whether the Style Bar can be shown (or will be shown if just Graphics View 1 is showing). Default: false | `false` | ✓ |
| `randomize` (`randomize`) | `boolean` | Determines whether random numbers should be randomized on file load. Useful when you want the app to reload in exactly the same state it was saved. Default: true | `true` | ✓ |
| `randomSeed` (`randomSeed`) | `number` | Specify seed for random numbers. Note that if you save a state of the app after user interacted with it and try to reload that state with the same randomSeed, you may get a different result. Use randomize for those use-cases. | - | ✓ |
| `useBrowserForJs` (`useBrowserForJs`) | `boolean` | When true, GeoGebra: runs ggbOnInit from HTML, ignores ggbOnInit from file, and ignores JS update scripts of objects in file. When false, GeoGebra: ignores ggbOnInit from HTML (use appletOnLoad parameter of GGBApplet instead), runs ggbOnInit from file, and runs JS update scripts of objects in file. Default: false | `false` | ✓ |
| `showLogging` (`showLogging`) | `boolean` | Determines whether logging is shown in the Browser's console. Default: false | `false` | ✓ |
| `capturingThreshold` (`capturingThreshold`) | `number` | Determines the sensitivity of object selection. The default value of 3 is usually fine to select and drag objects both with the mouse and touch. Use larger values (e.g. 4 or 5) to make it easier to select and drag objects. Default: 3 | `3` | ✓ |
| `perspective` (`perspective`) | `String` | For values see SetPerspective_Command in the GeoGebra Manual. Just for a blank start ie shouldn't be used with material_id, filename or ggbBase64 parameters | - | ✓ |
| `enable3d` (`enable3d`) | `boolean` | Whether 3D should be enabled (for exam mode). | - | ✓ |
| `enableCAS` (`enableCAS`) | `boolean` | Whether CAS should be enabled (for exam mode). | - | ✓ |
| `algebraInputPosition` (`algebraInputPosition`) | `"algebra" \| "top" \| "bottom"` | Determines whether input bar should be shown in algebra, on top of the applet or under the applet. When left empty (default), the position depends on file. | - | ✓ |
| `preventFocus` (`preventFocus`) | `boolean` | When set to true, this prevents the applet from getting focus automatically at the start. Default: false | `false` | ✓ |
| `scaleContainerClass` (`scaleContainerClass`) | `string` | Name of CSS class that is used as container; applet will scale to fit into the container. | - | ✓ |
| `autoHeight` (`autoHeight`) | `boolean` | `true` to restrict the width of the applet and compute height automatically, add autoHeight: true. `false` if you want the applet to be restricted by both width and height of the container | `true` | ✓ |
| `allowUpscale` (`allowUpscale`) | `boolean` | Determines whether automatic scaling may scale the applet up. Default: false | `false` | ✓ |
| `playButton` (`playButton`) | `boolean` | Determines whether a preview image and a play button should be rendered in place of the applet. Pushing the play button initializes the applet. Default: false | `false` | ✓ |
| `scale` (`scale`) | `number` | Ratio by which the applet should be scaled (eg. 2 makes the applet 2 times bigger, including all texts and UI elements). Default: 1 | `1` | ✓ |
| `showAnimationButton` (`showAnimationButton`) | `boolean` | Whether animation button should be visible | `false` | ✓ |
| `showSuggestionButtons` (`showSuggestionButtons`) | `boolean` | Whether suggestion buttons (special points, solve) in Algebra View should be visible | `false` | ✓ |
| `showStartTooltip` (`showStartTooltip`) | `boolean` | Whether "Welcome" tooltip should be shown | `false` | ✓ |
| `rounding` (`rounding`) | `string` | String composed of number of decimal places and flags — valid flags are "s" for significant digits and "r" for rational numbers. Hence "10" means 10 decimal places, "10s" stands for 10 significant digits. | - | ✓ |
| `buttonShadows` (`buttonShadows`) | `boolean` | Whether buttons should have shadow | `false` | ✓ |
| `buttonRounding` (`buttonRounding`) | `Number` | Relative radius of button's rounded border. The border radius in pixels is buttonRounding * height /2, where height is the height of the button. Default: 0.2 | `0.2` | ✓ |
| `buttonBorderColor` (`buttonBorderColor`) | `string` | Border color of buttons on the graphics view. Default is black, if the button background is white, otherwise one shade darker than the background color | - | ✓ |
| `editorBackgroundColor` (`editorBackgroundColor`) | `string` | Background color of the evaluator app | - | ✓ |
| `editorForegroundColor` (`editorForegroundColor`) | `string` | Foreground (text) color of the equation editor (appname = "evaluator") | - | ✓ |
| `textmode` (`textmode`) | `boolean` | Whether editor is in text mode or not (appname = "evaluator"). Default: false | `false` | ✓ |
| `showKeyboardOnFocus` (`showKeyboardOnFocus`) | `boolean` | Whether to show keyboard when input is focused. When set to true, keyboard is always shown, for false it never appears, for auto it's shown unless closed by user. Default: true in evaluator app, auto in other apps | - | ✓ |
| `keyboardType` (`keyboardType`) | `"scientific" \| "normal" \| "notes"` | Which keyboard is shown for equation editor (appname = "evaluator") | - | ✓ |
| `transparentGraphics` (`transparentGraphics`) | `boolean` | Whether the Graphics View and Graphics View 2 should be transparent | `false` | ✓ |
| `disabledJavaScript` (`disabledJavaScript`) | `boolean` | Whether running JavaScript from material files is disabled or not. | `false` | ✓ |
| `detachedKeyboardParent` (`detachedKeyboardParent`) | `string` | When set, the keyboard should be attached to the first element in DOM that fits the selector. | - | ✓ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Events
| Name | Description |
| :--: | :---------: |
| focus | Fired when the GeoGebra applet gains focus. |
| ggb-load | Fired when the GeoGebra API is ready. The event detail contains the API instance. |

*[Events](https://developer.mozilla.org/en-US/docs/Web/Events) are dispatched by the widget after certain triggers.*

## Editing config
| Name | Value |
| :--: | :---------: |
| `content` | `text*` |

*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public methods, slots, custom CSS properties, or CSS parts.*


## `WebwriterGeogebraGeometry` (`<webwriter-geogebra-geometry>`)
A GeoGebra Geometry widget.

### Usage

Use with a CDN (e.g. [jsdelivr](https://jsdelivr.com)):
```html
<link href="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra-geometry.css" rel="stylesheet">
<script type="module" src="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra-geometry.js"></script>
<webwriter-geogebra-geometry></webwriter-geogebra-geometry>
```

Or use with a bundler (e.g. [Vite](https://vite.dev)):

```
npm install @webwriter/geogebra
```

```html
<link href="@webwriter/geogebra/widgets/webwriter-geogebra-geometry.css" rel="stylesheet">
<script type="module" src="@webwriter/geogebra/widgets/webwriter-geogebra-geometry.js"></script>
<webwriter-geogebra-geometry></webwriter-geogebra-geometry>
```

## Fields
| Name (Attribute Name) | Type | Description | Default | Reflects |
| :-------------------: | :--: | :---------: | :-----: | :------: |
| `type` (`type`) | `"classic" \| "geometry" \| "3d" \| "suite" \| "evaluator" \| "scientific" \| "notes"` | app name, default: "classic". "graphing" …​ GeoGebra Graphing Calculator "geometry" …​ GeoGebra Geometry "3d" …​ GeoGebra 3D Graphing Calculator "classic" …​ GeoGebra Classic "suite" …​ GeoGebra Calculator Suite "evaluator" …​ Equation Editor "scientific" …​Scientific Calculator "notes" …​ GeoGebra Notes | `"geometry"` | ✓ |
| `showZoomButtons` (`showZoomButtons`) | `boolean` | States whether the zoom in / zoom out / home buttons should be shown in the Graphics View or not. Default: false | `true` | ✓ |
| `showFullscreenButton` (`showFullscreenButton`) | `boolean` | Whether fullscreen button should be visible | `true` | ✓ |
| `ggbStyles` (`ggbStyles`) | `string` | Custom CSS styles to apply to the GeoGebra applet. | - | ✗ |
| `width` (`width`) | `number` | Applet width | `800` | ✓ |
| `height` (`height`) | `number` | Applet height | `450` | ✓ |
| `src` (`src`) | `string` | Source of the GeoGebra file to load (base64-encoded string, material ID prefixed with "ggbid:", or file URL) | - | ✓ |
| `borderColor` (`borderColor`) | `string` | Color of the border line drawn around the applet panel (as hex rgb string). Default: gray | `"gray"` | ✓ |
| `borderRadius` (`borderRadius`) | `number` | Size of applet's border radius in pixels. | `1` | ✓ |
| `enableRightClick` (`enableRightClick`) | `boolean` | States whether right clicks should be handled by the applet. Setting this parameter to "false" disables context menus, properties dialogs and right-click-zooming. Default: true. NB also enables/disables some keyboard shortcuts eg Delete and Ctrl + R (recompute all objects). Default: true | `true` | ✓ |
| `enableLabelDrags` (`enableLabelDrags`) | `boolean` | States whether labels can be dragged. Default: true | `true` | ✓ |
| `enableShiftDragZoom` (`enableShiftDragZoom`) | `boolean` | States whether the Graphics View(s) should be moveable using Shift mouse drag (or. Ctrl + mouse drag) or zoomable using Shift + mouse wheel (or Ctrl + mouse wheel). Setting this parameter to "false" disables moving and zooming of the drawing pad. Default: true | `true` | ✓ |
| `errorDialogsActive` (`errorDialogsActive`) | `boolean` | States whether error dialogs will be shown if an invalid input is entered (using the Input Bar or JavaScript) Default: true | `true` | ✓ |
| `showMenuBar` (`showMenuBar`) | `boolean` | States whether the menubar of GeoGebra should be shown in the applet. Default: false | `false` | ✓ |
| `showToolBar` (`showToolBar`) | `boolean` | States whether the toolbar with the construction mode buttons should be shown in the applet. Default: false | `true` | ✓ |
| `showToolBarHelp` (`showToolBarHelp`) | `boolean` | States whether the toolbar help text right to the toolbar buttons should be shown in the applet | `false` | ✓ |
| `customToolBar` (`customToolBar`) | `string` | Sets the toolbar according to a custom toolbar string where the int values are Toolbar Mode Values, `,` adds a separator within a menu, `\|` starts a new menu and `\|\|` adds a separator in the toolbar before starting a new menu. This will override the saved toolbar from the .ggb file / base64 string. Custom tools are numbered 100 001, 100 002, etc | - | ✓ |
| `showAlgebraInput` (`showAlgebraInput`) | `boolean` | States whether the algebra input line (with input field, greek letters and command list) should be shown in the applet. Default: false | `true` | ✓ |
| `showResetIcon` (`showResetIcon`) | `boolean` | States whether a small icon (GeoGebra ellipse) should be shown in the upper right corner of the applet. Clicking on this icon resets the applet (i.e. it reloads the file given in the filename parameter). Default: false | `false` | ✓ |
| `language` (`language`) | `String` | ISO language string. GeoGebra tries to set your local language automatically (if it is available among the supported languages, of course). The default language for unsupported languages is English. If you want to specify a certain language manually, please use this parameter. | - | ✓ |
| `country` (`country`) | `String` | ISO country string. This parameter only makes sense if you use it together with the language parameter. | - | ✓ |
| `appletId` (`appletId`) | `String` | This parameter allows you to specify the argument passed to the JavaScript function ggbOnInit(), which is called once the applet is fully initialised. This is useful when you have multiple applets on a page. | - | ✓ |
| `allowStyleBar` (`allowStyleBar`) | `boolean` | Determines whether the Style Bar can be shown (or will be shown if just Graphics View 1 is showing). Default: false | `false` | ✓ |
| `randomize` (`randomize`) | `boolean` | Determines whether random numbers should be randomized on file load. Useful when you want the app to reload in exactly the same state it was saved. Default: true | `true` | ✓ |
| `randomSeed` (`randomSeed`) | `number` | Specify seed for random numbers. Note that if you save a state of the app after user interacted with it and try to reload that state with the same randomSeed, you may get a different result. Use randomize for those use-cases. | - | ✓ |
| `useBrowserForJs` (`useBrowserForJs`) | `boolean` | When true, GeoGebra: runs ggbOnInit from HTML, ignores ggbOnInit from file, and ignores JS update scripts of objects in file. When false, GeoGebra: ignores ggbOnInit from HTML (use appletOnLoad parameter of GGBApplet instead), runs ggbOnInit from file, and runs JS update scripts of objects in file. Default: false | `false` | ✓ |
| `showLogging` (`showLogging`) | `boolean` | Determines whether logging is shown in the Browser's console. Default: false | `false` | ✓ |
| `capturingThreshold` (`capturingThreshold`) | `number` | Determines the sensitivity of object selection. The default value of 3 is usually fine to select and drag objects both with the mouse and touch. Use larger values (e.g. 4 or 5) to make it easier to select and drag objects. Default: 3 | `3` | ✓ |
| `enableFileFeatures` (`enableFileFeatures`) | `boolean` | Determines whether file saving, file loading, sign in and Options > Save settings are enabled. This argument is ignored when menubar is not showing. Default: true | `true` | ✓ |
| `enableUndoRedo` (`enableUndoRedo`) | `boolean` | Determines whether Undo and Redo icons are shown. This argument is ignored when toolbar is not showing. Default: true | `true` | ✓ |
| `perspective` (`perspective`) | `String` | For values see SetPerspective_Command in the GeoGebra Manual. Just for a blank start ie shouldn't be used with material_id, filename or ggbBase64 parameters | - | ✓ |
| `enable3d` (`enable3d`) | `boolean` | Whether 3D should be enabled (for exam mode). | - | ✓ |
| `enableCAS` (`enableCAS`) | `boolean` | Whether CAS should be enabled (for exam mode). | - | ✓ |
| `algebraInputPosition` (`algebraInputPosition`) | `"algebra" \| "top" \| "bottom"` | Determines whether input bar should be shown in algebra, on top of the applet or under the applet. When left empty (default), the position depends on file. | - | ✓ |
| `preventFocus` (`preventFocus`) | `boolean` | When set to true, this prevents the applet from getting focus automatically at the start. Default: false | `false` | ✓ |
| `scaleContainerClass` (`scaleContainerClass`) | `string` | Name of CSS class that is used as container; applet will scale to fit into the container. | - | ✓ |
| `autoHeight` (`autoHeight`) | `boolean` | `true` to restrict the width of the applet and compute height automatically, add autoHeight: true. `false` if you want the applet to be restricted by both width and height of the container | `true` | ✓ |
| `allowUpscale` (`allowUpscale`) | `boolean` | Determines whether automatic scaling may scale the applet up. Default: false | `false` | ✓ |
| `playButton` (`playButton`) | `boolean` | Determines whether a preview image and a play button should be rendered in place of the applet. Pushing the play button initializes the applet. Default: false | `false` | ✓ |
| `scale` (`scale`) | `number` | Ratio by which the applet should be scaled (eg. 2 makes the applet 2 times bigger, including all texts and UI elements). Default: 1 | `1` | ✓ |
| `showAnimationButton` (`showAnimationButton`) | `boolean` | Whether animation button should be visible | `false` | ✓ |
| `showSuggestionButtons` (`showSuggestionButtons`) | `boolean` | Whether suggestion buttons (special points, solve) in Algebra View should be visible | `false` | ✓ |
| `showStartTooltip` (`showStartTooltip`) | `boolean` | Whether "Welcome" tooltip should be shown | `false` | ✓ |
| `rounding` (`rounding`) | `string` | String composed of number of decimal places and flags — valid flags are "s" for significant digits and "r" for rational numbers. Hence "10" means 10 decimal places, "10s" stands for 10 significant digits. | - | ✓ |
| `buttonShadows` (`buttonShadows`) | `boolean` | Whether buttons should have shadow | `false` | ✓ |
| `buttonRounding` (`buttonRounding`) | `Number` | Relative radius of button's rounded border. The border radius in pixels is buttonRounding * height /2, where height is the height of the button. Default: 0.2 | `0.2` | ✓ |
| `buttonBorderColor` (`buttonBorderColor`) | `string` | Border color of buttons on the graphics view. Default is black, if the button background is white, otherwise one shade darker than the background color | - | ✓ |
| `editorBackgroundColor` (`editorBackgroundColor`) | `string` | Background color of the evaluator app | - | ✓ |
| `editorForegroundColor` (`editorForegroundColor`) | `string` | Foreground (text) color of the equation editor (appname = "evaluator") | - | ✓ |
| `textmode` (`textmode`) | `boolean` | Whether editor is in text mode or not (appname = "evaluator"). Default: false | `false` | ✓ |
| `showKeyboardOnFocus` (`showKeyboardOnFocus`) | `boolean` | Whether to show keyboard when input is focused. When set to true, keyboard is always shown, for false it never appears, for auto it's shown unless closed by user. Default: true in evaluator app, auto in other apps | - | ✓ |
| `keyboardType` (`keyboardType`) | `"scientific" \| "normal" \| "notes"` | Which keyboard is shown for equation editor (appname = "evaluator") | - | ✓ |
| `transparentGraphics` (`transparentGraphics`) | `boolean` | Whether the Graphics View and Graphics View 2 should be transparent | `false` | ✓ |
| `disabledJavaScript` (`disabledJavaScript`) | `boolean` | Whether running JavaScript from material files is disabled or not. | `false` | ✓ |
| `detachedKeyboardParent` (`detachedKeyboardParent`) | `string` | When set, the keyboard should be attached to the first element in DOM that fits the selector. | - | ✓ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Events
| Name | Description |
| :--: | :---------: |
| focus | Fired when the GeoGebra applet gains focus. |
| ggb-load | Fired when the GeoGebra API is ready. The event detail contains the API instance. |

*[Events](https://developer.mozilla.org/en-US/docs/Web/Events) are dispatched by the widget after certain triggers.*

## Editing config
| Name | Value |
| :--: | :---------: |
| `content` | `text*` |

*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public methods, slots, custom CSS properties, or CSS parts.*


## `WebwriterGeogebra3D` (`<webwriter-geogebra-3d>`)
A GeoGebra 3D Graphing Calculator widget.

### Usage

Use with a CDN (e.g. [jsdelivr](https://jsdelivr.com)):
```html
<link href="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra-3d.css" rel="stylesheet">
<script type="module" src="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra-3d.js"></script>
<webwriter-geogebra-3d></webwriter-geogebra-3d>
```

Or use with a bundler (e.g. [Vite](https://vite.dev)):

```
npm install @webwriter/geogebra
```

```html
<link href="@webwriter/geogebra/widgets/webwriter-geogebra-3d.css" rel="stylesheet">
<script type="module" src="@webwriter/geogebra/widgets/webwriter-geogebra-3d.js"></script>
<webwriter-geogebra-3d></webwriter-geogebra-3d>
```

## Fields
| Name (Attribute Name) | Type | Description | Default | Reflects |
| :-------------------: | :--: | :---------: | :-----: | :------: |
| `type` (`type`) | `"classic" \| "geometry" \| "3d" \| "suite" \| "evaluator" \| "scientific" \| "notes"` | app name, default: "classic". "graphing" …​ GeoGebra Graphing Calculator "geometry" …​ GeoGebra Geometry "3d" …​ GeoGebra 3D Graphing Calculator "classic" …​ GeoGebra Classic "suite" …​ GeoGebra Calculator Suite "evaluator" …​ Equation Editor "scientific" …​Scientific Calculator "notes" …​ GeoGebra Notes | `"3d"` | ✓ |
| `showZoomButtons` (`showZoomButtons`) | `boolean` | States whether the zoom in / zoom out / home buttons should be shown in the Graphics View or not. Default: false | `true` | ✓ |
| `showFullscreenButton` (`showFullscreenButton`) | `boolean` | Whether fullscreen button should be visible | `true` | ✓ |
| `ggbStyles` (`ggbStyles`) | `string` | Custom CSS styles to apply to the GeoGebra applet. | - | ✗ |
| `width` (`width`) | `number` | Applet width | `800` | ✓ |
| `height` (`height`) | `number` | Applet height | `450` | ✓ |
| `src` (`src`) | `string` | Source of the GeoGebra file to load (base64-encoded string, material ID prefixed with "ggbid:", or file URL) | - | ✓ |
| `borderColor` (`borderColor`) | `string` | Color of the border line drawn around the applet panel (as hex rgb string). Default: gray | `"gray"` | ✓ |
| `borderRadius` (`borderRadius`) | `number` | Size of applet's border radius in pixels. | `1` | ✓ |
| `enableRightClick` (`enableRightClick`) | `boolean` | States whether right clicks should be handled by the applet. Setting this parameter to "false" disables context menus, properties dialogs and right-click-zooming. Default: true. NB also enables/disables some keyboard shortcuts eg Delete and Ctrl + R (recompute all objects). Default: true | `true` | ✓ |
| `enableLabelDrags` (`enableLabelDrags`) | `boolean` | States whether labels can be dragged. Default: true | `true` | ✓ |
| `enableShiftDragZoom` (`enableShiftDragZoom`) | `boolean` | States whether the Graphics View(s) should be moveable using Shift mouse drag (or. Ctrl + mouse drag) or zoomable using Shift + mouse wheel (or Ctrl + mouse wheel). Setting this parameter to "false" disables moving and zooming of the drawing pad. Default: true | `true` | ✓ |
| `errorDialogsActive` (`errorDialogsActive`) | `boolean` | States whether error dialogs will be shown if an invalid input is entered (using the Input Bar or JavaScript) Default: true | `true` | ✓ |
| `showMenuBar` (`showMenuBar`) | `boolean` | States whether the menubar of GeoGebra should be shown in the applet. Default: false | `false` | ✓ |
| `showToolBar` (`showToolBar`) | `boolean` | States whether the toolbar with the construction mode buttons should be shown in the applet. Default: false | `true` | ✓ |
| `showToolBarHelp` (`showToolBarHelp`) | `boolean` | States whether the toolbar help text right to the toolbar buttons should be shown in the applet | `false` | ✓ |
| `customToolBar` (`customToolBar`) | `string` | Sets the toolbar according to a custom toolbar string where the int values are Toolbar Mode Values, `,` adds a separator within a menu, `\|` starts a new menu and `\|\|` adds a separator in the toolbar before starting a new menu. This will override the saved toolbar from the .ggb file / base64 string. Custom tools are numbered 100 001, 100 002, etc | - | ✓ |
| `showAlgebraInput` (`showAlgebraInput`) | `boolean` | States whether the algebra input line (with input field, greek letters and command list) should be shown in the applet. Default: false | `true` | ✓ |
| `showResetIcon` (`showResetIcon`) | `boolean` | States whether a small icon (GeoGebra ellipse) should be shown in the upper right corner of the applet. Clicking on this icon resets the applet (i.e. it reloads the file given in the filename parameter). Default: false | `false` | ✓ |
| `language` (`language`) | `String` | ISO language string. GeoGebra tries to set your local language automatically (if it is available among the supported languages, of course). The default language for unsupported languages is English. If you want to specify a certain language manually, please use this parameter. | - | ✓ |
| `country` (`country`) | `String` | ISO country string. This parameter only makes sense if you use it together with the language parameter. | - | ✓ |
| `appletId` (`appletId`) | `String` | This parameter allows you to specify the argument passed to the JavaScript function ggbOnInit(), which is called once the applet is fully initialised. This is useful when you have multiple applets on a page. | - | ✓ |
| `allowStyleBar` (`allowStyleBar`) | `boolean` | Determines whether the Style Bar can be shown (or will be shown if just Graphics View 1 is showing). Default: false | `false` | ✓ |
| `randomize` (`randomize`) | `boolean` | Determines whether random numbers should be randomized on file load. Useful when you want the app to reload in exactly the same state it was saved. Default: true | `true` | ✓ |
| `randomSeed` (`randomSeed`) | `number` | Specify seed for random numbers. Note that if you save a state of the app after user interacted with it and try to reload that state with the same randomSeed, you may get a different result. Use randomize for those use-cases. | - | ✓ |
| `useBrowserForJs` (`useBrowserForJs`) | `boolean` | When true, GeoGebra: runs ggbOnInit from HTML, ignores ggbOnInit from file, and ignores JS update scripts of objects in file. When false, GeoGebra: ignores ggbOnInit from HTML (use appletOnLoad parameter of GGBApplet instead), runs ggbOnInit from file, and runs JS update scripts of objects in file. Default: false | `false` | ✓ |
| `showLogging` (`showLogging`) | `boolean` | Determines whether logging is shown in the Browser's console. Default: false | `false` | ✓ |
| `capturingThreshold` (`capturingThreshold`) | `number` | Determines the sensitivity of object selection. The default value of 3 is usually fine to select and drag objects both with the mouse and touch. Use larger values (e.g. 4 or 5) to make it easier to select and drag objects. Default: 3 | `3` | ✓ |
| `enableFileFeatures` (`enableFileFeatures`) | `boolean` | Determines whether file saving, file loading, sign in and Options > Save settings are enabled. This argument is ignored when menubar is not showing. Default: true | `true` | ✓ |
| `enableUndoRedo` (`enableUndoRedo`) | `boolean` | Determines whether Undo and Redo icons are shown. This argument is ignored when toolbar is not showing. Default: true | `true` | ✓ |
| `perspective` (`perspective`) | `String` | For values see SetPerspective_Command in the GeoGebra Manual. Just for a blank start ie shouldn't be used with material_id, filename or ggbBase64 parameters | - | ✓ |
| `enable3d` (`enable3d`) | `boolean` | Whether 3D should be enabled (for exam mode). | - | ✓ |
| `enableCAS` (`enableCAS`) | `boolean` | Whether CAS should be enabled (for exam mode). | - | ✓ |
| `algebraInputPosition` (`algebraInputPosition`) | `"algebra" \| "top" \| "bottom"` | Determines whether input bar should be shown in algebra, on top of the applet or under the applet. When left empty (default), the position depends on file. | - | ✓ |
| `preventFocus` (`preventFocus`) | `boolean` | When set to true, this prevents the applet from getting focus automatically at the start. Default: false | `false` | ✓ |
| `scaleContainerClass` (`scaleContainerClass`) | `string` | Name of CSS class that is used as container; applet will scale to fit into the container. | - | ✓ |
| `autoHeight` (`autoHeight`) | `boolean` | `true` to restrict the width of the applet and compute height automatically, add autoHeight: true. `false` if you want the applet to be restricted by both width and height of the container | `true` | ✓ |
| `allowUpscale` (`allowUpscale`) | `boolean` | Determines whether automatic scaling may scale the applet up. Default: false | `false` | ✓ |
| `playButton` (`playButton`) | `boolean` | Determines whether a preview image and a play button should be rendered in place of the applet. Pushing the play button initializes the applet. Default: false | `false` | ✓ |
| `scale` (`scale`) | `number` | Ratio by which the applet should be scaled (eg. 2 makes the applet 2 times bigger, including all texts and UI elements). Default: 1 | `1` | ✓ |
| `showAnimationButton` (`showAnimationButton`) | `boolean` | Whether animation button should be visible | `false` | ✓ |
| `showSuggestionButtons` (`showSuggestionButtons`) | `boolean` | Whether suggestion buttons (special points, solve) in Algebra View should be visible | `false` | ✓ |
| `showStartTooltip` (`showStartTooltip`) | `boolean` | Whether "Welcome" tooltip should be shown | `false` | ✓ |
| `rounding` (`rounding`) | `string` | String composed of number of decimal places and flags — valid flags are "s" for significant digits and "r" for rational numbers. Hence "10" means 10 decimal places, "10s" stands for 10 significant digits. | - | ✓ |
| `buttonShadows` (`buttonShadows`) | `boolean` | Whether buttons should have shadow | `false` | ✓ |
| `buttonRounding` (`buttonRounding`) | `Number` | Relative radius of button's rounded border. The border radius in pixels is buttonRounding * height /2, where height is the height of the button. Default: 0.2 | `0.2` | ✓ |
| `buttonBorderColor` (`buttonBorderColor`) | `string` | Border color of buttons on the graphics view. Default is black, if the button background is white, otherwise one shade darker than the background color | - | ✓ |
| `editorBackgroundColor` (`editorBackgroundColor`) | `string` | Background color of the evaluator app | - | ✓ |
| `editorForegroundColor` (`editorForegroundColor`) | `string` | Foreground (text) color of the equation editor (appname = "evaluator") | - | ✓ |
| `textmode` (`textmode`) | `boolean` | Whether editor is in text mode or not (appname = "evaluator"). Default: false | `false` | ✓ |
| `showKeyboardOnFocus` (`showKeyboardOnFocus`) | `boolean` | Whether to show keyboard when input is focused. When set to true, keyboard is always shown, for false it never appears, for auto it's shown unless closed by user. Default: true in evaluator app, auto in other apps | - | ✓ |
| `keyboardType` (`keyboardType`) | `"scientific" \| "normal" \| "notes"` | Which keyboard is shown for equation editor (appname = "evaluator") | - | ✓ |
| `transparentGraphics` (`transparentGraphics`) | `boolean` | Whether the Graphics View and Graphics View 2 should be transparent | `false` | ✓ |
| `disabledJavaScript` (`disabledJavaScript`) | `boolean` | Whether running JavaScript from material files is disabled or not. | `false` | ✓ |
| `detachedKeyboardParent` (`detachedKeyboardParent`) | `string` | When set, the keyboard should be attached to the first element in DOM that fits the selector. | - | ✓ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Events
| Name | Description |
| :--: | :---------: |
| focus | Fired when the GeoGebra applet gains focus. |
| ggb-load | Fired when the GeoGebra API is ready. The event detail contains the API instance. |

*[Events](https://developer.mozilla.org/en-US/docs/Web/Events) are dispatched by the widget after certain triggers.*

## Editing config
| Name | Value |
| :--: | :---------: |
| `content` | `text*` |

*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public methods, slots, custom CSS properties, or CSS parts.*


## `WebwriterGeogebraNotes` (`<webwriter-geogebra-notes>`)
A GeoGebra Notes widget.

### Usage

Use with a CDN (e.g. [jsdelivr](https://jsdelivr.com)):
```html
<link href="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra-notes.css" rel="stylesheet">
<script type="module" src="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra-notes.js"></script>
<webwriter-geogebra-notes></webwriter-geogebra-notes>
```

Or use with a bundler (e.g. [Vite](https://vite.dev)):

```
npm install @webwriter/geogebra
```

```html
<link href="@webwriter/geogebra/widgets/webwriter-geogebra-notes.css" rel="stylesheet">
<script type="module" src="@webwriter/geogebra/widgets/webwriter-geogebra-notes.js"></script>
<webwriter-geogebra-notes></webwriter-geogebra-notes>
```

## Fields
| Name (Attribute Name) | Type | Description | Default | Reflects |
| :-------------------: | :--: | :---------: | :-----: | :------: |
| `type` (`type`) | `"classic" \| "geometry" \| "3d" \| "suite" \| "evaluator" \| "scientific" \| "notes"` | app name, default: "classic". "graphing" …​ GeoGebra Graphing Calculator "geometry" …​ GeoGebra Geometry "3d" …​ GeoGebra 3D Graphing Calculator "classic" …​ GeoGebra Classic "suite" …​ GeoGebra Calculator Suite "evaluator" …​ Equation Editor "scientific" …​Scientific Calculator "notes" …​ GeoGebra Notes | `"notes"` | ✓ |
| `showZoomButtons` (`showZoomButtons`) | `boolean` | States whether the zoom in / zoom out / home buttons should be shown in the Graphics View or not. Default: false | `true` | ✓ |
| `showFullscreenButton` (`showFullscreenButton`) | `boolean` | Whether fullscreen button should be visible | `true` | ✓ |
| `ggbStyles` (`ggbStyles`) | `string` | Custom CSS styles to apply to the GeoGebra applet. | - | ✗ |
| `width` (`width`) | `number` | Applet width | `800` | ✓ |
| `height` (`height`) | `number` | Applet height | `450` | ✓ |
| `src` (`src`) | `string` | Source of the GeoGebra file to load (base64-encoded string, material ID prefixed with "ggbid:", or file URL) | - | ✓ |
| `borderColor` (`borderColor`) | `string` | Color of the border line drawn around the applet panel (as hex rgb string). Default: gray | `"gray"` | ✓ |
| `borderRadius` (`borderRadius`) | `number` | Size of applet's border radius in pixels. | `1` | ✓ |
| `enableRightClick` (`enableRightClick`) | `boolean` | States whether right clicks should be handled by the applet. Setting this parameter to "false" disables context menus, properties dialogs and right-click-zooming. Default: true. NB also enables/disables some keyboard shortcuts eg Delete and Ctrl + R (recompute all objects). Default: true | `true` | ✓ |
| `enableLabelDrags` (`enableLabelDrags`) | `boolean` | States whether labels can be dragged. Default: true | `true` | ✓ |
| `enableShiftDragZoom` (`enableShiftDragZoom`) | `boolean` | States whether the Graphics View(s) should be moveable using Shift mouse drag (or. Ctrl + mouse drag) or zoomable using Shift + mouse wheel (or Ctrl + mouse wheel). Setting this parameter to "false" disables moving and zooming of the drawing pad. Default: true | `true` | ✓ |
| `errorDialogsActive` (`errorDialogsActive`) | `boolean` | States whether error dialogs will be shown if an invalid input is entered (using the Input Bar or JavaScript) Default: true | `true` | ✓ |
| `showMenuBar` (`showMenuBar`) | `boolean` | States whether the menubar of GeoGebra should be shown in the applet. Default: false | `false` | ✓ |
| `showToolBar` (`showToolBar`) | `boolean` | States whether the toolbar with the construction mode buttons should be shown in the applet. Default: false | `true` | ✓ |
| `showToolBarHelp` (`showToolBarHelp`) | `boolean` | States whether the toolbar help text right to the toolbar buttons should be shown in the applet | `false` | ✓ |
| `customToolBar` (`customToolBar`) | `string` | Sets the toolbar according to a custom toolbar string where the int values are Toolbar Mode Values, `,` adds a separator within a menu, `\|` starts a new menu and `\|\|` adds a separator in the toolbar before starting a new menu. This will override the saved toolbar from the .ggb file / base64 string. Custom tools are numbered 100 001, 100 002, etc | - | ✓ |
| `showAlgebraInput` (`showAlgebraInput`) | `boolean` | States whether the algebra input line (with input field, greek letters and command list) should be shown in the applet. Default: false | `true` | ✓ |
| `showResetIcon` (`showResetIcon`) | `boolean` | States whether a small icon (GeoGebra ellipse) should be shown in the upper right corner of the applet. Clicking on this icon resets the applet (i.e. it reloads the file given in the filename parameter). Default: false | `false` | ✓ |
| `language` (`language`) | `String` | ISO language string. GeoGebra tries to set your local language automatically (if it is available among the supported languages, of course). The default language for unsupported languages is English. If you want to specify a certain language manually, please use this parameter. | - | ✓ |
| `country` (`country`) | `String` | ISO country string. This parameter only makes sense if you use it together with the language parameter. | - | ✓ |
| `appletId` (`appletId`) | `String` | This parameter allows you to specify the argument passed to the JavaScript function ggbOnInit(), which is called once the applet is fully initialised. This is useful when you have multiple applets on a page. | - | ✓ |
| `allowStyleBar` (`allowStyleBar`) | `boolean` | Determines whether the Style Bar can be shown (or will be shown if just Graphics View 1 is showing). Default: false | `false` | ✓ |
| `randomize` (`randomize`) | `boolean` | Determines whether random numbers should be randomized on file load. Useful when you want the app to reload in exactly the same state it was saved. Default: true | `true` | ✓ |
| `randomSeed` (`randomSeed`) | `number` | Specify seed for random numbers. Note that if you save a state of the app after user interacted with it and try to reload that state with the same randomSeed, you may get a different result. Use randomize for those use-cases. | - | ✓ |
| `useBrowserForJs` (`useBrowserForJs`) | `boolean` | When true, GeoGebra: runs ggbOnInit from HTML, ignores ggbOnInit from file, and ignores JS update scripts of objects in file. When false, GeoGebra: ignores ggbOnInit from HTML (use appletOnLoad parameter of GGBApplet instead), runs ggbOnInit from file, and runs JS update scripts of objects in file. Default: false | `false` | ✓ |
| `showLogging` (`showLogging`) | `boolean` | Determines whether logging is shown in the Browser's console. Default: false | `false` | ✓ |
| `capturingThreshold` (`capturingThreshold`) | `number` | Determines the sensitivity of object selection. The default value of 3 is usually fine to select and drag objects both with the mouse and touch. Use larger values (e.g. 4 or 5) to make it easier to select and drag objects. Default: 3 | `3` | ✓ |
| `enableFileFeatures` (`enableFileFeatures`) | `boolean` | Determines whether file saving, file loading, sign in and Options > Save settings are enabled. This argument is ignored when menubar is not showing. Default: true | `true` | ✓ |
| `enableUndoRedo` (`enableUndoRedo`) | `boolean` | Determines whether Undo and Redo icons are shown. This argument is ignored when toolbar is not showing. Default: true | `true` | ✓ |
| `perspective` (`perspective`) | `String` | For values see SetPerspective_Command in the GeoGebra Manual. Just for a blank start ie shouldn't be used with material_id, filename or ggbBase64 parameters | - | ✓ |
| `enable3d` (`enable3d`) | `boolean` | Whether 3D should be enabled (for exam mode). | - | ✓ |
| `enableCAS` (`enableCAS`) | `boolean` | Whether CAS should be enabled (for exam mode). | - | ✓ |
| `algebraInputPosition` (`algebraInputPosition`) | `"algebra" \| "top" \| "bottom"` | Determines whether input bar should be shown in algebra, on top of the applet or under the applet. When left empty (default), the position depends on file. | - | ✓ |
| `preventFocus` (`preventFocus`) | `boolean` | When set to true, this prevents the applet from getting focus automatically at the start. Default: false | `false` | ✓ |
| `scaleContainerClass` (`scaleContainerClass`) | `string` | Name of CSS class that is used as container; applet will scale to fit into the container. | - | ✓ |
| `autoHeight` (`autoHeight`) | `boolean` | `true` to restrict the width of the applet and compute height automatically, add autoHeight: true. `false` if you want the applet to be restricted by both width and height of the container | `true` | ✓ |
| `allowUpscale` (`allowUpscale`) | `boolean` | Determines whether automatic scaling may scale the applet up. Default: false | `false` | ✓ |
| `playButton` (`playButton`) | `boolean` | Determines whether a preview image and a play button should be rendered in place of the applet. Pushing the play button initializes the applet. Default: false | `false` | ✓ |
| `scale` (`scale`) | `number` | Ratio by which the applet should be scaled (eg. 2 makes the applet 2 times bigger, including all texts and UI elements). Default: 1 | `1` | ✓ |
| `showAnimationButton` (`showAnimationButton`) | `boolean` | Whether animation button should be visible | `false` | ✓ |
| `showSuggestionButtons` (`showSuggestionButtons`) | `boolean` | Whether suggestion buttons (special points, solve) in Algebra View should be visible | `false` | ✓ |
| `showStartTooltip` (`showStartTooltip`) | `boolean` | Whether "Welcome" tooltip should be shown | `false` | ✓ |
| `rounding` (`rounding`) | `string` | String composed of number of decimal places and flags — valid flags are "s" for significant digits and "r" for rational numbers. Hence "10" means 10 decimal places, "10s" stands for 10 significant digits. | - | ✓ |
| `buttonShadows` (`buttonShadows`) | `boolean` | Whether buttons should have shadow | `false` | ✓ |
| `buttonRounding` (`buttonRounding`) | `Number` | Relative radius of button's rounded border. The border radius in pixels is buttonRounding * height /2, where height is the height of the button. Default: 0.2 | `0.2` | ✓ |
| `buttonBorderColor` (`buttonBorderColor`) | `string` | Border color of buttons on the graphics view. Default is black, if the button background is white, otherwise one shade darker than the background color | - | ✓ |
| `editorBackgroundColor` (`editorBackgroundColor`) | `string` | Background color of the evaluator app | - | ✓ |
| `editorForegroundColor` (`editorForegroundColor`) | `string` | Foreground (text) color of the equation editor (appname = "evaluator") | - | ✓ |
| `textmode` (`textmode`) | `boolean` | Whether editor is in text mode or not (appname = "evaluator"). Default: false | `false` | ✓ |
| `showKeyboardOnFocus` (`showKeyboardOnFocus`) | `boolean` | Whether to show keyboard when input is focused. When set to true, keyboard is always shown, for false it never appears, for auto it's shown unless closed by user. Default: true in evaluator app, auto in other apps | - | ✓ |
| `keyboardType` (`keyboardType`) | `"scientific" \| "normal" \| "notes"` | Which keyboard is shown for equation editor (appname = "evaluator") | - | ✓ |
| `transparentGraphics` (`transparentGraphics`) | `boolean` | Whether the Graphics View and Graphics View 2 should be transparent | `false` | ✓ |
| `disabledJavaScript` (`disabledJavaScript`) | `boolean` | Whether running JavaScript from material files is disabled or not. | `false` | ✓ |
| `detachedKeyboardParent` (`detachedKeyboardParent`) | `string` | When set, the keyboard should be attached to the first element in DOM that fits the selector. | - | ✓ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Events
| Name | Description |
| :--: | :---------: |
| focus | Fired when the GeoGebra applet gains focus. |
| ggb-load | Fired when the GeoGebra API is ready. The event detail contains the API instance. |

*[Events](https://developer.mozilla.org/en-US/docs/Web/Events) are dispatched by the widget after certain triggers.*

## Editing config
| Name | Value |
| :--: | :---------: |
| `content` | `text*` |

*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public methods, slots, custom CSS properties, or CSS parts.*


## `WebwriterGeogebraScientific` (`<webwriter-geogebra-scientific>`)
A GeoGebra Scientific Calculator widget.

### Usage

Use with a CDN (e.g. [jsdelivr](https://jsdelivr.com)):
```html
<link href="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra-scientific.css" rel="stylesheet">
<script type="module" src="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra-scientific.js"></script>
<webwriter-geogebra-scientific></webwriter-geogebra-scientific>
```

Or use with a bundler (e.g. [Vite](https://vite.dev)):

```
npm install @webwriter/geogebra
```

```html
<link href="@webwriter/geogebra/widgets/webwriter-geogebra-scientific.css" rel="stylesheet">
<script type="module" src="@webwriter/geogebra/widgets/webwriter-geogebra-scientific.js"></script>
<webwriter-geogebra-scientific></webwriter-geogebra-scientific>
```

## Fields
| Name (Attribute Name) | Type | Description | Default | Reflects |
| :-------------------: | :--: | :---------: | :-----: | :------: |
| `type` (`type`) | `"classic" \| "geometry" \| "3d" \| "suite" \| "evaluator" \| "scientific" \| "notes"` | app name, default: "classic". "graphing" …​ GeoGebra Graphing Calculator "geometry" …​ GeoGebra Geometry "3d" …​ GeoGebra 3D Graphing Calculator "classic" …​ GeoGebra Classic "suite" …​ GeoGebra Calculator Suite "evaluator" …​ Equation Editor "scientific" …​Scientific Calculator "notes" …​ GeoGebra Notes | `"scientific"` | ✓ |
| `showZoomButtons` (`showZoomButtons`) | `boolean` | States whether the zoom in / zoom out / home buttons should be shown in the Graphics View or not. Default: false | `true` | ✓ |
| `showFullscreenButton` (`showFullscreenButton`) | `boolean` | Whether fullscreen button should be visible | `true` | ✓ |
| `ggbStyles` (`ggbStyles`) | `string` | Custom CSS styles to apply to the GeoGebra applet. | - | ✗ |
| `width` (`width`) | `number` | Applet width | `800` | ✓ |
| `height` (`height`) | `number` | Applet height | `450` | ✓ |
| `src` (`src`) | `string` | Source of the GeoGebra file to load (base64-encoded string, material ID prefixed with "ggbid:", or file URL) | - | ✓ |
| `borderColor` (`borderColor`) | `string` | Color of the border line drawn around the applet panel (as hex rgb string). Default: gray | `"gray"` | ✓ |
| `borderRadius` (`borderRadius`) | `number` | Size of applet's border radius in pixels. | `1` | ✓ |
| `enableRightClick` (`enableRightClick`) | `boolean` | States whether right clicks should be handled by the applet. Setting this parameter to "false" disables context menus, properties dialogs and right-click-zooming. Default: true. NB also enables/disables some keyboard shortcuts eg Delete and Ctrl + R (recompute all objects). Default: true | `true` | ✓ |
| `enableLabelDrags` (`enableLabelDrags`) | `boolean` | States whether labels can be dragged. Default: true | `true` | ✓ |
| `enableShiftDragZoom` (`enableShiftDragZoom`) | `boolean` | States whether the Graphics View(s) should be moveable using Shift mouse drag (or. Ctrl + mouse drag) or zoomable using Shift + mouse wheel (or Ctrl + mouse wheel). Setting this parameter to "false" disables moving and zooming of the drawing pad. Default: true | `true` | ✓ |
| `errorDialogsActive` (`errorDialogsActive`) | `boolean` | States whether error dialogs will be shown if an invalid input is entered (using the Input Bar or JavaScript) Default: true | `true` | ✓ |
| `showMenuBar` (`showMenuBar`) | `boolean` | States whether the menubar of GeoGebra should be shown in the applet. Default: false | `false` | ✓ |
| `showToolBar` (`showToolBar`) | `boolean` | States whether the toolbar with the construction mode buttons should be shown in the applet. Default: false | `true` | ✓ |
| `showToolBarHelp` (`showToolBarHelp`) | `boolean` | States whether the toolbar help text right to the toolbar buttons should be shown in the applet | `false` | ✓ |
| `customToolBar` (`customToolBar`) | `string` | Sets the toolbar according to a custom toolbar string where the int values are Toolbar Mode Values, `,` adds a separator within a menu, `\|` starts a new menu and `\|\|` adds a separator in the toolbar before starting a new menu. This will override the saved toolbar from the .ggb file / base64 string. Custom tools are numbered 100 001, 100 002, etc | - | ✓ |
| `showAlgebraInput` (`showAlgebraInput`) | `boolean` | States whether the algebra input line (with input field, greek letters and command list) should be shown in the applet. Default: false | `true` | ✓ |
| `showResetIcon` (`showResetIcon`) | `boolean` | States whether a small icon (GeoGebra ellipse) should be shown in the upper right corner of the applet. Clicking on this icon resets the applet (i.e. it reloads the file given in the filename parameter). Default: false | `false` | ✓ |
| `language` (`language`) | `String` | ISO language string. GeoGebra tries to set your local language automatically (if it is available among the supported languages, of course). The default language for unsupported languages is English. If you want to specify a certain language manually, please use this parameter. | - | ✓ |
| `country` (`country`) | `String` | ISO country string. This parameter only makes sense if you use it together with the language parameter. | - | ✓ |
| `appletId` (`appletId`) | `String` | This parameter allows you to specify the argument passed to the JavaScript function ggbOnInit(), which is called once the applet is fully initialised. This is useful when you have multiple applets on a page. | - | ✓ |
| `allowStyleBar` (`allowStyleBar`) | `boolean` | Determines whether the Style Bar can be shown (or will be shown if just Graphics View 1 is showing). Default: false | `false` | ✓ |
| `randomize` (`randomize`) | `boolean` | Determines whether random numbers should be randomized on file load. Useful when you want the app to reload in exactly the same state it was saved. Default: true | `true` | ✓ |
| `randomSeed` (`randomSeed`) | `number` | Specify seed for random numbers. Note that if you save a state of the app after user interacted with it and try to reload that state with the same randomSeed, you may get a different result. Use randomize for those use-cases. | - | ✓ |
| `useBrowserForJs` (`useBrowserForJs`) | `boolean` | When true, GeoGebra: runs ggbOnInit from HTML, ignores ggbOnInit from file, and ignores JS update scripts of objects in file. When false, GeoGebra: ignores ggbOnInit from HTML (use appletOnLoad parameter of GGBApplet instead), runs ggbOnInit from file, and runs JS update scripts of objects in file. Default: false | `false` | ✓ |
| `showLogging` (`showLogging`) | `boolean` | Determines whether logging is shown in the Browser's console. Default: false | `false` | ✓ |
| `capturingThreshold` (`capturingThreshold`) | `number` | Determines the sensitivity of object selection. The default value of 3 is usually fine to select and drag objects both with the mouse and touch. Use larger values (e.g. 4 or 5) to make it easier to select and drag objects. Default: 3 | `3` | ✓ |
| `enableFileFeatures` (`enableFileFeatures`) | `boolean` | Determines whether file saving, file loading, sign in and Options > Save settings are enabled. This argument is ignored when menubar is not showing. Default: true | `true` | ✓ |
| `enableUndoRedo` (`enableUndoRedo`) | `boolean` | Determines whether Undo and Redo icons are shown. This argument is ignored when toolbar is not showing. Default: true | `true` | ✓ |
| `perspective` (`perspective`) | `String` | For values see SetPerspective_Command in the GeoGebra Manual. Just for a blank start ie shouldn't be used with material_id, filename or ggbBase64 parameters | - | ✓ |
| `enable3d` (`enable3d`) | `boolean` | Whether 3D should be enabled (for exam mode). | - | ✓ |
| `enableCAS` (`enableCAS`) | `boolean` | Whether CAS should be enabled (for exam mode). | - | ✓ |
| `algebraInputPosition` (`algebraInputPosition`) | `"algebra" \| "top" \| "bottom"` | Determines whether input bar should be shown in algebra, on top of the applet or under the applet. When left empty (default), the position depends on file. | - | ✓ |
| `preventFocus` (`preventFocus`) | `boolean` | When set to true, this prevents the applet from getting focus automatically at the start. Default: false | `false` | ✓ |
| `scaleContainerClass` (`scaleContainerClass`) | `string` | Name of CSS class that is used as container; applet will scale to fit into the container. | - | ✓ |
| `autoHeight` (`autoHeight`) | `boolean` | `true` to restrict the width of the applet and compute height automatically, add autoHeight: true. `false` if you want the applet to be restricted by both width and height of the container | `true` | ✓ |
| `allowUpscale` (`allowUpscale`) | `boolean` | Determines whether automatic scaling may scale the applet up. Default: false | `false` | ✓ |
| `playButton` (`playButton`) | `boolean` | Determines whether a preview image and a play button should be rendered in place of the applet. Pushing the play button initializes the applet. Default: false | `false` | ✓ |
| `scale` (`scale`) | `number` | Ratio by which the applet should be scaled (eg. 2 makes the applet 2 times bigger, including all texts and UI elements). Default: 1 | `1` | ✓ |
| `showAnimationButton` (`showAnimationButton`) | `boolean` | Whether animation button should be visible | `false` | ✓ |
| `showSuggestionButtons` (`showSuggestionButtons`) | `boolean` | Whether suggestion buttons (special points, solve) in Algebra View should be visible | `false` | ✓ |
| `showStartTooltip` (`showStartTooltip`) | `boolean` | Whether "Welcome" tooltip should be shown | `false` | ✓ |
| `rounding` (`rounding`) | `string` | String composed of number of decimal places and flags — valid flags are "s" for significant digits and "r" for rational numbers. Hence "10" means 10 decimal places, "10s" stands for 10 significant digits. | - | ✓ |
| `buttonShadows` (`buttonShadows`) | `boolean` | Whether buttons should have shadow | `false` | ✓ |
| `buttonRounding` (`buttonRounding`) | `Number` | Relative radius of button's rounded border. The border radius in pixels is buttonRounding * height /2, where height is the height of the button. Default: 0.2 | `0.2` | ✓ |
| `buttonBorderColor` (`buttonBorderColor`) | `string` | Border color of buttons on the graphics view. Default is black, if the button background is white, otherwise one shade darker than the background color | - | ✓ |
| `editorBackgroundColor` (`editorBackgroundColor`) | `string` | Background color of the evaluator app | - | ✓ |
| `editorForegroundColor` (`editorForegroundColor`) | `string` | Foreground (text) color of the equation editor (appname = "evaluator") | - | ✓ |
| `textmode` (`textmode`) | `boolean` | Whether editor is in text mode or not (appname = "evaluator"). Default: false | `false` | ✓ |
| `showKeyboardOnFocus` (`showKeyboardOnFocus`) | `boolean` | Whether to show keyboard when input is focused. When set to true, keyboard is always shown, for false it never appears, for auto it's shown unless closed by user. Default: true in evaluator app, auto in other apps | - | ✓ |
| `keyboardType` (`keyboardType`) | `"scientific" \| "normal" \| "notes"` | Which keyboard is shown for equation editor (appname = "evaluator") | - | ✓ |
| `transparentGraphics` (`transparentGraphics`) | `boolean` | Whether the Graphics View and Graphics View 2 should be transparent | `false` | ✓ |
| `disabledJavaScript` (`disabledJavaScript`) | `boolean` | Whether running JavaScript from material files is disabled or not. | `false` | ✓ |
| `detachedKeyboardParent` (`detachedKeyboardParent`) | `string` | When set, the keyboard should be attached to the first element in DOM that fits the selector. | - | ✓ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Events
| Name | Description |
| :--: | :---------: |
| focus | Fired when the GeoGebra applet gains focus. |
| ggb-load | Fired when the GeoGebra API is ready. The event detail contains the API instance. |

*[Events](https://developer.mozilla.org/en-US/docs/Web/Events) are dispatched by the widget after certain triggers.*

## Editing config
| Name | Value |
| :--: | :---------: |
| `content` | `text*` |

*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public methods, slots, custom CSS properties, or CSS parts.*


## `WebwriterGeogebraClassic` (`<webwriter-geogebra-classic>`)
A GeoGebra Classic widget.

### Usage

Use with a CDN (e.g. [jsdelivr](https://jsdelivr.com)):
```html
<link href="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra-classic.css" rel="stylesheet">
<script type="module" src="https://cdn.jsdelivr.net/npm/@webwriter/geogebra/widgets/webwriter-geogebra-classic.js"></script>
<webwriter-geogebra-classic></webwriter-geogebra-classic>
```

Or use with a bundler (e.g. [Vite](https://vite.dev)):

```
npm install @webwriter/geogebra
```

```html
<link href="@webwriter/geogebra/widgets/webwriter-geogebra-classic.css" rel="stylesheet">
<script type="module" src="@webwriter/geogebra/widgets/webwriter-geogebra-classic.js"></script>
<webwriter-geogebra-classic></webwriter-geogebra-classic>
```

## Fields
| Name (Attribute Name) | Type | Description | Default | Reflects |
| :-------------------: | :--: | :---------: | :-----: | :------: |
| `type` (`type`) | `"classic" \| "geometry" \| "3d" \| "suite" \| "evaluator" \| "scientific" \| "notes"` | app name, default: "classic". "graphing" …​ GeoGebra Graphing Calculator "geometry" …​ GeoGebra Geometry "3d" …​ GeoGebra 3D Graphing Calculator "classic" …​ GeoGebra Classic "suite" …​ GeoGebra Calculator Suite "evaluator" …​ Equation Editor "scientific" …​Scientific Calculator "notes" …​ GeoGebra Notes | `"classic"` | ✓ |
| `showZoomButtons` (`showZoomButtons`) | `boolean` | States whether the zoom in / zoom out / home buttons should be shown in the Graphics View or not. Default: false | `true` | ✓ |
| `showFullscreenButton` (`showFullscreenButton`) | `boolean` | Whether fullscreen button should be visible | `true` | ✓ |
| `ggbStyles` (`ggbStyles`) | `string` | Custom CSS styles to apply to the GeoGebra applet. | - | ✗ |
| `width` (`width`) | `number` | Applet width | `800` | ✓ |
| `height` (`height`) | `number` | Applet height | `450` | ✓ |
| `src` (`src`) | `string` | Source of the GeoGebra file to load (base64-encoded string, material ID prefixed with "ggbid:", or file URL) | - | ✓ |
| `borderColor` (`borderColor`) | `string` | Color of the border line drawn around the applet panel (as hex rgb string). Default: gray | `"gray"` | ✓ |
| `borderRadius` (`borderRadius`) | `number` | Size of applet's border radius in pixels. | `1` | ✓ |
| `enableRightClick` (`enableRightClick`) | `boolean` | States whether right clicks should be handled by the applet. Setting this parameter to "false" disables context menus, properties dialogs and right-click-zooming. Default: true. NB also enables/disables some keyboard shortcuts eg Delete and Ctrl + R (recompute all objects). Default: true | `true` | ✓ |
| `enableLabelDrags` (`enableLabelDrags`) | `boolean` | States whether labels can be dragged. Default: true | `true` | ✓ |
| `enableShiftDragZoom` (`enableShiftDragZoom`) | `boolean` | States whether the Graphics View(s) should be moveable using Shift mouse drag (or. Ctrl + mouse drag) or zoomable using Shift + mouse wheel (or Ctrl + mouse wheel). Setting this parameter to "false" disables moving and zooming of the drawing pad. Default: true | `true` | ✓ |
| `errorDialogsActive` (`errorDialogsActive`) | `boolean` | States whether error dialogs will be shown if an invalid input is entered (using the Input Bar or JavaScript) Default: true | `true` | ✓ |
| `showMenuBar` (`showMenuBar`) | `boolean` | States whether the menubar of GeoGebra should be shown in the applet. Default: false | `false` | ✓ |
| `showToolBar` (`showToolBar`) | `boolean` | States whether the toolbar with the construction mode buttons should be shown in the applet. Default: false | `true` | ✓ |
| `showToolBarHelp` (`showToolBarHelp`) | `boolean` | States whether the toolbar help text right to the toolbar buttons should be shown in the applet | `false` | ✓ |
| `customToolBar` (`customToolBar`) | `string` | Sets the toolbar according to a custom toolbar string where the int values are Toolbar Mode Values, `,` adds a separator within a menu, `\|` starts a new menu and `\|\|` adds a separator in the toolbar before starting a new menu. This will override the saved toolbar from the .ggb file / base64 string. Custom tools are numbered 100 001, 100 002, etc | - | ✓ |
| `showAlgebraInput` (`showAlgebraInput`) | `boolean` | States whether the algebra input line (with input field, greek letters and command list) should be shown in the applet. Default: false | `true` | ✓ |
| `showResetIcon` (`showResetIcon`) | `boolean` | States whether a small icon (GeoGebra ellipse) should be shown in the upper right corner of the applet. Clicking on this icon resets the applet (i.e. it reloads the file given in the filename parameter). Default: false | `false` | ✓ |
| `language` (`language`) | `String` | ISO language string. GeoGebra tries to set your local language automatically (if it is available among the supported languages, of course). The default language for unsupported languages is English. If you want to specify a certain language manually, please use this parameter. | - | ✓ |
| `country` (`country`) | `String` | ISO country string. This parameter only makes sense if you use it together with the language parameter. | - | ✓ |
| `appletId` (`appletId`) | `String` | This parameter allows you to specify the argument passed to the JavaScript function ggbOnInit(), which is called once the applet is fully initialised. This is useful when you have multiple applets on a page. | - | ✓ |
| `allowStyleBar` (`allowStyleBar`) | `boolean` | Determines whether the Style Bar can be shown (or will be shown if just Graphics View 1 is showing). Default: false | `false` | ✓ |
| `randomize` (`randomize`) | `boolean` | Determines whether random numbers should be randomized on file load. Useful when you want the app to reload in exactly the same state it was saved. Default: true | `true` | ✓ |
| `randomSeed` (`randomSeed`) | `number` | Specify seed for random numbers. Note that if you save a state of the app after user interacted with it and try to reload that state with the same randomSeed, you may get a different result. Use randomize for those use-cases. | - | ✓ |
| `useBrowserForJs` (`useBrowserForJs`) | `boolean` | When true, GeoGebra: runs ggbOnInit from HTML, ignores ggbOnInit from file, and ignores JS update scripts of objects in file. When false, GeoGebra: ignores ggbOnInit from HTML (use appletOnLoad parameter of GGBApplet instead), runs ggbOnInit from file, and runs JS update scripts of objects in file. Default: false | `false` | ✓ |
| `showLogging` (`showLogging`) | `boolean` | Determines whether logging is shown in the Browser's console. Default: false | `false` | ✓ |
| `capturingThreshold` (`capturingThreshold`) | `number` | Determines the sensitivity of object selection. The default value of 3 is usually fine to select and drag objects both with the mouse and touch. Use larger values (e.g. 4 or 5) to make it easier to select and drag objects. Default: 3 | `3` | ✓ |
| `enableFileFeatures` (`enableFileFeatures`) | `boolean` | Determines whether file saving, file loading, sign in and Options > Save settings are enabled. This argument is ignored when menubar is not showing. Default: true | `true` | ✓ |
| `enableUndoRedo` (`enableUndoRedo`) | `boolean` | Determines whether Undo and Redo icons are shown. This argument is ignored when toolbar is not showing. Default: true | `true` | ✓ |
| `perspective` (`perspective`) | `String` | For values see SetPerspective_Command in the GeoGebra Manual. Just for a blank start ie shouldn't be used with material_id, filename or ggbBase64 parameters | - | ✓ |
| `enable3d` (`enable3d`) | `boolean` | Whether 3D should be enabled (for exam mode). | - | ✓ |
| `enableCAS` (`enableCAS`) | `boolean` | Whether CAS should be enabled (for exam mode). | - | ✓ |
| `algebraInputPosition` (`algebraInputPosition`) | `"algebra" \| "top" \| "bottom"` | Determines whether input bar should be shown in algebra, on top of the applet or under the applet. When left empty (default), the position depends on file. | - | ✓ |
| `preventFocus` (`preventFocus`) | `boolean` | When set to true, this prevents the applet from getting focus automatically at the start. Default: false | `false` | ✓ |
| `scaleContainerClass` (`scaleContainerClass`) | `string` | Name of CSS class that is used as container; applet will scale to fit into the container. | - | ✓ |
| `autoHeight` (`autoHeight`) | `boolean` | `true` to restrict the width of the applet and compute height automatically, add autoHeight: true. `false` if you want the applet to be restricted by both width and height of the container | `true` | ✓ |
| `allowUpscale` (`allowUpscale`) | `boolean` | Determines whether automatic scaling may scale the applet up. Default: false | `false` | ✓ |
| `playButton` (`playButton`) | `boolean` | Determines whether a preview image and a play button should be rendered in place of the applet. Pushing the play button initializes the applet. Default: false | `false` | ✓ |
| `scale` (`scale`) | `number` | Ratio by which the applet should be scaled (eg. 2 makes the applet 2 times bigger, including all texts and UI elements). Default: 1 | `1` | ✓ |
| `showAnimationButton` (`showAnimationButton`) | `boolean` | Whether animation button should be visible | `false` | ✓ |
| `showSuggestionButtons` (`showSuggestionButtons`) | `boolean` | Whether suggestion buttons (special points, solve) in Algebra View should be visible | `false` | ✓ |
| `showStartTooltip` (`showStartTooltip`) | `boolean` | Whether "Welcome" tooltip should be shown | `false` | ✓ |
| `rounding` (`rounding`) | `string` | String composed of number of decimal places and flags — valid flags are "s" for significant digits and "r" for rational numbers. Hence "10" means 10 decimal places, "10s" stands for 10 significant digits. | - | ✓ |
| `buttonShadows` (`buttonShadows`) | `boolean` | Whether buttons should have shadow | `false` | ✓ |
| `buttonRounding` (`buttonRounding`) | `Number` | Relative radius of button's rounded border. The border radius in pixels is buttonRounding * height /2, where height is the height of the button. Default: 0.2 | `0.2` | ✓ |
| `buttonBorderColor` (`buttonBorderColor`) | `string` | Border color of buttons on the graphics view. Default is black, if the button background is white, otherwise one shade darker than the background color | - | ✓ |
| `editorBackgroundColor` (`editorBackgroundColor`) | `string` | Background color of the evaluator app | - | ✓ |
| `editorForegroundColor` (`editorForegroundColor`) | `string` | Foreground (text) color of the equation editor (appname = "evaluator") | - | ✓ |
| `textmode` (`textmode`) | `boolean` | Whether editor is in text mode or not (appname = "evaluator"). Default: false | `false` | ✓ |
| `showKeyboardOnFocus` (`showKeyboardOnFocus`) | `boolean` | Whether to show keyboard when input is focused. When set to true, keyboard is always shown, for false it never appears, for auto it's shown unless closed by user. Default: true in evaluator app, auto in other apps | - | ✓ |
| `keyboardType` (`keyboardType`) | `"scientific" \| "normal" \| "notes"` | Which keyboard is shown for equation editor (appname = "evaluator") | - | ✓ |
| `transparentGraphics` (`transparentGraphics`) | `boolean` | Whether the Graphics View and Graphics View 2 should be transparent | `false` | ✓ |
| `disabledJavaScript` (`disabledJavaScript`) | `boolean` | Whether running JavaScript from material files is disabled or not. | `false` | ✓ |
| `detachedKeyboardParent` (`detachedKeyboardParent`) | `string` | When set, the keyboard should be attached to the first element in DOM that fits the selector. | - | ✓ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Events
| Name | Description |
| :--: | :---------: |
| focus | Fired when the GeoGebra applet gains focus. |
| ggb-load | Fired when the GeoGebra API is ready. The event detail contains the API instance. |

*[Events](https://developer.mozilla.org/en-US/docs/Web/Events) are dispatched by the widget after certain triggers.*

## Editing config
| Name | Value |
| :--: | :---------: |
| `content` | `text*` |

*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public methods, slots, custom CSS properties, or CSS parts.*


---
*Generated with @webwriter/build@1.9.0*