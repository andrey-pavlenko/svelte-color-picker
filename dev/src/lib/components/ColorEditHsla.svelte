<script lang="ts">
  import { hexToHsl, hslToHex } from '$lib/converter';

  export let color = '#000';

  let h: number;
  let s: number;
  let l: number;
  let a: number;

  function initColor(color: string) {
    try {
      const hsl = hexToHsl(color);
      h = hsl.h;
      s = hsl.s;
      l = hsl.l;
      a = hsl.a ?? 1;
    } catch (e) {
      h = NaN;
      s = NaN;
      l = NaN;
      a = NaN;
    }
  }

  $: initColor(color);

  function updateColor(h: number, s: number, l: number, a: number) {
    if ([h, s, l, a ?? 1].every((num) => Number.isFinite(num))) {
      color = hslToHex({ h, s, l, a });
    }
  }
  $: updateColor(h, s, l, a);

  // const _l = console.info;
</script>

<input
  min="0"
  max="255"
  step="1"
  class="coloredit__hsla coloredit__hsla--h"
  type="number"
  value={h}
  on:change={(event) => (h = +event.currentTarget.value)}
/>
<input
  min="0"
  max="255"
  step="1"
  class="coloredit__hsla coloredit__hsla--s"
  type="number"
  value={s}
  on:change={(event) => (s = +event.currentTarget.value)}
/>
<input
  min="0"
  max="255"
  step="1"
  class="coloredit__hsla coloredit__hsla--l"
  type="number"
  value={l}
  on:change={(event) => (l = +event.currentTarget.value)}
/>
<input
  min="0"
  max="1"
  step="0.01"
  class="coloredit__hsla coloredit__hsla--a"
  type="number"
  value={a}
  on:change={(event) => (a = +event.currentTarget.value)}
/>
