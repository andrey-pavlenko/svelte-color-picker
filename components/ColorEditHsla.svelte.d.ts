import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        color?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ColorEditHslaProps = typeof __propDef.props;
export declare type ColorEditHslaEvents = typeof __propDef.events;
export declare type ColorEditHslaSlots = typeof __propDef.slots;
export default class ColorEditHsla extends SvelteComponentTyped<ColorEditHslaProps, ColorEditHslaEvents, ColorEditHslaSlots> {
}
export {};
