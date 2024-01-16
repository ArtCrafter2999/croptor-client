import {Api} from "../api/Api";
import {CategorySize, PresetSize, Size} from "../models/Sizes";
import {Preset} from "../models/Preset";
import {GlobalParams, ImageParams, ImageParamsDictionary} from "../models/Params";
import defaultSizes from "../defaultSizes.json";

type FilesDictionary = { [fileName: string]: File };
type SizesDictionary = { [fileName: string]: Size };
export type Position = { x: number, y: number };

export type Category = {
    icon: string;
    name: string;
    sizes: CategorySize[];
}

export type ReducerState = {
    defaultParams: GlobalParams;
    imageDataDictionary: ImageParamsDictionary;
    sizesDictionary: SizesDictionary;
    filesDictionary: FilesDictionary;
    selectedPreset: Preset;
    defaultSizes: Category[]
    customSizes: Size[]
    api: Api | null
    presets: string[]
}

export async function LoadData(): Promise<ReducerState> {
    const api: Api | null =
        // new Api(process.env.REACT_APP_API_URI as string);
        null as Api | null;

    let presets: string[]
    let selectedPreset: Preset
    let customSizes: Size[]

    if (api) {
        presets = await api.presets.getPresets().catch(() => []);
        selectedPreset = presets.length > 0 ?
            await api.presets.getPreset(presets[0]) :
            {name: "new preset", sizes: []};
        customSizes = await api.presets.getCustomSizes().catch(() => []);
    } else {
        presets = [];
        selectedPreset = {name: "new preset", sizes: []};
        customSizes = [];
    }

    return {
        defaultParams: {
            useDefault: true,
            fitNCrop: true,
            horizontalSnap: "Center",
            verticalSnap: "Center"
        },
        imageDataDictionary: {},
        filesDictionary: {},
        sizesDictionary: {},
        selectedPreset,
        defaultSizes: defaultSizes as Category[],
        customSizes,
        api,
        presets: presets
    };
}

export type Action =
    { action: "updateState", value: ReducerState } |
    { action: "defaultParams", value: GlobalParams } |
    { action: "imageParams", value: ImageParams } |
    { action: "saveImageSize", value: { name: string, size: Size } } |
    { action: "addFiles", value: File[] } |
    { action: "resetFiles" } |
    { action: "removeImage", value: string } |
    { action: "addSizeToPreset", value: PresetSize } |
    { action: "removeSizeFromPreset", value: { name?: string, size: Size } } |
    { action: "addCustomSize", value: Size } |
    { action: "removeCustomSize", value: Size } |
    { action: "removePreset" } |
    { action: "changePresetTitle", value: string }


function reducer(state: ReducerState | null, action: Action): ReducerState | null {
    if (!state) {
        if (action.action === "updateState") return action.value;
        else return null;
    }
    switch (action.action) {
        case "updateState":
            return action.value;
        case "defaultParams":
            return defaultParams(state, action.value);
        case "imageParams":
            return imageParams(state, action.value);
        case "addFiles":
            return addFiles(state, action.value);
        case "saveImageSize":
            return saveImageSize(state, action.value);
        case "resetFiles":
            return ResetFiles(state);
        case "removeImage":
            return removeImage(state, action.value);
        case "addSizeToPreset":
            return addSizeToPreset(state, action.value);
        case "removeSizeFromPreset":
            return removeSizeFromPreset(state, action.value);
        case "addCustomSize":
            return addCustomSize(state, action.value)
        case "removeCustomSize":
            return removeCustomSize(state, action.value)
        case "removePreset":
            return removePreset(state);
        case "changePresetTitle":
            return changePresetTitle(state, action.value);
    }
}

function defaultParams(state: ReducerState, params: GlobalParams): ReducerState {
    const defaultParams = params
    return {...state, defaultParams};
}

function imageParams(state: ReducerState, data: ImageParams): ReducerState {
    const imageDataDictionary = {...state.imageDataDictionary};
    imageDataDictionary[data.name] = data;
    return {...state, imageDataDictionary};
}

function addFiles(state: ReducerState, value: File[]): ReducerState {
    const filesDictionary = {...state.filesDictionary};
    const imageDataDictionary = {...state.imageDataDictionary};
    for (const file of value) {
        const blob = URL.createObjectURL(file);
        filesDictionary[file.name] = file;
        imageDataDictionary[file.name] = {
            ...state.defaultParams,
            image: blob,
            name: file.name,
            centerPosition: null
        };
    }
    return {...state, filesDictionary, imageDataDictionary};
}

function saveImageSize(state: ReducerState, value: { name: string; size: Size }): ReducerState {
    const sizesDictionary = {...state.sizesDictionary};
    sizesDictionary[value.name] = value.size;
    return {...state, sizesDictionary};
}

function ResetFiles(state: ReducerState): ReducerState {
    return {...state, filesDictionary: {}, imageDataDictionary: {}};
}

function removeImage(state: ReducerState, value: string): ReducerState {
    const filesDictionary = {...state.filesDictionary};
    const imageDataDictionary = {...state.imageDataDictionary};
    delete filesDictionary[value];
    delete imageDataDictionary[value];
    return {...state, filesDictionary, imageDataDictionary};
}

function addSizeToPreset(state: ReducerState, value: PresetSize): ReducerState {
    const selectedPreset = {...state.selectedPreset}
    selectedPreset.sizes.push(value);
    return {...state, selectedPreset}
}

function removeSizeFromPreset(state: ReducerState, value: { name?: string; size: Size }): ReducerState {
    const selectedPreset = {...state.selectedPreset}
    const index = selectedPreset.sizes.findIndex(s =>
        s.name === value.name &&
        s.width === value.size.width &&
        s.height === value.size.height);
    if (index < 0) return state;
    selectedPreset.sizes.splice(index, 1);
    return {...state, selectedPreset}
}

function addCustomSize(state: ReducerState, value: Size): ReducerState {
    const customSizes = [...state.customSizes];
    if (customSizes.findIndex(v => v.height === value.height && v.width === value.width) > -1)
        return state;
    customSizes.push(value);
    state.api?.presets.addCustomSize(value);
    return {...state, customSizes};
}

function removeCustomSize(state: ReducerState, value: Size): ReducerState {
    const customSizes = [...state.customSizes];
    const index = customSizes.findIndex(s => value.width === s.width && value.height === s.width);
    customSizes.splice(index,1)
    state.api?.presets.removeCustomSize(value);
    return {...state, customSizes};
}

function removePreset(state: ReducerState): ReducerState {
    const selectedPreset: Preset = {name: "new preset", sizes: []};
    return {...state, selectedPreset}
}

function changePresetTitle(state: ReducerState, value: string): ReducerState {
    const selectedPreset: Preset = {name: value, sizes: state.selectedPreset.sizes};
    return {...state, selectedPreset}
}

export default reducer;