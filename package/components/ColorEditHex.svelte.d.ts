import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        color?: string;
        placeholder?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ColorEditHexProps = typeof __propDef.props;
export declare type ColorEditHexEvents = typeof __propDef.events;
export declare type ColorEditHexSlots = typeof __propDef.slots;
export default class ColorEditHex extends SvelteComponentTyped<ColorEditHexProps, ColorEditHexEvents, ColorEditHexSlots> {
}
export {};
