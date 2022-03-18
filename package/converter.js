function splitHex(hex) {
    const digits = /^#([0-9a-f]{3,8})$/gi.exec(hex)[1];
    if (digits.length === 3 || digits.length === 4) {
        return digits.split(/([0-9a-f])/gi).filter(Boolean);
    }
    else if (digits.length === 6 || digits.length === 8) {
        return digits.split(/([0-9a-f]{2})/gi).filter(Boolean);
    }
}
function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
}
export function hexToHsl(hex) {
    return rgbToHsl(hexToRgb(hex));
}
export function hexToRgb(hex) {
    const digits = splitHex(hex)?.map((digit) => (digit.length === 1 ? digit + digit : digit));
    if (digits == null) {
        throw new Error(`Invalid color ${hex}`);
    }
    const rgb = {
        r: parseInt(digits[0], 16),
        g: parseInt(digits[1], 16),
        b: parseInt(digits[2], 16)
    };
    if (digits[3]) {
        rgb.a = Math.round((parseInt(digits[3], 16) / 255) * 1000) / 1000;
    }
    return rgb;
}
export function hslToRgb(hsl) {
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
    }
    else if (60 <= hsl.h && hsl.h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (120 <= hsl.h && hsl.h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (180 <= hsl.h && hsl.h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (240 <= hsl.h && hsl.h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (300 <= hsl.h && hsl.h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    const rgb = { r, g, b };
    if (hsl.a != null) {
        rgb.a = hsl.a;
    }
    return rgb;
}
export function rgbToHsl(rgb) {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const cmax = Math.max(r, g, b);
    const cmin = Math.min(r, g, b);
    const delta = cmax - cmin;
    let h = 0;
    let l = 0;
    let s = 0;
    if (delta === 0)
        h = 0;
    else if (cmax === r)
        h = ((g - b) / delta) % 6;
    else if (cmax === g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0)
        h += 360;
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    const hsl = {
        h,
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
    if (rgb.a != null) {
        hsl.a = rgb.a;
    }
    return hsl;
}
export function hslToHex(hsl) {
    return rgbToHex(hslToRgb(hsl));
}
export function rgbToHex(rgb) {
    const hex = '#' + [rgb.r, rgb.g, rgb.b].map((n) => clamp(n, 0, 255).toString(16).padStart(2, '0')).join('');
    const alpha = rgb.a != null ? Math.round(rgb.a * 255) : 255;
    return alpha < 255 ? hex + Math.max(alpha, 0).toString(16).padStart(2, '0') : hex;
}
export function hexToHsv(hex) {
    return rgbToHsv(hexToRgb(hex));
}
export function rgbToHsv(rgb) {
    const r = clamp(rgb.r, 0, 255) / 255;
    const g = clamp(rgb.g, 0, 255) / 255;
    const b = clamp(rgb.b, 0, 255) / 255;
    const v = Math.max(r, g, b);
    const c = v - Math.min(r, g, b);
    const s = c === 0 ? 0 : c / v;
    let h = c === 0
        ? null
        : v === r
            ? (g - b) / c + (g < b ? 6 : 0)
            : v === g
                ? (b - r) / c + 2
                : (r - g) / c + 4;
    h = (h % 6) * 60;
    const a = rgb.a != null ? clamp(rgb.a, 0, 1) : 0;
    return a > 0 ? { h, s, v, a } : { h, s, v };
}
export function hsvToHex(hsv) {
    return rgbToHex(hsvToRgb(hsv));
}
export function hsvToRgb(hsv) {
    let r, g, b;
    let h = (hsv.h % 360) / 60;
    const c = hsv.v * hsv.s;
    const x = c * (1 - Math.abs((h % 2) - 1));
    r = g = b = hsv.v - c;
    h = ~~h;
    r += [c, x, 0, 0, x, c][h];
    g += [x, c, c, x, 0, 0][h];
    b += [0, 0, x, c, c, x][h];
    r = Math.floor(r * 255);
    g = Math.floor(g * 255);
    b = Math.floor(b * 255);
    return hsv.a != null ? { r, g, b, a: hsv.a } : { r, g, b };
}
