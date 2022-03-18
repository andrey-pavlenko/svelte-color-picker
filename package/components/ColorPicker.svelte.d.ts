import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        class?: string;
        color?: string;
        debounce?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ColorPickerProps = typeof __propDef.props;
export declare type ColorPickerEvents = typeof __propDef.events;
export declare type ColorPickerSlots = typeof __propDef.slots;
export default class ColorPicker extends SvelteComponentTyped<ColorPickerProps, ColorPickerEvents, ColorPickerSlots> {
}
export {};
