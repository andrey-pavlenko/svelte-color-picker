<script lang="ts">
  import '@lib/components/ColorPicker.sass';
  import { ColorPicker } from '@lib';

  let color = '#00f';
</script>

<h1 style="color: {color};">Welcome to SvelteKit</h1>
<div style="width: 300px;">
  <ColorPicker bind:color />
</div>
