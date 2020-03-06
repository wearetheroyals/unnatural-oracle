export const filenameFromAbsolutePath = path =>
  path
    .split('/')
    .pop()
    .split('.')[0];
