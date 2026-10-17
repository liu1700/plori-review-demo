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
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page,
    totalPages,
    hasNext: page < totalPages,
  };
}
