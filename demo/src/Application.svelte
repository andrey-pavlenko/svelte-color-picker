<script lang="ts">
  import DemoColorPicker from './DemoColorPicker.svelte';
  import DemoColorInput from './DemoColorInput.svelte';
  import DemoColorEdit from './DemoColorEdit.svelte';

  const demoColors = ['898049', 'a78037', '2f7108', '5fb599', '143f89e9', 'a908d6', 'd6087b83'];
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

  <DemoColorPicker {demoColors} />
  <DemoColorInput {demoColors} />
  <DemoColorEdit {demoColors} />

  <blockquote>
    <div>
      The library also contains functions for converting colors to various color models. See <code
        >src/lib/converter.ts</code
      >.
    </div>
  </blockquote>
</main>
