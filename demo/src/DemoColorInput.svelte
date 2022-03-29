<script lang="ts">
  import { ColorInput } from 'svelte-color-picker/src/lib';
  import ColorEdit from 'svelte-color-picker/src/lib/components/ColorEdit.svelte';
  import 'svelte-color-picker/src/lib/components/ColorInput.sass';

  export let demoColors: string[] = [];

  let ciColor = '#0F0';
  let ciDebounce = 0;
</script>

<section class="border-t-2 border-gray-600">
  <h2>ColorInput</h2>
  <ColorInput class="h-[32px]" bind:color={ciColor} bind:debounce={ciDebounce}>
    <ColorEdit
      class="text-xs"
      style="padding: var(--ci-dropdown-padding); border-top: var(--ci-border);"
      bind:color={ciColor}
    />
  </ColorInput>
  <div class="my-3">
    <div>Picked color: <code>{ciColor}</code></div>
    <div class="h-[32px]" style="background-color: {ciColor};" />
    <div>
      Set color
      {#each demoColors as color}
        <span
          on:click={() => (ciColor = `#${color}`)}
          class="mr-1 cursor-pointer underline"
          style="color: #{color};">#{color}</span
        >
      {/each}
    </div>
  </div>

  <div class="my-3">
    <h3>Code example</h3>
    <pre class="px-4 py-1 m-0">&lt;ColorInput
  class="some-class-name"
  bind:color bind:debounce open=&lcub;false&rcub;
    &lt;ColorEdit
      class="some-class"
      style="padding: var(--ci-dropdown-padding); border-top: var(--ci-border);"
      bind:color /&gt;
    &lt;/ColorInput&gt;</pre>
  </div>
  <h3>Params</h3>
  <table>
    <tr>
      <td><code>class?: string</code></td>
      <td>Custom class for root element</td>
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
    <tr>
      <td><code>open?: boolean</code></td>
      <td>Is color picker dropdown opened, default <code>false</code></td>
    </tr>
    <tr>
      <td colspan="2">Component contains default <code>&lt;slot /&gt;</code></td>
    </tr>
  </table>
  <p>Styles defined in <code>src/lib/components/ColorInput.sass</code></p>
</section>
