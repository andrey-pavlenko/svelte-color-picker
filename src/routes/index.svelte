<script lang="ts">
  import '@lib/styles.sass';
  import { ColorPicker, ColorInput } from '@lib';

  let color = '#00f';
</script>

<h1 style="color: {color};">Welcome to SvelteKit</h1>
<div style="margin-bottom: 1em;">
  <ColorInput bind:color />
</div>
<div style="width: 300px;">
  <ColorPicker bind:color />
</div>
<div style="margin-top: 1em;">
  <button on:click={() => (color = '#f00')}>#f00</button>
  <button on:click={() => (color = '#ff0')}>#ff0</button>
  <button on:click={() => (color = '#ffc400')}>#ffc400</button>
  <button on:click={() => (color = '#00619f')}>#00619f</button>
  <button on:click={() => (color = '#822665')}>#822665s</button>
  <span>{color}</span>
  <span style="display: inline-block; height: 32px; width: 64px; background-color: {color};" />
</div>
