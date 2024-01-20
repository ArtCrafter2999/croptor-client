import {Api} from "../api/Api";
import {CategorySize, PresetSize, Size} from "../models/Sizes";
import {Preset} from "../models/Preset";
import {GlobalParams, ImageParams, ImageParamsDictionary} from "../models/Params";
import defaultSizes from "../defaultSizes.json";

type FilesDictionary = { [fileName: string]: File };
type SizesDictionary = { [fileName: string]: Size };
export type Position = { x: number, y: number };

export type Category = {
    id?: string
    iconUri: string;
    name: string;
    sizes: CategorySize[];
}

export type ReducerState = {
    defaultParams: GlobalParams;
    imageDataDictionary: ImageParamsDictionary;
    sizesDictionary: SizesDictionary;
    filesDictionary: FilesDictionary;
    selectedPreset: Preset;
    defaultSizes: Category[];
    customSizes: Size[];
    api: Api | null;
    presetIds: string[];
    presets: Preset[];
}

export async function LoadData(): Promise<ReducerState> {
    const api: Api | null =
        new Api(process.env.REACT_APP_API_URI as string, process.env.REACT_APP_AUTHORITY as string);
    // null as Api | null;

    let presets: string[]
    let selectedPreset: Preset
    let customSizes: Size[]
    let categories: Category[];

    if (api) {
        presets = await api.presets.getPresets().catch(() => []);
        selectedPreset = presets.length > 0 ?
            await api.presets.getPreset(presets[0]) :
            {name: "new preset", sizes: []};
        customSizes = await api.presets.getCustomSizes().catch(() => []);
        categories = await api.defaultSizes.getCategories().catch(() => defaultSizes as Category[]);
    } else {
        presets = [];
        selectedPreset = {name: "new preset", sizes: []};
        customSizes = [];
        categories = defaultSizes as Category[];
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
        defaultSizes: categories,
        customSizes,
        api,
        presetIds: presets,
        presets: [selectedPreset],
    };
}

export type Action =
    { action: "updateState", value: ReducerState } |
    { action: "defaultParams", value: GlobalParams } |
    { action: "imageParams", value: ImageParams } |
    { action: "saveImageSize", value: { name: string, size: Size } } |
    { action: "addFiles", value: File[] } |
    { action: "resetFiles", value: "Free" | "Pro" | "Admin" } |
    { action: "removeImage", value: string } |
    { action: "addSizeToPreset", value: PresetSize } |
    { action: "removeSizeFromPreset", value: { name?: string, size: Size } } |
    { action: "addCustomSize", value: Size } |
    { action: "removeCustomSize", value: Size } |
    { action: "removePreset", value: number } |
    { action: "selectPreset", value: number } |
    { action: "handlePresetLoaded", value: { preset: Preset, index: number } } |
    { action: "changePresetTitle", value: { index: number, title: string } } |
    { action: "createPreset" } |
    { action: "addSize", value: {categoryId: string, size: PresetSize}} |
    { action: "addCategory", value: {id: string, name: string, icon?: string}} |
    { action: "removeSize", value: {categoryId: string, size: PresetSize}} |
    { action: "removeCategory", value: {categoryId: string}} |
    { action: "editSize", value: {categoryId: string, oldSize: PresetSize, newSize: PresetSize}} |
    { action: "editCategory", value: {id: string, name: string, icon?: string}}

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
            return ResetFiles(state, action.value);
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
        case "changePresetTitle":
            return changePresetTitle(state, action.value);
        case "selectPreset":
            return selectPreset(state, action.value);
        case "handlePresetLoaded":
            return handlePresetLoaded(state, action.value);
        case "removePreset":
            return removePreset(state, action.value);
        case "createPreset":
            return createPreset(state);
        case "addSize":
            return addSize(state, action.value);
        case "addCategory":
            return addCategory(state, action.value);
        case "removeSize":
            return removeSize(state, action.value);
        case "removeCategory":
            return removeCategory(state, action.value);
        case "editSize":
            return editSize(state, action.value);
        case "editCategory":
            return editCategory(state, action.value);
    }
}

