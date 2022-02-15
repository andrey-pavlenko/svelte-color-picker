import { HexToRgb, RgbToHex, HexToHsl, HslToHex } from './utils';

describe('Color conversion', () => {
  it('HexToRgb', () => {
    expect(HexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(HexToRgb('#0ff')).toEqual({ r: 0, g: 255, b: 255 });
    expect(HexToRgb('#00f')).toEqual({ r: 0, g: 0, b: 255 });
    expect(HexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(HexToRgb('#0000')).toEqual({ r: 0, g: 0, b: 0, a: 0 });
    expect(HexToRgb('#000F')).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(HexToRgb('#F0F0F0')).toEqual({ r: 240, g: 240, b: 240 });
    expect(HexToRgb('#0F0F0F')).toEqual({ r: 15, g: 15, b: 15 });
    expect(HexToRgb('#0F0F0FFF')).toEqual({ r: 15, g: 15, b: 15, a: 1 });
    expect(HexToRgb('#0F0F0F10')).toEqual({ r: 15, g: 15, b: 15, a: 0.063 });
  });
  it('RgbToHex', () => {
    expect(RgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
    expect(RgbToHex({ r: 0, g: 255, b: 255 })).toBe('#00ffff');
    expect(RgbToHex({ r: 0, g: 0, b: 255 })).toBe('#0000ff');
    expect(RgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    expect(RgbToHex({ r: 0, g: 0, b: 0, a: 0 })).toBe('#00000000');
    expect(RgbToHex({ r: 0, g: 0, b: 0, a: 1 })).toBe('#000000ff');
    expect(RgbToHex({ r: 240, g: 240, b: 240 })).toBe('#f0f0f0');
    expect(RgbToHex({ r: 15, g: 15, b: 15 })).toBe('#0f0f0f');
    expect(RgbToHex({ r: 15, g: 15, b: 15, a: 1 })).toBe('#0f0f0fff');
    expect(RgbToHex({ r: 15, g: 15, b: 15, a: 0.063 })).toBe('#0f0f0f10');
  });
  it('HexToHsl', () => {
    expect(HexToHsl('#000')).toEqual({ h: 0, s: 0, l: 0 });
    expect(HexToHsl('#fff')).toEqual({ h: 0, s: 0, l: 100 });
    expect(HexToHsl('#46798f')).toEqual({ h: 198, s: 34, l: 42 });
    expect(HexToHsl('#83006c')).toEqual({ h: 311, s: 100, l: 26 });
    expect(HexToHsl('#7a7a7a')).toEqual({ h: 0, s: 0, l: 48 });
    expect(HexToHsl('#29815d61')).toEqual({ h: 155, s: 52, l: 33, a: 0.38 });
  });
  it('HslToHex', () => {
    expect(HslToHex({ h: 0, s: 0, l: 0 })).toBe('#000000');
    expect(HslToHex({ h: 0, s: 0, l: 100 })).toBe('#ffffff');
    expect(HslToHex({ h: 198, s: 34, l: 42 })).toBe('#477a90');
    expect(HslToHex({ h: 311, s: 100, l: 26 })).toBe('#85006c');
    expect(HslToHex({ h: 0, s: 0, l: 48 })).toBe('#7a7a7a');
    expect(HslToHex({ h: 155, s: 52, l: 33, a: 0.38 })).toBe('#28805b61');
  });
});
