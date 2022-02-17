<script lang="ts">
  import { hexToRgb, rgbToHex, rgbToHsv, hsvToRgb } from '../utils';

  let classes = '';
  export { classes as class };
  export let color = '#000';

  let h: number, s: number, v: number, a: number, x: number, y: number;

  function initColors(init: string) {
    const hsv = rgbToHsv(hexToRgb(init));
    h = hsv.h;
    s = hsv.s;
    v = hsv.v;
    a = hsv.a ?? 1;
    x = s * 100;
    y = (1 - v) * 100;
  }

  function updateColor(h: number, x: number, y: number, a: number) {
    color = rgbToHex(hsvToRgb({ h, s: x / 100, v: (100 - y) / 100, a }));
  }

  $: initColors(color);
  $: updateColor(h, x, y, a);

  function actionToneInteraction(node: HTMLElement) {
    function clamp(value: number, min: number, max: number): number {
      return Math.max(Math.min(value, max), min);
    }

    function updatePosition({ offsetX, offsetY }: { offsetX: number; offsetY: number }) {
      const { width, height } = node.getBoundingClientRect();
      x = clamp(offsetX / width, 0, 1) * 100;
      y = clamp(offsetY / height, 0, 1) * 100;
    }

    function handleMoveStart(event: PointerEvent) {
      updatePosition(event);
      node.setPointerCapture(event.pointerId);
      node.addEventListener('mousemove', handleMove);
      node.addEventListener('touchmove', handleMove);
    }

    function handleMove(event: PointerEvent) {
      updatePosition(event);
    }

    function handleMoveEnd(event: PointerEvent) {
      // console.info('handleMoveEnd', event);
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('touchmove', handleMove);
      node.setPointerCapture(event.pointerId);
    }

    function handleKeyboardMove(event: KeyboardEvent) {
      const step = 0.5;
      switch (event.code) {
        case 'ArrowUp':
          y = clamp(y - step, 0, 100);
          break;
        case 'ArrowDown':
          y = clamp(y + step, 0, 100);
          break;
        case 'ArrowLeft':
          x = clamp(x - step, 0, 100);
          break;
        case 'ArrowRight':
          x = clamp(x + step, 0, 100);
          break;
      }
    }

    node.addEventListener('pointerdown', handleMoveStart);
    node.addEventListener('pointerup', handleMoveEnd);
    node.addEventListener('keydown', handleKeyboardMove);

    return {
      destroy() {
        console.info('actionToneInteraction destroy');
        node.removeEventListener('mousemove', handleMove);
        node.removeEventListener('pointerdown', handleMoveStart);
        node.removeEventListener('pointerup', handleMoveEnd);
        node.removeEventListener('keydown', handleKeyboardMove);
      }
    };
  }
</script>

<div class={'colorpicker' + (classes ? ' ' + classes : '')}>
  <div
    class="cp__body"
    style="--cp-current-hue: {rgbToHex(hsvToRgb({ h, s: 1, v: 1 }))}; --cp-current-color: {color} "
  >
    <div class="cp__tone" tabindex="0" use:actionToneInteraction>
      <div class="cp__tone--marker" style="left: {x}%; top: {y}%" />
    </div>
    <div class="cp__sample" />
    <div class="cp__hue" style="--cp-hue-left: {(h / 360) * 100}%">
      <input type="range" min="0" max="359" step="1" bind:value={h} />
    </div>
    <div class="cp__alpha" style="--cp-alpha-left: {a * 100}%">
      <input type="range" min="0" max="1" step="0.005" bind:value={a} />
    </div>
  </div>
</div>
