<script lang="ts">
  import '@lib/components/ColorPicker.sass';
  import { ColorPicker } from '@lib';

  let init = '#00f';
  let color = init;
</script>

<h1 style="color: {color};">Welcome to SvelteKit</h1>
<div style="width: 300px;">
  <ColorPicker bind:init bind:color />
</div>
<div style="margin-top: 1em;">
  <button on:click={() => (init = '#f00')}>#f00</button>
  <button on:click={() => (init = '#ff0')}>#ff0</button>
  <button on:click={() => (init = '#ffc400')}>#ffc400</button>
  <button on:click={() => (init = '#00619f')}>#00619f</button>
  <button on:click={() => (init = '#822665')}>#822665s</button>
  <span>{color}</span>
  <span style="display: inline-block; height: 32px; width: 64px; background-color: {color};" />
</div>
