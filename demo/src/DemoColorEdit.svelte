<script lang="ts">
  import 'svelte-color-picker/src/lib/components/ColorEdit.sass';
  import './DemoColorEdit.css';
  import { ColorEditHex, ColorEditHsla, ColorEditRgba } from 'svelte-color-picker/src/lib';
  import ColorEdit from 'svelte-color-picker/src/lib/components/ColorEdit.svelte';

  export let demoColors: string[] = [];

  let ceColor = '#00ff00';
</script>

<section class="border-t-2 border-gray-600">
  <h2>Color editors</h2>

  <div class="my-3">
    <div>Picked color: <code>{ceColor}</code></div>
    <div class="h-[32px]" style="background-color: {ceColor};" />
    <div>
      Set color
      {#each demoColors as color}
        <span
          on:click={() => (ceColor = `#${color}`)}
          class="mr-1 cursor-pointer underline"
          style="color: #{color};">#{color}</span
        >
      {/each}
    </div>
  </div>

  <h3 class="mt-2 text-indigo-600">ColorEditHex</h3>
  <ColorEditHex bind:color={ceColor} />

  <div>
    <div class="font-bold text-md mt-2">Code example</div>
    <pre class="px-4 py-1 m-0">&lt;ColorEditHex placeholder="#000000" bind:color /&gt;</pre>
  </div>
  <div class="font-bold text-md mt-2">Params</div>
  <table class="m-0">
    <tr>
      <td><code>placeholder?: string</code></td>
      <td>default <code>#000</code></td>
    </tr>
    <tr>
      <td><code>color?: string</code></td>
      <td>Current color, default <code>#000</code></td>
    </tr>
  </table>

  <h3 class="mt-2 text-indigo-600">ColorEditRgba</h3>
  <div>
    <ColorEditRgba bind:color={ceColor} />
  </div>
  <div>
    <div class="font-bold text-md mt-2">Code example</div>
    <pre class="px-4 py-1 m-0">&lt;ColorEditRgba bind:color /&gt;</pre>
  </div>
  <div class="font-bold text-md mt-2">Params</div>
  <table class="m-0">
    <tr>
      <td><code>color?: string</code></td>
      <td>Current color, default <code>#000</code></td>
    </tr>
  </table>

  <h3 class="mt-2 text-indigo-600">ColorEditHsla</h3>
  <div>
    <ColorEditHsla bind:color={ceColor} />
  </div>
  <div>
    <div class="font-bold text-md mt-2">Code example</div>
    <pre class="px-4 py-1 m-0">&lt;ColorEditHsla bind:color /&gt;</pre>
  </div>
  <div class="font-bold text-md mt-2">Params</div>
  <table class="m-0">
    <tr>
      <td><code>color?: string</code></td>
      <td>Current color, default <code>#000</code></td>
    </tr>
  </table>

  <h3 class="mt-2 text-indigo-600">ColorEdit</h3>
  <div>
    <ColorEdit bind:color={ceColor} />
  </div>
  <div>
    <div class="font-bold text-md mt-2">Code example</div>
    <pre class="px-4 py-1 m-0">&lt;ColorEdit class="some-class-name" bind:color /&gt;</pre>
  </div>
  <div class="font-bold text-md mt-2">Params</div>
  <table class="m-0">
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
  </table>

  <p>Styles defined in <code>src/lib/components/ColorEdit.sass</code></p>
</section>
