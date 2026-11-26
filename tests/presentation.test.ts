/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import "../src/widgets/webwriter-geogebra-classic";
import { SRC_A, dataBlock, mountIn, unmountAll, until, wait } from "./helpers";

mocha.setup(getMochaConfig());

describe("presentation", function () {
  afterEach(unmountAll);

  it("takes font and color from the theme and keeps the host size limits", async function () {
    const widget = await mountIn(
      `<div style="--ww-text-color: rgb(1, 2, 3); --ww-font-family: Georgia"><webwriter-geogebra-classic></webwriter-geogebra-classic></div>`,
      "webwriter-geogebra-classic",
    );
    const host = getComputedStyle(widget);
    assert.equal(host.color, "rgb(1, 2, 3)");
    assert.include(host.fontFamily, "Georgia");
    assert.equal(host.display, "block");
    assert.equal(host.minWidth, "300px");
    assert.equal(host.maxWidth, "2100px");
  });

  it("exposes the applet as a named, labelled part", async function () {
    const widget = await mountIn(`<webwriter-geogebra-classic></webwriter-geogebra-classic>`, "webwriter-geogebra-classic");
    const frame = widget.shadowRoot.querySelector("iframe");
    assert.equal(frame.getAttribute("part"), "applet");
    assert.ok(frame.title);
  });

  it("keeps its runtime state out of the authored attributes and focuses the applet", async function () {
    const widget = await mountIn(`<webwriter-geogebra-classic></webwriter-geogebra-classic>`, "webwriter-geogebra-classic");
    widget.focus();
    assert.equal(widget.shadowRoot.activeElement, widget.shadowRoot.querySelector("iframe"));
    assert.deepEqual([...widget.attributes].map((attribute: Attr) => attribute.name).filter((name: string) => name.startsWith("data-")), []);
  });
  const fakeApi = (calls: number[][]) => new Proxy({setSize: (width: number, height: number) => calls.push([width, height])} as Record<string, unknown>, {
    get: (target, key: string) => key in target ? target[key] : () => undefined,
  });
  const connect = (widget: any, api: unknown) => widget.dispatchEvent(new CustomEvent("ggb-load", {detail: {api}}));

  it("keeps the applet mounted when a construction edit is saved", async function () {
    const widget = await mountIn(`<webwriter-geogebra-classic></webwriter-geogebra-classic>`, "webwriter-geogebra-classic");
    const frame = widget.shadowRoot.querySelector("iframe");
    let constructionEdited: (() => void) | undefined;
    const api = Object.assign(fakeApi([]), {
      registerUpdateListener: (callback: () => void) => { constructionEdited = callback; },
      getBase64: () => SRC_A.split(",")[1],
      setBase64: () => assert.fail("the saved construction is already loaded"),
    });
    connect(widget, api);

    constructionEdited!();
    assert.isTrue(await until(() => JSON.parse(dataBlock(widget)?.textContent ?? "{}").src === SRC_A));
    await widget.updateComplete;
    assert.strictEqual(widget.shadowRoot.querySelector("iframe"), frame);
    assert.isTrue(widget.shadowRoot.querySelector(".applet").hasAttribute("data-ready"));
  });

  it("updates live options and rebuilds for initialization settings", async function () {
    const widget = await mountIn(`<webwriter-geogebra-classic></webwriter-geogebra-classic>`, "webwriter-geogebra-classic");
    const frame = widget.shadowRoot.querySelector("iframe");
    const toolbarChanges: boolean[] = [];
    connect(widget, Object.assign(fakeApi([]), {
      showToolBar: (visible: boolean) => toolbarChanges.push(visible),
    }));
    widget.showToolBar = false;
    await widget.updateComplete;

    assert.deepEqual(toolbarChanges, [false]);
    assert.strictEqual(widget.shadowRoot.querySelector("iframe"), frame);
    widget.showMenuBar = true;
    assert.isTrue(await until(() => widget.shadowRoot.querySelector("iframe") !== frame));
  });

  it("sizes the applet to the container at 300 and 2100 px", async function () {
    this.timeout(15000);
    const widget = await mountIn(`<div style="width: 300px"><webwriter-geogebra-classic></webwriter-geogebra-classic></div>`, "webwriter-geogebra-classic");
    const calls: number[][] = [];
    connect(widget, fakeApi(calls));
    assert.isTrue(await until(() => calls.length > 0, 3000));
    assert.equal(calls.at(-1)![0], 300);
    assert.isAtLeast(calls.at(-1)![1], 288);
    (widget.parentElement as HTMLElement).style.width = "2100px";
    assert.isTrue(await until(() => calls.at(-1)![0] === 2100, 3000));
    assert.isAtLeast(calls.at(-1)![1], 1100);
    const count = calls.length;
    await wait(300);
    assert.equal(calls.length, count, "no further resize without a size change");
  });

  it("shows the print note only when no applet is loaded, and only on paper", async function () {
    const widget = await mountIn(`<webwriter-geogebra-classic></webwriter-geogebra-classic>`, "webwriter-geogebra-classic");
    const applet = widget.shadowRoot.querySelector(".applet");
    const note = widget.shadowRoot.querySelector(".print-note");
    assert.isFalse(applet.hasAttribute("data-ready"));
    assert.equal(getComputedStyle(note).display, "none");
    const frame = widget.shadowRoot.querySelector("iframe");
    connect(widget, fakeApi([]));
    await widget.updateComplete;
    await wait(200);
    assert.isTrue(applet.hasAttribute("data-ready"), "loading the applet must not trigger a reload");
    assert.strictEqual(widget.shadowRoot.querySelector("iframe"), frame);
    const rules = widget.shadowRoot.adoptedStyleSheets.flatMap((sheet: CSSStyleSheet) => [...sheet.cssRules]).filter((rule: CSSRule) => rule instanceof CSSMediaRule && rule.media.mediaText === "print");
    const text = rules.map((rule: CSSMediaRule) => rule.cssText).join("\n");
    assert.include(text, ".applet:not([data-ready]) .print-note");
    assert.include(text, ".applet:not([data-ready]) iframe");
    assert.include(text, "break-inside: avoid");
  });
});

mocha.run();
