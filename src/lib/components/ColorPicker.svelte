<script lang="ts">
  import { hexToHsl, hslToHex } from '../utils';

  let classes = '';
  export { classes as class };
  export let color = '#f00';

  let h = NaN;

  $: h = getHsl(color).h;

  function getHsl(color: string): { h: number; s: number; l: number; a: number } {
    return { a: 1, ...hexToHsl(color) };
  }

  function positionToColor({ x, y }: { x: number; y: number }): string {
    const { h, a } = getHsl(color);
    return hslToHex({ h, s: x, l: Math.min(y, 99), a });
  }

  function positionFromColor(color: string): { x: number; y: number } {
    const { s, l } = getHsl(color);
    const x = s;
    const y = (50 - l) * 2;
    console.info('s', s, 'l', l, 'x', x, 'y', y);
    return { x, y };
  }

  function updateHueOrAplha(key: 'hue' | 'alpha') {
    return function ({ target }: Event) {
      if (target != null) {
        const value = +(target as HTMLInputElement).value;
        if (key === 'hue') {
          h = value;
          color = hslToHex({ ...getHsl(color), h: value });
        } else if (key === 'alpha') {
          color = hslToHex({ ...getHsl(color), a: value });
        }
      }
    };
  }

  function actionToneInteraction(node: HTMLElement) {
    function clamp(value: number, min: number, max: number): number {
      return Math.max(Math.min(value, max), min);
    }

    function getPositionPercent({ offsetX, offsetY }: { offsetX: number; offsetY: number }): {
      x: number;
      y: number;
    } {
      const { width, height } = node.getBoundingClientRect();
      const x = clamp(offsetX / width, 0, 1);
      const y = clamp((height - offsetY) / height, 0, 1);
      return { x: x * 100, y: y * 100 };
    }

    function handleMoveStart(event: PointerEvent) {
      color = positionToColor(getPositionPercent(event));
      // console.info('handleMoveStart', event);
      node.setPointerCapture(event.pointerId);
      node.addEventListener('mousemove', handleMove);
      node.addEventListener('touchmove', handleMove);
    }

    function handleMove(event: PointerEvent) {
      color = positionToColor(getPositionPercent(event));
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
  <div class="cp__body" style="--cp-current-color: {hslToHex({ h, s: 100, l: 50 })}">
    <div class="cp__tone" use:actionToneInteraction>
      <div
        class="cp__tone--marker"
        style="left: {positionFromColor(color).x}%; top: {positionFromColor(color).y}%"
      />
    </div>
    <div class="cp__hue">
      <input type="range" min="0" max="359" step="1" value={h} on:input={updateHueOrAplha('hue')} />
    </div>
    <div class="cp__alpha">
      <input
        type="range"
        min="0"
        max="1"
        step="any"
        value={getHsl(color).a}
        on:input={updateHueOrAplha('alpha')}
      />
    </div>
  </div>
</div>
