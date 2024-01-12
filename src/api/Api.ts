import {PresetsController} from "./PresetsController";
import {ImagesController} from "./ImagesController";


export class Api {

    constructor(baseUrl:string) {
        this.presets = new PresetsController(baseUrl);
        this.images = new ImagesController(baseUrl);
    }
    public presets: PresetsController;
    public images: ImagesController;
}