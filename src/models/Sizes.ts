export type Size = {
    width: number,
    height: number,
}
export type CategorySize = Size & {
    name?: string;
}
export type PresetSize = CategorySize & {
    icon: string;
}
