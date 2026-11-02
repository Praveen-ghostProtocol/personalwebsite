import test from "node:test";
import assert from "node:assert/strict";
import { scrollProgress } from "../src/motion.mjs";
test("scroll progress stays bounded before, within and after the scene, including no travel", () => {
  assert.equal(scrollProgress(100, 200), 0);
  assert.equal(scrollProgress(-100, 200), 0.5);
  assert.equal(scrollProgress(-500, 200), 1);
  assert.equal(scrollProgress(-100, 0), 0);
  assert.equal(scrollProgress(-100, -1), 0);
});