function defaultParams(state: ReducerState, params: GlobalParams): ReducerState {
    const defaultParams = params;
    if (state.defaultParams.useDefault !== params.useDefault) {
        const imageDataDictionary = {...state.imageDataDictionary};
        const imageDataKeys = Object.keys(imageDataDictionary);
        for (const key of imageDataKeys) {
            imageDataDictionary[key].useDefault = params.useDefault
        }
        return {...state, defaultParams, imageDataDictionary};
    }
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

function ResetFiles(state: ReducerState, plan: "Free" | "Pro" | "Admin"): ReducerState {
    if (plan === "Free") {
        const selectedPreset = {...state.selectedPreset}
        selectedPreset.sizes = []
        const presets = [selectedPreset];
        return {...state, filesDictionary: {}, imageDataDictionary: {}, presets, selectedPreset}
    }
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
    customSizes.splice(index, 1)
    state.api?.presets.removeCustomSize(value);
    return {...state, customSizes};
}

function changePresetTitle(state: ReducerState, {index, title}: { index: number, title: string }): ReducerState {
    const selectedPreset: Preset = {...state.selectedPreset, name: title};
    const presets = [...state.presets];
    presets[index] = selectedPreset;
    return {...state, selectedPreset, presets}
}

function selectPreset(state: ReducerState, value: number): ReducerState {
    const selectedPreset = state.presets[value];
    // console.log(state.presets[value]);
    return {...state, selectedPreset};
}

function handlePresetLoaded(state: ReducerState, {preset, index}: { preset: Preset; index: number }): ReducerState {
    const presets = [...state.presets]
    presets[index] = preset;
    return {...state, presets};
}

function removePreset(state: ReducerState, index: number): ReducerState {
    const presets = [...state.presets];
    const presetIds = [...state.presetIds];
    //{name: "new preset", sizes: []};
    if (index >= 0 && index < presets.length) {
        presets.splice(index, 1);
        presetIds.splice(index, 1);
        if (presets.length === 0) {
            return createPreset({...state, presets, presetIds});
        } else {
            let selectedPreset: Preset;
            if (presets[index]) {
                selectedPreset = presets[index];
            } else {
                selectedPreset = presets[index - 1];
            }
            return {...state, presets, presetIds, selectedPreset}
        }
    }
    return state;
}

function createPreset(state: ReducerState): ReducerState {
    const presets = [...state.presets];
    const selectedPreset = {name: "new preset", sizes: []};
    presets.push(selectedPreset);
    return {...state, presets, selectedPreset}
}

function addSize(state: ReducerState, value: { categoryId: string; size: PresetSize }) : ReducerState {
    const defaultSizes = {...state.defaultSizes}
    const index = defaultSizes.findIndex(c => c.id === value.categoryId);
    if(index >= 0) {
        defaultSizes[index].sizes.push(value.size)
    }
    return {...state, defaultSizes};
}
function addCategory(state: ReducerState, value: { id: string, name: string; icon?: string }) : ReducerState {
    const defaultSizes = {...state.defaultSizes}
    defaultSizes.push({id: value.id, name: value.name, iconUri: value.icon ?? "icons/custom-size.svg", sizes: []});
    return {...state, defaultSizes};
}

function removeSize(state: ReducerState, value: { categoryId: string; size: PresetSize }) : ReducerState {
    const defaultSizes = {...state.defaultSizes}
    const index = defaultSizes.findIndex(c => c.id === value.categoryId);
    if(index >= 0) {
        const sIndex = defaultSizes[index].sizes.findIndex(s =>
            s.width === value.size.width &&
            s.height === value.size.height &&
            s.name === value.size.name
        );
        defaultSizes[index].sizes.splice(sIndex, 1);
    }
    return {...state, defaultSizes};
}

function removeCategory(state: ReducerState, value: { categoryId: string }) : ReducerState{
    const defaultSizes = {...state.defaultSizes}
    const index = defaultSizes.findIndex(c => c.id === value.categoryId);
    defaultSizes.splice(index, 1);
    return {...state, defaultSizes};
}

function editSize(state: ReducerState, value: { categoryId: string; oldSize: PresetSize; newSize: PresetSize }) : ReducerState {
    const defaultSizes = {...state.defaultSizes}
    const index = defaultSizes.findIndex(c => c.id === value.categoryId);
    if(index >= 0) {
        const sIndex = defaultSizes[index].sizes.findIndex(s =>
            s.width === value.oldSize.width &&
            s.height === value.oldSize.height &&
            s.name === value.oldSize.name
        );
        defaultSizes[index].sizes[sIndex] = value.newSize;
    }
    return {...state, defaultSizes};
}

function editCategory(state: ReducerState, value: { id: string; name: string; icon?: string }) : ReducerState {
    const defaultSizes = {...state.defaultSizes}
    const index = defaultSizes.findIndex(c => c.id === value.id);
    defaultSizes[index].name = value.name;
    defaultSizes[index].iconUri = value.icon ?? "icons/custom-size.svg";
    return {...state, defaultSizes};
}

export default reducer;