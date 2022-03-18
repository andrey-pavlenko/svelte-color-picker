<script >import ColorPicker from './ColorPicker.svelte';
let classes = '';
export { classes as class };
export let style = undefined;
export let color = '#000';
export let debounce = 0;
export let isOpen = false;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function actionInteraction(node, _) {
    function handleKeyboardClose(event) {
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
    function handleClickOutside(event) {
        if (event.target instanceof Node) {
            if (!node.contains(event.target)) {
                isOpen = false;
            }
        }
    }
    return {
        destroy() {
            document.removeEventListener('keyup', handleKeyboardClose);
            document.removeEventListener('click', handleClickOutside);
        },
        update(opened) {
            if (opened) {
                document.addEventListener('keyup', handleKeyboardClose);
                setTimeout(() => {
                    node
                        .closest('.colorinput')
                        ?.querySelector('.colorpicker .cp__tone')
                        ?.focus();
                    document.addEventListener('click', handleClickOutside);
                }, 0);
            }
            else {
                document.removeEventListener('keyup', handleKeyboardClose);
                document.removeEventListener('click', handleClickOutside);
            }
        }
    };
}
</script>

<div
  class={'colorinput' + (classes ? ' ' + classes : '')}
  style={style || undefined}
  use:actionInteraction={isOpen}
  class:is-open={isOpen}
>
  <div
    class="ci__input"
    tabindex="0"
    style="--ci-current-color: {color}"
    on:pointerdown={() => (isOpen = !isOpen)}
  >
    <div class="ci__input--indicator" />
  </div>
  {#if isOpen}
    <div class="ci__picker">
      <ColorPicker bind:color {debounce} />
    </div>
  {/if}
</div>
