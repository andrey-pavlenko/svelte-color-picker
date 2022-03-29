<script lang="ts">
  import { isHexValid } from '../converter';

  export let color = '#000';
  export let placeholder = '#000';

  let hex: string;
  $: hex = isHexValid(color) ? color : '';

  function updateColor(hex: string) {
    if (isHexValid(hex)) {
      color = hex;
    }
  }
</script>

<input
  class="coloredit__hex"
  type="text"
  {placeholder}
  value={hex}
  on:change={(event) => updateColor(event.currentTarget.value)}
/>
