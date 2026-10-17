/**
 * Return one page of `items`.
 *
 * Pages are numbered from 1. A page number past the last page returns an
 * empty `items` array. An empty list has one (empty) page.
 *
 * @param {Array} items
 * @param {number} page      1-based page number
 * @param {number} pageSize  items per page, at least 1
 * @returns {{items: Array, page: number, totalPages: number, hasNext: boolean}}
 */
export function paginate(items, page, pageSize) {
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new RangeError("pageSize must be a positive integer");
  }
  if (!Number.isInteger(page) || page < 1) {
    throw new RangeError("page must be a positive integer");
  }
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    items: items.slice(start, end),
    page,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
    hasNext: end <= items.length,
  };
}

/**
 * Read a page number from a query-string value such as `?page=3`.
 *
 * A missing or empty value returns `fallback`. Anything that is not a whole
 * number of at least 1 throws a RangeError.
 *
 * @param {string | null | undefined} value  for example `params.get("page")`
 * @param {number} [fallback=1]
 * @returns {number}
 */
export function parsePage(value, fallback = 1) {
  if (value === undefined || value === null) {
    return fallback;
  }
  const text = String(value).trim();
  if (text === "") {
    return fallback;
  }
  if (!/^[0-9]+$/.test(text)) {
    throw new RangeError(`page must be a whole number, got ${JSON.stringify(value)}`);
  }
  const page = Number(text);
  if (page < 1 || !Number.isSafeInteger(page)) {
    throw new RangeError(`page must be between 1 and ${Number.MAX_SAFE_INTEGER}, got ${text}`);
  }
  return page;
}
