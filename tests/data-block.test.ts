/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import "../src/widgets/webwriter-geogebra";
import { SRC_A, SRC_B, json, wait, until, mount, unmountAll, dataBlock } from "./helpers";

mocha.setup(getMochaConfig());

for (const mode of ["read", "edit"] as const) {
  describe(`<webwriter-geogebra> data block (${mode} mode)`, function () {
    const attrs = mode === "edit" ? ` contenteditable=""` : "";

    beforeEach(function () {
      document.designMode = mode === "edit" ? "on" : "off";
    });
    afterEach(unmountAll);

    it("reads the data block on connect", async function () {
      const el = await mount(`<webwriter-geogebra${attrs}><script type="application/json" slot="data">${json(SRC_A)}</script></webwriter-geogebra>`);
      assert.isTrue(await until(() => el.src === SRC_A), `src is ${el.src}`);
      assert.isFalse(el.hasAttribute("src"), "a data URL must not be reflected as an attribute");
    });

    it("creates the data block when src is set", async function () {
      const el = await mount(`<webwriter-geogebra${attrs}></webwriter-geogebra>`);
      assert.isNull(dataBlock(el), "no block before a construction");
      el.src = SRC_B;
      assert.isTrue(await until(() => dataBlock(el)), "block was not created");
      const block = dataBlock(el)!;
      assert.equal(block.type, "application/json");
      assert.equal(block.slot, "data");
      assert.equal(JSON.parse(block.textContent!).src, SRC_B);
      assert.isFalse(el.hasAttribute("src"), "a data URL must not be reflected as an attribute");
    });

    it("replaces the value in the same block on a later src", async function () {
      const el = await mount(`<webwriter-geogebra${attrs}><script type="application/json" slot="data">${json(SRC_A)}</script></webwriter-geogebra>`);
      assert.isTrue(await until(() => el.src === SRC_A));
      const block = dataBlock(el)!;
      el.src = SRC_B;
      assert.isTrue(await until(() => JSON.parse(block.textContent!).src === SRC_B), block.textContent!);
      assert.strictEqual(dataBlock(el), block);
      assert.equal(el.querySelectorAll("script").length, 1, "one block is kept");
    });

    it("updates the widget when the block changes", async function () {
      const el = await mount(`<webwriter-geogebra${attrs}><script type="application/json" slot="data">${json(SRC_A)}</script></webwriter-geogebra>`);
      assert.isTrue(await until(() => el.src === SRC_A));
      dataBlock(el)!.textContent = json(SRC_B);
      assert.isTrue(await until(() => el.src === SRC_B), `src is ${el.src}`);
    });

    it("keeps a file URL as an attribute and not in the block", async function () {
      const el = await mount(`<webwriter-geogebra${attrs}></webwriter-geogebra>`);
      el.src = "https://example.org/a.ggb";
      assert.isTrue(await until(() => el.getAttribute("src") === "https://example.org/a.ggb"), "attribute");
      await wait(300);
      assert.isNull(dataBlock(el), "no block for a URL");
    });

    it("keeps unknown keys in the block", async function () {
      const el = await mount(`<webwriter-geogebra${attrs}><script type="application/json" slot="data">{"src":"${SRC_A}","other":1}</script></webwriter-geogebra>`);
      assert.isTrue(await until(() => el.src === SRC_A));
      el.src = SRC_B;
      assert.isTrue(await until(() => JSON.parse(dataBlock(el)!.textContent!).src === SRC_B));
      assert.equal(JSON.parse(dataBlock(el)!.textContent!).other, 1, dataBlock(el)!.textContent!);
    });
  });
}

mocha.run();
