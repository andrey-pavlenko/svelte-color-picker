<script lang="ts">
  import ColorPicker from './ColorPicker.svelte';

  let classes = '';
  export { classes as class };
  export let color = '#000';
  export let isOpen = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function actionInteraction(node: HTMLElement, _: boolean) {
    function handleKeyboardClose(event: KeyboardEvent) {
      switch (event.code) {
        case 'Tab':
          setTimeout(() => {
            if (!node.contains(document.activeElement)) {
              isOpen = false;
            }
          }, 0);
          break;
        case 'Escape':
        case 'Enter':
        case 'NumpadEnter':
          isOpen = false;
          break;
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (event.target instanceof Node) {
        console.info('handleClickOutside', event.currentTarget, event.target);
        if (!node.contains(event.target)) {
          isOpen = false;
        }
      }
    }

    return {
      destroy() {
        console.info('actionInteraction destroy');
        document.removeEventListener('keyup', handleKeyboardClose);
        document.removeEventListener('click', handleClickOutside);
      },
      update(opened: boolean) {
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
        console.info('actionInteraction update', opened);
      }
    };
  }
</script>

<div class={'colorinput' + (classes ? ' ' + classes : '')} use:actionInteraction={isOpen}>
  <div
    class="ci__input"
    tabindex="0"
    style="--ci-current-color: {color}"
    on:click={() => (isOpen = !isOpen)}
  >
    <div class="ci__input--indicator" />
  </div>
  {#if isOpen}
    <div class="ci__picker">
      <ColorPicker bind:color />
    </div>
  {/if}
</div>
