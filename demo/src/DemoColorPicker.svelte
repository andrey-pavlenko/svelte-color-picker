<script lang="ts">
  import { ColorPicker } from 'svelte-color-picker/src/lib';
  import 'svelte-color-picker/src/lib/components/ColorPicker.sass';

  export let demoColors: string[] = [];

  let cpColor = '#f00';
  let cpDebounce = 0;
</script>

<section>
  <h2>ColorPicker</h2>
  <ColorPicker class="border border-gray-400 p-3" bind:color={cpColor} bind:debounce={cpDebounce} />
  <div class="my-3">
    <div>Picked color: <code>{cpColor}</code></div>
    <div class="h-[32px]" style="background-color: {cpColor};" />
    <div>
      Set color
      {#each demoColors as color}
        <span
          on:click={() => (cpColor = `#${color}`)}
          class="mr-1 cursor-pointer underline"
          style="color: #{color};">#{color}</span
        >
      {/each}
    </div>
  </div>

  <div class="my-3">
    <h3>Code example</h3>
    <pre class="px-4 py-1 m-0">&lt;ColorPicker
  class="some-class-name"
  bind:color bind:debounce /&gt;</pre>
  </div>
  <h3>Params</h3>
  <table>
    <tr>
      <td><code>class?: string</code></td>
      <td>Custom class</td>
    </tr>
    <tr>
      <td><code>style?: string</code></td>
      <td>Custom styles for root element</td>
    </tr>
    <tr>
      <td><code>color?: string</code></td>
      <td>Current color, default <code>#000</code></td>
    </tr>
    <tr>
      <td><code>debounce?: number</code></td>
      <td>Color update debounce time, default <code>0</code></td>
    </tr>
  </table>
  <p>Styles defined in <code>src/lib/components/ColorPicker.sass</code></p>
</section>
