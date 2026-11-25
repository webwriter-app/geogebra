/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import "../src/widgets/webwriter-geogebra-classic";
import { mountIn, unmountAll, SRC_A, SRC_B } from "./helpers";
import { bytesToBase64, base64ToBytes, isGgbArchive } from "../src/model/ggb-file";

mocha.setup(getMochaConfig());

const TAG = "webwriter-geogebra-classic";
const zip = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 1, 2, 3, 4]);
const ggbFile = (bytes: Uint8Array, name = "valid.ggb") => new File([bytes as BlobPart], name, {type: ""});

describe("conversions", function () {
  afterEach(unmountAll);

  it("declares the same file keys in the runtime maps", function () {
    const widget = customElements.get(TAG) as any;
    assert.deepEqual(Object.keys(widget.convertFrom), [".ggb"]);
    assert.deepEqual(Object.keys(widget.convertTo), [".ggb", "image/png", "image/svg+xml"]);
  });

  it("encodes and decodes the bytes of a construction", function () {
    assert.equal(bytesToBase64(zip), btoa("PK\x03\x04\x01\x02\x03\x04"));
    assert.deepEqual([...base64ToBytes(bytesToBase64(zip))], [...zip]);
    assert.isFalse(isGgbArchive(new Uint8Array([1, 2, 3, 4, 5])));
  });

  it("imports a .ggb file only when the apply function runs", async function () {
    const widget = await mountIn(`<${TAG} src="https://example.org/a.ggb"></${TAG}>`, TAG);
    const apply = await widget.importGgb(ggbFile(zip));
    assert.equal(widget.src, "https://example.org/a.ggb");
    apply();
    assert.equal(widget.src, `data:application/vnd.geogebra.file;base64,${bytesToBase64(zip)}`);
  });

  it("refuses a file that is no zip archive without touching the widget", async function () {
    const widget = await mountIn(`<${TAG}></${TAG}>`, TAG);
    let message = "";
    try { await widget.importGgb(ggbFile(new TextEncoder().encode("not a zip"), "bad.ggb")) }
    catch (error) { message = (error as Error).message }
    assert.match(message, /GeoGebra construction/);
    assert.isUndefined(widget.src);
  });

  it("exports the construction as .ggb and round-trips it", async function () {
    const widget = await mountIn(`<${TAG}></${TAG}>`, TAG);
    assert.isNull(widget.exportGgb());
    widget.src = SRC_A;
    const fromSrc = widget.exportGgb() as File;
    assert.equal(fromSrc.name, "construction.ggb");
    assert.equal(new TextDecoder().decode(await fromSrc.arrayBuffer()), "AAAA");
    widget.api = {getBase64: () => SRC_B.split(",")[1]};
    const live = widget.exportGgb() as File;
    assert.equal(new TextDecoder().decode(await live.arrayBuffer()), "BBBB");
    // Round trip: the exported bytes are a valid import for a second widget.
    const again = await mountIn(`<${TAG}></${TAG}>`, TAG);
    widget.api = {getBase64: () => bytesToBase64(zip)};
    (await again.importGgb(await widget.exportGgb()))();
    assert.equal(again.src, `data:application/vnd.geogebra.file;base64,${bytesToBase64(zip)}`);
  });

  it("exports the picture through the applet and declines without an applet", async function () {
    const widget = await mountIn(`<${TAG}></${TAG}>`, TAG);
    assert.isNull(widget.exportPng());
    assert.isNull(widget.exportSvg());
    widget.api = {
      getPNGBase64: () => btoa("png"),
      exportSVG: (callback: (svg: string) => void) => callback("<svg xmlns='http://www.w3.org/2000/svg'/>"),
    };
    const png = widget.exportPng() as File;
    assert.equal(png.type, "image/png");
    const svg = await widget.exportSvg() as File;
    assert.equal(svg.type, "image/svg+xml");
    assert.include(await svg.text(), "<svg");
  });
});

mocha.run();
