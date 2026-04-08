export function hexToHSL(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 262, s: 83, l: 58 };

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function generateTheme(accentHex) {
  const { h, s } = hexToHSL(accentHex);
  
  return {
    accent: accentHex,
    accentMid: `hsl(${h}, ${s}%, 50%)`,
    accentLight: `hsl(${h}, ${s}%, 85%)`,
    accentDark: `hsl(${h}, ${s}%, 35%)`,
    accentBg: `hsla(${h}, ${s}%, 50%, 0.15)`,
    accentBgLight: `hsla(${h}, ${s}%, 50%, 0.4)`,
    lightBg: `hsl(${h}, 15%, 94%)`,
    darkBg: `hsl(${h}, 10%, 12%)`,
    lightText: `hsl(${h}, 10%, 95%)`,
    darkText: `hsl(${h}, 15%, 15%)`
  };
}
