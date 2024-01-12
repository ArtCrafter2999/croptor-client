import {PresetSize} from "./Sizes";

export type Preset = {
    id?: string;
    name: string;
    sizes: PresetSize[];
}