export function hex2(n) {
  let hex = n.toString(16);

  if (hex.length === 1) {
    return "0" + hex;
  }

  return hex;
}

export function hexToRgb(rawHex) {
  let hex = rawHex; //hex6(rawHex);
  let pairs = hex.replace("#", "").match(/../g);
  return pairs.map((d) => parseInt(d, 16));
}

export function rgbToHex(rgbList) {
  return "#" + rgbList.map((d) => hex2(d)).join("");
}

export function getComplimentaryColor(hex) {
  const rgbList = hexToRgb(hex);
  return rgbList.map((d) => 255 - d);
}

const dist = (x1, y1, x2, y2) => {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
};
