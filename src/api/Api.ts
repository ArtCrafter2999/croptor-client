import {PresetsController} from "./PresetsController";
import {ImagesController} from "./ImagesController";
import {UserController} from "./UserController";
import {OrdersController} from "./OrdersController";


export class Api {
    constructor(baseUrl:string) {
        this.presets = new PresetsController(baseUrl);
        this.images = new ImagesController(baseUrl);
        this.user = new UserController(baseUrl);
        this.orders = new OrdersController(baseUrl);
    }
    public presets: PresetsController;
    public images: ImagesController;
    public user: UserController;
    public orders: OrdersController;
}
