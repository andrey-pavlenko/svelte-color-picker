import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        class?: string;
        style?: string | undefined;
        color?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ColorEditProps = typeof __propDef.props;
export declare type ColorEditEvents = typeof __propDef.events;
export declare type ColorEditSlots = typeof __propDef.slots;
export default class ColorEdit extends SvelteComponentTyped<ColorEditProps, ColorEditEvents, ColorEditSlots> {
}
export {};
