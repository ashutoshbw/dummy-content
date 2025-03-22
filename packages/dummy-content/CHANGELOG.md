# dummy-content

## 1.0.3

### Patch Changes

- 28fd190: Update kabbik-ipsum words.

## 1.0.2

### Patch Changes

- 0e40d24: Added support of all elements when using the `id` option. Before it only worked for `<div>`s.

## 1.0.1

### Patch Changes

- 0d24fa7: **Bug fix(CLI)**: Fix no element found with id problem of an existing element having the right id.

## 1.0.0

### Major Changes

- 4b83df6: Rename content type prio-bangla to kabbik-ipsum.

### Patch Changes

- 6de6ca8: **Bug fix(Lib)**: `deepness` 1 now works as expected. Before after `<h6>` all were `<h6>` heading.
- e2e6fd8: **Bug fix(CLI)**: Prettified pre tags are now correctly parsed using `htmlparser2`. `node-html-parser` was buggy at handling them.
