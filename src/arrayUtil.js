export const lastItem = arr => arr[arr.length - 1];
export const shuffle = arr =>
  [...arr].sort(item => (Math.random() > 0.5 ? 1 : -1));
