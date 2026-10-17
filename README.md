# plori-review-demo

A scratch repository for the Plori pull-request review example. It holds one
small JavaScript module, a pagination helper, and its tests. Pull requests in
this repository are reviewed by the Plori GitHub Action
(`.github/workflows/plori-review.yml`).

## Usage

```js
import { paginate } from "./src/paginate.js";

paginate(["a", "b", "c", "d", "e"], 1, 2);
// { items: ["a", "b"], page: 1, totalPages: 3, hasNext: true }

paginate(["a", "b", "c", "d", "e", "f"], 2, 3);
// { items: ["d", "e", "f"], page: 2, totalPages: 2, hasNext: false }
```

Pages are numbered from 1. `hasNext` is `true` only when a later page has
items, so the last page always returns `hasNext: false`, also when it is full.

## Tests

Node.js 20 or later, no dependencies:

```sh
npm test
```

## License

MIT
