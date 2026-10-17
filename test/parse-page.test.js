import { test } from "node:test";
import assert from "node:assert/strict";
import { parsePage } from "../src/paginate.js";

test("missing or empty value returns the fallback", () => {
  assert.equal(parsePage(undefined), 1);
  assert.equal(parsePage(null), 1);
  assert.equal(parsePage(""), 1);
  assert.equal(parsePage("  "), 1);
  assert.equal(parsePage(null, 5), 5);
});

test("whole numbers are accepted", () => {
  assert.equal(parsePage("1"), 1);
  assert.equal(parsePage(" 3 "), 3);
  assert.equal(parsePage("12"), 12);
});

test("invalid values throw a RangeError", () => {
  for (const value of ["0", "-1", "2.5", "abc", "1e3", "99999999999999999999"]) {
    assert.throws(() => parsePage(value), RangeError, value);
  }
});
