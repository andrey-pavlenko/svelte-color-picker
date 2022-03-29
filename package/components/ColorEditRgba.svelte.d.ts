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
export declare type ColorEditRgbaProps = typeof __propDef.props;
export declare type ColorEditRgbaEvents = typeof __propDef.events;
export declare type ColorEditRgbaSlots = typeof __propDef.slots;
export default class ColorEditRgba extends SvelteComponentTyped<ColorEditRgbaProps, ColorEditRgbaEvents, ColorEditRgbaSlots> {
}
export {};
