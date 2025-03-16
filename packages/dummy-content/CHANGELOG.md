# dummy-content

## 1.0.0

### Major Changes

- 4b83df6: Rename content type prio-bangla to kabbik-ipsum.

### Patch Changes

- 6de6ca8: **Bug fix(Lib)**: `deepness` 1 now works as expected. Before after `<h6>` all were `<h6>` heading.
- e2e6fd8: **Bug fix(CLI)**: Prettified pre tags are now correctly parsed using `htmlparser2`. `node-html-parser` was buggy at handling them.
