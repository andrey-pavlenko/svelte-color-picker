<script lang="ts">
  import { ColorPicker, ColorInput } from 'svelte-color-picker/src/lib';
  import 'svelte-color-picker/src/lib/components/ColorPicker.sass';
  import 'svelte-color-picker/src/lib/components/ColorInput.sass';

  let cpColor = '#f00';
  let cpDebounce = 0;
  const demoColors = ['898049', 'a78037', '2f7108', '5fb599', '143f89e9', 'a908d6', 'd6087b83'];
  let ciColor = '#0F0';
  let ciDebounce = 0;
</script>

<main class="prose mx-auto">
  <h1>Components</h1>

  <blockquote>
    <div><strong>Note!</strong></div>
    <div>
      Components use only hexadecimal colors, for example <code>#000</code>, <code>#f1f2f3</code>.
    </div>
    <div>
      Don't use named colors like <code>red</code>, or <code>rgb(128,128,128)</code>
    </div>
  </blockquote>

  <section>
    <h2>ColorPicker</h2>
    <ColorPicker
      class="border border-gray-400 p-3"
      bind:color={cpColor}
      bind:debounce={cpDebounce}
    />
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

  <section class="border-t-2 border-gray-600">
    <h2>ColorInput</h2>
    <ColorInput class="h-[32px]" bind:color={ciColor} bind:debounce={ciDebounce} />
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
  bind:color bind:debounce isOpen=&lcub;false&rcub; /&gt;</pre>
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
        <td><code>isOpen?: boolean</code></td>
        <td>Is color picker dropdown opened, default <code>false</code></td>
      </tr>
    </table>
    <p>Styles defined in <code>src/lib/components/ColorInput.sass</code></p>
  </section>

  <blockquote>
    <div>
      The library also contains functions for converting colors to various color models. See <code
        >src/lib/converter.ts</code
      >.
    </div>
  </blockquote>
</main>
