<script lang="ts">
  import { hexToHsl, hslToHex } from '../utils';

  let classes = '';
  export { classes as class };
  export let color = '#f00';

  let h = 0;
  let s = 0;
  let l = 0;
  let a = 1;

  (function (color) {
    const hsl = hexToHsl(color);
    h = hsl.h;
    s = hsl.s;
    l = hsl.l;
    a = hsl.a ?? 1;
  })(color);

  $: (function (h, s, l, a) {
    color = a < 1 ? hslToHex({ h, s, l, a }) : hslToHex({ h, s, l });
    console.info('color', color);
  })(h, s, l, a);

  function actionToneInteraction(node: HTMLElement) {
    function clamp(value: number, min: number, max: number): number {
      return Math.max(Math.min(value, max), min);
    }

    function getPositionPercent({ offsetX, offsetY }: { offsetX: number; offsetY: number }): {
      x: number;
      y: number;
    } {
      const { width, height } = node.getBoundingClientRect();
      const x = clamp((offsetX / width) * 100, 0, 100);
      const y = clamp((offsetY / height) * 100, 0, 100);
      return { x, y };
    }

    function setColor({ x, y }: { x: number; y: number }) {
      console.info('setColor', x, y);
      s = Math.round(x);
      l = 100 - Math.round(y);
    }

    function handleMoveStart(event: PointerEvent) {
      setColor(getPositionPercent(event));
      console.info('handleMoveStart', event);
      node.setPointerCapture(event.pointerId);
      node.addEventListener('mousemove', handleMove);
      node.addEventListener('touchmove', handleMove);
    }

    function handleMove(event: PointerEvent) {
      console.info('handleMove');
      setColor(getPositionPercent(event));
    }

    function handleMoveEnd(event: PointerEvent) {
      console.info('handleMoveEnd', event);
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('touchmove', handleMove);
      node.setPointerCapture(event.pointerId);
    }

    node.addEventListener('pointerdown', handleMoveStart);
    node.addEventListener('pointerup', handleMoveEnd);

    return {
      destroy() {
        console.info('actionToneInteraction destroy');
        node.removeEventListener('mousemove', handleMove);
        node.removeEventListener('pointerdown', handleMoveStart);
        node.removeEventListener('pointerup', handleMoveEnd);
      }
    };
  }
</script>

<div class={'colorpicker' + (classes ? ' ' + classes : '')}>
  <div class="cp__body" style="--cp-current-color: {hslToHex({ h: h, s: 100, l: 50 })}">
    <div class="cp__tone" use:actionToneInteraction>
      <div class="cp__tone--marker" style="left: {s}%; top: {100 - l}%" />
    </div>
    <div class="cp__hue">
      <input type="range" min="0" max="359" step="1" bind:value={h} />
    </div>
    <div class="cp__alpha">
      <input type="range" min="0" max="1" step="any" bind:value={a} />
    </div>
  </div>
</div>
