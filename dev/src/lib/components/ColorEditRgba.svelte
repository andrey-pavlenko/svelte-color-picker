<script lang="ts">
  import { hexToRgb, rgbToHex } from '$lib/converter';

  export let color = '#000';

  let r: number;
  let g: number;
  let b: number;
  let a: number;

  function initColor(color: string) {
    try {
      const rgb = hexToRgb(color);
      r = rgb.r;
      g = rgb.g;
      b = rgb.b;
      a = rgb.a ?? 1;
    } catch (e) {
      r = NaN;
      g = NaN;
      b = NaN;
      a = NaN;
    }
  }

  $: initColor(color);

  function updateColor(r: number, g: number, b: number, a: number) {
    if ([r, b, g, a ?? 1].every((num) => Number.isFinite(num))) {
      color = rgbToHex({ r, g, b, a });
    }
  }
  $: updateColor(r, g, b, a);

  // const _l = console.info;
</script>

<input
  min="0"
  max="255"
  step="1"
  class="coloredit__rgba coloredit__rgba--r"
  type="number"
  value={r}
  on:change={(event) => (r = +event.currentTarget.value)}
/>
<input
  min="0"
  max="255"
  step="1"
  class="coloredit__rgba coloredit__rgba--g"
  type="number"
  value={g}
  on:change={(event) => (g = +event.currentTarget.value)}
/>
<input
  min="0"
  max="255"
  step="1"
  class="coloredit__rgba coloredit__rgba--b"
  type="number"
  value={b}
  on:change={(event) => (b = +event.currentTarget.value)}
/>
<input
  min="0"
  max="1"
  step="0.01"
  class="coloredit__rgba coloredit__rgba--a"
  type="number"
  value={a}
  on:change={(event) => (a = +event.currentTarget.value)}
/>
