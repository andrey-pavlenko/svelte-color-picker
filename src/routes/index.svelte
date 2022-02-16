<script lang="ts">
  import '@lib/components/ColorPicker.sass';
  import { ColorPicker } from '@lib';

  let color = '#00f';
</script>

<h1 style="color: {color};">Welcome to SvelteKit</h1>
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
</div>
