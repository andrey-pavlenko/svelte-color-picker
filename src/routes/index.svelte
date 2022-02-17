<script lang="ts">
  import '@lib/styles.sass';
  import { ColorPicker, ColorInput } from '@lib';

  const colors = ['#FF6F00', '#3DB503', '#035FA1', '#ffffff', '#ffffff'];

  let color = '#00f';
</script>

<h1 style="color: {color};">Welcome to SvelteKit</h1>

<div style="background-color: silver; padding: 2rem;">
  {#each colors as color, index}
    <div style="display: inline-block; margin: 0 1rem; box-sizing: border-box;">
      <h2 style="color: {color}; padding: 0; margin: 0">Color {index + 1}</h2>
      <div style="background-color: white; padding: 0.25em;">
        <ColorInput bind:color />
      </div>
    </div>
  {/each}
</div>

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
