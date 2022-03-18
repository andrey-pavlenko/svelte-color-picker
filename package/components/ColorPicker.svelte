<script >import { hexToRgb, rgbToHex, rgbToHsv, hsvToRgb } from '../converter';
import _debounce from 'lodash.debounce';
let classes = '';
export { classes as class };
export let style = undefined;
export let color = '#000';
export let debounce = 0;
let h, s, v, a, x, y;
let updater;
function initColors(init) {
    const hsv = rgbToHsv(hexToRgb(init));
    h = hsv.h;
    s = hsv.s;
    v = hsv.v;
    a = hsv.a ?? 1;
    x = s * 100;
    y = (1 - v) * 100;
}
$: updater = _debounce((h, x, y, a) => (color = rgbToHex(hsvToRgb({ h, s: x / 100, v: (100 - y) / 100, a }))), debounce);
// function updateColor(h: number, x: number, y: number, a: number) {
//   color = rgbToHex(hsvToRgb({ h, s: x / 100, v: (100 - y) / 100, a }));
// }
$: initColors(color);
$: updater(h, x, y, a);
function actionToneInteraction(node) {
    function clamp(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }
    function updatePosition(event) {
        const { pageX, pageY } = event instanceof MouseEvent ? event : event.changedTouches[0];
        const { left, top, width, height } = node.getBoundingClientRect();
        x = clamp((pageX - left - window.scrollX) / width, 0, 1) * 100;
        y = clamp((pageY - top - window.scrollY) / height, 0, 1) * 100;
    }
    function preventClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    function handlePointerMoveStart(event) {
        document.addEventListener('mousemove', handlePointerMove);
        document.addEventListener('touchmove', handlePointerMove);
        document.addEventListener('mouseup', handlePinterMoveEnd);
        document.addEventListener('touchend', handlePinterMoveEnd);
        document.addEventListener('click', preventClick, { capture: true });
        updatePosition(event);
        event.preventDefault();
    }
    function handlePointerMove(event) {
        updatePosition(event);
    }
    function handlePinterMoveEnd() {
        document.removeEventListener('mousemove', handlePointerMove);
        document.removeEventListener('touchmove', handlePointerMove);
        document.removeEventListener('mouseup', handlePinterMoveEnd);
        document.removeEventListener('touchend', handlePinterMoveEnd);
        setTimeout(() => {
            document.removeEventListener('click', preventClick, { capture: true });
        }, 0);
    }
    function handleKeyboardMove(event) {
        const step = 0.5;
        switch (event.code) {
            case 'ArrowUp':
                y = clamp(y - step, 0, 100);
                event.preventDefault();
                break;
            case 'ArrowDown':
                y = clamp(y + step, 0, 100);
                event.preventDefault();
                break;
            case 'ArrowLeft':
                x = clamp(x - step, 0, 100);
                event.preventDefault();
                break;
            case 'ArrowRight':
                x = clamp(x + step, 0, 100);
                event.preventDefault();
                break;
        }
    }
    node.addEventListener('mousedown', handlePointerMoveStart);
    node.addEventListener('touchstart', handlePointerMoveStart);
    node.addEventListener('keydown', handleKeyboardMove);
    return {
        destroy() {
            handlePinterMoveEnd();
            node.removeEventListener('mousedown', handlePointerMoveStart);
            node.removeEventListener('touchstart', handlePointerMoveStart);
            node.removeEventListener('keydown', handleKeyboardMove);
        }
    };
}
</script>

<div class={'colorpicker' + (classes ? ' ' + classes : '')} style={style || undefined}>
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
