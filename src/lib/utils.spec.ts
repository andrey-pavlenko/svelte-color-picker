import { hexToRgb, rgbToHex, hexToHsl, hslToHex } from './utils';

describe('Color conversion', () => {
  it('hexToRgb', () => {
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#0ff')).toEqual({ r: 0, g: 255, b: 255 });
    expect(hexToRgb('#00f')).toEqual({ r: 0, g: 0, b: 255 });
    expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#0000')).toEqual({ r: 0, g: 0, b: 0, a: 0 });
    expect(hexToRgb('#000F')).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(hexToRgb('#F0F0F0')).toEqual({ r: 240, g: 240, b: 240 });
    expect(hexToRgb('#0F0F0F')).toEqual({ r: 15, g: 15, b: 15 });
    expect(hexToRgb('#0F0F0FFF')).toEqual({ r: 15, g: 15, b: 15, a: 1 });
    expect(hexToRgb('#0F0F0F10')).toEqual({ r: 15, g: 15, b: 15, a: 0.063 });
  });
  it('rgbToHex', () => {
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
    expect(rgbToHex({ r: 0, g: 255, b: 255 })).toBe('#00ffff');
    expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe('#0000ff');
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    expect(rgbToHex({ r: 0, g: 0, b: 0, a: 0 })).toBe('#00000000');
    expect(rgbToHex({ r: 0, g: 0, b: 0, a: 1 })).toBe('#000000ff');
    expect(rgbToHex({ r: 240, g: 240, b: 240 })).toBe('#f0f0f0');
    expect(rgbToHex({ r: 15, g: 15, b: 15 })).toBe('#0f0f0f');
    expect(rgbToHex({ r: 15, g: 15, b: 15, a: 1 })).toBe('#0f0f0fff');
    expect(rgbToHex({ r: 15, g: 15, b: 15, a: 0.063 })).toBe('#0f0f0f10');
  });
  it('hexToHsl', () => {
    expect(hexToHsl('#000')).toEqual({ h: 0, s: 0, l: 0 });
    expect(hexToHsl('#fff')).toEqual({ h: 0, s: 0, l: 100 });
    expect(hexToHsl('#46798f')).toEqual({ h: 198, s: 34, l: 42 });
    expect(hexToHsl('#83006c')).toEqual({ h: 311, s: 100, l: 26 });
    expect(hexToHsl('#7a7a7a')).toEqual({ h: 0, s: 0, l: 48 });
    expect(hexToHsl('#29815d61')).toEqual({ h: 155, s: 52, l: 33, a: 0.38 });
  });
  it('hslToHex', () => {
    expect(hslToHex({ h: 0, s: 0, l: 0 })).toBe('#000000');
    expect(hslToHex({ h: 0, s: 0, l: 100 })).toBe('#ffffff');
    expect(hslToHex({ h: 198, s: 34, l: 42 })).toBe('#477a90');
    expect(hslToHex({ h: 311, s: 100, l: 26 })).toBe('#85006c');
    expect(hslToHex({ h: 0, s: 0, l: 48 })).toBe('#7a7a7a');
    expect(hslToHex({ h: 155, s: 52, l: 33, a: 0.38 })).toBe('#28805b61');
  });
});
