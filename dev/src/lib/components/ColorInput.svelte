<script lang="ts">
  import ColorPicker from './ColorPicker.svelte';

  let classes = '';
  export { classes as class };
  export let style: string | undefined = undefined;
  export let color = '#000';
  export let debounce = 0;
  export let open = false;

  function actionInteraction(node: HTMLElement, opened: boolean) {
    function handleKeyboardClose(event: KeyboardEvent) {
      switch (event.code) {
        case 'Tab':
          setTimeout(() => {
            if (!node.contains(document.activeElement)) {
              open = false;
            }
          }, 0);
          break;
        case 'Escape':
        case 'Enter':
        case 'NumpadEnter':
          open = false;
          break;
      }
    }

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (event.target instanceof Node) {
        if (!node.contains(event.target)) {
          open = false;
        }
      }
    }

    function handleOpenUpdate(opened: boolean) {
      if (opened) {
        document.addEventListener('keyup', handleKeyboardClose);
        setTimeout(() => {
          node
            .closest('.colorinput')
            ?.querySelector<HTMLElement | null>('.colorpicker .cp__tone')
            ?.focus();
          document.addEventListener('click', handleClickOutside);
        }, 0);
      } else {
        document.removeEventListener('keyup', handleKeyboardClose);
        document.removeEventListener('click', handleClickOutside);
      }
    }

    handleOpenUpdate(opened);

    return {
      destroy() {
        document.removeEventListener('keyup', handleKeyboardClose);
        document.removeEventListener('click', handleClickOutside);
      },
      update: handleOpenUpdate
    };
  }
</script>

<div
  class={'colorinput' + (classes ? ' ' + classes : '')}
  style={style || undefined}
  use:actionInteraction={open}
  class:is-open={open}
>
  <div
    class="ci__input"
    tabindex="0"
    style="--ci-current-color: {color}"
    on:pointerdown={() => (open = !open)}
  >
    <div class="ci__input--indicator" />
  </div>
  {#if open}
    <div class="ci__dropdown">
      <ColorPicker bind:color {debounce} />
      <slot />
    </div>
  {/if}
</div>
