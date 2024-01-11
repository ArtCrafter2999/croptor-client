type FilesDictionary = { [fileName: string]: File };
type ImageDataDictionary = { [fileName: string]: ImageParams };
type SizesDictionary = { [fileName: string]: Size };
export type Position = { x: number, y: number };

export type Horizontal = "Left" | "Center" | "Right";
export type Vertical = "Top" | "Center" | "Bottom";

export type GlobalParams = {
    useDefault: boolean;
    horizontalSnap: Horizontal;
    verticalSnap: Vertical;
    fitNCrop: boolean;
}
export type Parameters = GlobalParams & {
    centerPosition: Position | null;
}
export type ImageParams = Parameters & {
    image: string
    name: string
}
export type Size = {
    width: number,
    height: number,
}
export type PresetSize = CategorySize & {
    icon: string;
}
export type Preset = {
    name: string;
    sizes: PresetSize[];
}
export type Category = {
    icon: string;
    name: string;
    sizes: CategorySize[];
}
export type CategorySize = {
    name?: string;
    size: Size
}

export type ReducerState = {
    defaultParams: GlobalParams;
    imageDataDictionary: ImageDataDictionary;
    sizesDictionary: SizesDictionary;
    filesDictionary: FilesDictionary;
    selectedPreset: Preset;
    defaultSizes: Category[]
    customSizes: Size[]
}

export type Action =
    { action: "defaultParams", value: GlobalParams } |
    { action: "imageParams", value: ImageParams } |
    { action: "saveImageSize", value: { name: string, size: Size } } |
    { action: "addFiles", value: File[] } |
    { action: "resetFiles" } |
    { action: "removeImage", value: string } |
    { action: "addSizeToPreset", value: PresetSize } |
    { action: "removeSizeFromPreset", value: { name?: string, size: Size } } |
    { action: "addCustomSize", value: Size } |
    { action: "removePreset" } |
    { action: "changePresetTitle", value: string }


function reducer(state: ReducerState, action: Action): ReducerState {
    switch (action.action) {
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
        s.size.width === value.size.width &&
        s.size.height === value.size.height);
    if (index < 0) return state;
    selectedPreset.sizes.splice(index, 1);
    return {...state, selectedPreset}
}

function addCustomSize(state: ReducerState, value: Size): ReducerState {
    const customSizes = [...state.customSizes];
    if (customSizes.findIndex(v => v.height === value.height && v.width === value.width) > -1)
        return state;
    customSizes.push(value);
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