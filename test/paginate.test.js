import { test } from "node:test";
import assert from "node:assert/strict";
import { paginate } from "../src/paginate.js";

const ten = Array.from({ length: 10 }, (_, i) => i + 1);

test("first page", () => {
  assert.deepEqual(paginate(ten, 1, 3), {
    items: [1, 2, 3],
    page: 1,
    totalPages: 4,
    hasNext: true,
  });
});

test("short last page", () => {
  assert.deepEqual(paginate(ten, 4, 3), {
    items: [10],
    page: 4,
    totalPages: 4,
    hasNext: false,
  });
});

test("empty list has one empty page", () => {
  assert.deepEqual(paginate([], 1, 5), {
    items: [],
    page: 1,
    totalPages: 1,
    hasNext: false,
  });
});

test("rejects invalid arguments", () => {
  assert.throws(() => paginate(ten, 0, 3), RangeError);
  assert.throws(() => paginate(ten, 1, 0), RangeError);
});
