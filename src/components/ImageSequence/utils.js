export function getViewportHeight() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

export function imageCoverDimensions(iw, ih, w, h, offsetX = 0.5, offsetY = 0.5) {
  let r = Math.min(w / iw, h / ih),
    nw = iw * r,
    nh = ih * r,
    cx,
    cy,
    cw,
    ch,
    ar = 1,
    x = 0,
    y = 0;

  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
  nw *= ar;
  nh *= ar;

  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  return { cx, cy, cw, ch, x, y, w, h, ih, iw, nw, nh };
}

export function isImageLoaded(image) {
  return image && image.src && (image.complete || image.naturalWidth !== 0);
}
