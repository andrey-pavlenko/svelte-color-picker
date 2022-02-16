export interface HslColor {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface RgbColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export type HexColor = string;

function splitHex(hex: HexColor): string[] | undefined {
  const digits = /^#([0-9a-f]{3,8})$/gi.exec(hex)[1];
  if (digits.length === 3 || digits.length === 4) {
    return digits.split(/([0-9a-f])/gi).filter(Boolean);
  } else if (digits.length === 6 || digits.length === 8) {
    return digits.split(/([0-9a-f]{2})/gi).filter(Boolean);
  }
}

export function hexToHsl(hex: HexColor): HslColor {
  return rgbToHsl(hexToRgb(hex));
}

export function hexToRgb(hex: HexColor): RgbColor {
  const digits = splitHex(hex)?.map((digit) => (digit.length === 1 ? digit + digit : digit));
  if (digits == null) {
    throw new Error(`Invalid color ${hex}`);
  }
  const rgb: RgbColor = {
    r: parseInt(digits[0], 16),
    g: parseInt(digits[1], 16),
    b: parseInt(digits[2], 16)
  };
  if (digits[3]) {
    rgb.a = Math.round((parseInt(digits[3], 16) / 255) * 1000) / 1000;
  }
  return rgb;
}

export function hslToRgb00(hsl: HslColor): RgbColor {
  let r: number, g: number, b: number;
  let _h = (hsl.h % 360) / 60;

  const c = hsl.l * hsl.s;
  const x = c * (1 - Math.abs((_h % 2) - 1));
  r = g = b = (hsl.a ?? 1) - c;

  _h = ~~_h;
  r += [c, x, 0, 0, x, c][_h];
  g += [x, c, c, x, 0, 0][_h];
  b += [0, 0, x, c, c, x][_h];
  console.info(hsl, _h, c, r, g, b);

  const rgb: RgbColor = {
    r: Math.floor(r * 255),
    g: Math.floor(g * 255),
    b: Math.floor(b * 255)
  };
  if (hsl.a != null) {
    rgb.a = hsl.a;
  }
  return rgb;
}

export function hslToRgb(hsl: HslColor): RgbColor {
  const s = hsl.s / 100;
  const l = hsl.l / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hsl.h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= hsl.h && hsl.h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= hsl.h && hsl.h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= hsl.h && hsl.h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= hsl.h && hsl.h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= hsl.h && hsl.h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= hsl.h && hsl.h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const rgb: RgbColor = { r, g, b };
  if (hsl.a != null) {
    rgb.a = hsl.a;
  }

  return rgb;
}

export function rgbToHsl(rgb: RgbColor): HslColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const cmax = Math.max(r, g, b);
  const cmin = Math.min(r, g, b);
  const delta = cmax - cmin;

  let h = 0;
  let l = 0;
  let s = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  const hsl: HslColor = {
    h,
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };

  if (rgb.a != null) {
    hsl.a = rgb.a;
  }

  return hsl;
}

export function hslToHex(hsl: HslColor): HexColor {
  return rgbToHex(hslToRgb(hsl));
}

export function rgbToHex(rgb: RgbColor): HexColor {
  const hex = '#' + [rgb.r, rgb.g, rgb.b].map((n) => n.toString(16).padStart(2, '0')).join('');
  const alpha = rgb.a != null ? Math.round(rgb.a * 255) : 255;
  return alpha < 255 ? hex + alpha.toString(16).padStart(2, '0') : hex;
}
