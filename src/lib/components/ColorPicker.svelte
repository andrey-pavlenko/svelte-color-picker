<script lang="ts">
  import { hexToRgb, rgbToHex, rgbToHsv, hsvToRgb } from '../utils';

  let classes = '';
  export { classes as class };
  export let init = '#000';
  export let color: string;

  console.info(init);

  let h: number, s: number, v: number, a: number, x: number, y: number;

  function updateInit(init: string) {
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

  updateInit(init);
  updateColor(h, x, y, a);

  $: updateInit(init);
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
  <div class="cp__body" style="--cp-current-color: {rgbToHex(hsvToRgb({ h, s: 1, v: 1 }))}">
    <div class="cp__tone" use:actionToneInteraction>
      <div class="cp__tone--marker" style="left: {x}%; top: {y}%" />
    </div>
    <div class="cp__hue">
      <input type="range" min="0" max="359" step="1" bind:value={h} />
    </div>
    <div class="cp__alpha">
      <input type="range" min="0" max="1" step="any" bind:value={a} />
    </div>
  </div>
</div>
