/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import "../src/widgets/webwriter-geogebra";
import "../src/widgets/webwriter-geogebra-geometry";
import { until, mount, mountIn, unmountAll } from "./helpers";

mocha.setup(getMochaConfig());

describe("language and declarations", function () {
  afterEach(unmountAll);

  it("lang on an ancestor selects the catalog and the drawer text", async function () {
    const widget = await mountIn(`<div lang="de"><webwriter-geogebra></webwriter-geogebra></div>`, "webwriter-geogebra");
    await widget.updateComplete;
    let changed = 0;
    widget.addEventListener("optionschange", () => changed++, true);
    assert.isTrue(await until(() => widget.localize.getLocale() === "de"), `locale ${widget.localize.getLocale()}`);
    assert.isTrue(await until(() => widget.options.enableRightClick.label._ !== "Enable right click"), "label stays English");
    const german = widget.options.enableRightClick.label._;
    widget.parentElement.setAttribute("lang", "fr");
    assert.isTrue(await until(() => widget.localize.getLocale() === "fr"), "locale fr");
    assert.isTrue(await until(() => widget.options.enableRightClick.label._ !== german), "label did not change with the language");
    assert.isAbove(changed, 0, "optionschange was not sent");
    assert.isFalse(widget.hasAttribute("lang"), "an inherited language must not be written to the widget");
  });

  it("the applet language follows the tag and a bad tag falls back", async function () {
    const widget = await mountIn(`<div lang="de-AT"><webwriter-geogebra-geometry></webwriter-geogebra-geometry></div>`, "webwriter-geogebra-geometry");
    await widget.updateComplete;
    assert.equal(widget.ggbProperties.language, "de");
    assert.equal(widget.ggbProperties.country, "AT");
    widget.parentElement.setAttribute("lang", "not a tag");
    await widget.updateComplete;
    assert.equal(widget.ggbProperties.language, "en");
    assert.equal(widget.localize.getLocale(), "en");
  });

  it("still declares the options and actions", async function () {
    const el = await mount(`<webwriter-geogebra></webwriter-geogebra>`);
    assert.equal(el.options.type.control, "select");
    assert.equal(el.options.enableRightClick.type, Boolean);
    assert.isOk(el.options.showToolBar);
    assert.equal(el.actions.importConstruction.input.accept, ".ggb");
  });
});

mocha.run();
