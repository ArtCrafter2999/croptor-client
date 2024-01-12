import {Horizontal, Vertical} from "./Alignment";
import {Position} from "../reducer/reducer";

export type BaseParams = {
    horizontalSnap: Horizontal;
    verticalSnap: Vertical;
    fitNCrop: boolean;
}
export type ImageParamsDto = BaseParams & {
    centerPosition: Position | null;
}

export type GlobalParams = BaseParams & {
    useDefault: boolean;
}
export type Parameters = GlobalParams & {
    centerPosition: Position | null;
}
export type ImageParams = Parameters & {
    image: string
    name: string
}
export type ImageParamsDictionary = { [fileName: string]: ImageParams };