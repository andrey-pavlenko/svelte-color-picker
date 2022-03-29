<script lang="ts">
  import '$lib/styles.sass';
  import { ColorPicker, ColorInput, ColorEditHsla, ColorEdit } from '$lib';
  import ColorEditHex from '$lib/components/ColorEditHex.svelte';
  import ColorEditRgba from '$lib/components/ColorEditRgba.svelte';

  const colors = ['#FF6F00', '#3DB503', '#035FA1', '#ffffff', '#fff0ff'];

  let color = '#00f';

  function handleCapturePointerClick(event: Event) {
    console.info(event.target instanceof HTMLElement ? event.target.textContent : event.target);
  }
</script>

<h1 style="color: {color};">Welcome to SvelteKit</h1>

<div style="background-color: silver; padding: 2rem;">
  {#each colors as color, index}
    <div style="display: inline-block; margin: 0 1rem; box-sizing: border-box;">
      <h2 style="color: {color}; padding: 0; margin: 0">Color {index + 1}</h2>
      <div style="background-color: white; padding: 0.25em; height: 2em;">
        <ColorInput style="height: 32px" bind:color debounce={10} />
      </div>
    </div>
  {/each}
</div>

<div style="margin-bottom: 1em; height: 2em;">
  <ColorInput style="height: 32px" bind:color open={true}>
    <ColorEdit
      style="padding: var(--ci-dropdown-padding); border-top: var(--ci-border);"
      bind:color
    />
  </ColorInput>
</div>
<div style="width: 300px;">
  <ColorPicker style="border: 1px solid red; padding: 8px;" bind:color />
  <!-- <ColorPicker style="border: 1px solid red; padding: 8px;" bind:color debounce={1000} /> -->
</div>
<div style="margin-top: 1em;">
  <button on:click={() => (color = '#f00')}>#f00</button>
  <button on:click={() => (color = '#ff0')}>#ff0</button>
  <button on:click={() => (color = '#ffc400')}>#ffc400</button>
  <button on:click={() => (color = '#00619f')}>#00619f</button>
  <button on:click={() => (color = '#8226657a')}>#8226657a</button>
  <span>{color}</span>
  <span style="display: inline-block; height: 32px; width: 64px; background-color: {color};" />
</div>

<div style="margin: 1em 0 0 0; width: 300px">
  <ColorEdit bind:color />
</div>
<div style="margin: 1em 0 0 0;">
  <ColorEditHex bind:color />
</div>
<div style="margin: 1em 0 0 0;">
  <!-- <ColorEditRgba color={''} /> -->
  <ColorEditRgba bind:color />
</div>
<div style="margin: 1em 0 0 0">
  <ColorEditHsla bind:color />
</div>

{#each Array(10).fill('') as _}
  <p>
    Lorem ipsum
    <mark on:click={handleCapturePointerClick}>dolor</mark>
    sit amet consectetur adipisicing elit.
    <mark on:click={handleCapturePointerClick}>Tempora</mark>
    temporibus ad quo eius? Vel debitis suscipit mollitia atque fugit blanditiis repellendus impedit,
    illum officia soluta non
    <mark on:click={handleCapturePointerClick}>consequatur.</mark>Adipisci, eius asperiores.
  </p>
{/each}
