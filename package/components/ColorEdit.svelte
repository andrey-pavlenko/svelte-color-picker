<script >import ColorEditHex from './ColorEditHex.svelte';
import ColorEditHsla from './ColorEditHsla.svelte';
import ColorEditRgba from './ColorEditRgba.svelte';
let classes = '';
export { classes as class };
export let style = undefined;
export let color = '#000';
const editors = [
    {
        component: ColorEditHex,
        labels: ['Hex']
    },
    {
        component: ColorEditRgba,
        labels: ['R', 'G', 'B', 'A']
    },
    {
        component: ColorEditHsla,
        labels: ['H', 'S', 'L', 'A']
    }
];
let currentEditor = editors[0];
function switchEditor(step) {
    let index = editors.indexOf(currentEditor) + step;
    if (index < 0) {
        index = editors.length - 1;
    }
    else if (index >= editors.length) {
        index = 0;
    }
    currentEditor = editors[index];
}
</script>

<div class={'coloredit' + (classes ? ' ' + classes : '')} style={style || undefined}>
  <div class="ce__grid" style="--ce--columns: {currentEditor.labels.length}">
    <svelte:component this={currentEditor.component} bind:color />
    {#each currentEditor.labels as label}
      <span class="ce__grid--label">{label}</span>
    {/each}
  </div>
  <div class="ce__switch-buttons">
    <div class="button--up" on:click={() => switchEditor(-1)} />
    <div class="button--down" on:click={() => switchEditor(1)} />
  </div>
</div>
