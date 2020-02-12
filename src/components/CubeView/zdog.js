import Zdog from 'zdog';

export const TAU = Zdog.TAU;

// {
//     dragRotate: false,
//     element: parentElement,
//     resize: true,
//     centered: true,
//     onResize: function(width, height) {
//         resizeIllo(this, width, height);
//     }
// }

export const getIllustration = (element, config = {}) => {
  return new Zdog.Illustration({ element, ...config });
};

export const getBox = (
  size = new Size3d(),
  baseColor = '#ccddff',
  tintColor = '#dedede'
) => {
  return new Zdog.Box({
    width: size.width,
    height: size.height,
    depth: size.depth,
    stroke: 1,
    color: tintColor,
    topFace: tintColor,
    bottomFace: tintColor,
    frontFace: baseColor,
    rearFace: baseColor
  });
};

export const getAnchor = (
  root,
  { translate = getVector(), rotate = getVector() } = {}
) => {
  return new Zdog.Anchor({
    addTo: root,
    translate: translate,
    rotate: rotate
  });
};

// export class Point3d {
//   constructor({ x = 0, y = 0, z = 0 } = {}) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//   }
// }

export const getVector = ({ x = 0, y = 0, z = 0 } = {}) => {
  return new Zdog.Vector({ x, y, z });
};

export class Size3d {
  constructor({ width = 1, height = 1, depth = 1 } = {}) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }
}
