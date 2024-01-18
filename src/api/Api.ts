import {PresetsController} from "./PresetsController";
import {ImagesController} from "./ImagesController";
import {UserController} from "./UserController";
import {OrdersController} from "./OrdersController";
import {DefaultSizesController} from "./DefaultSizesController";


export class Api {
    constructor(baseUrl:string, authUrl: string) {
        this.presets = new PresetsController(baseUrl);
        this.images = new ImagesController(baseUrl);
        this.user = new UserController(baseUrl);
        this.orders = new OrdersController(authUrl);
        this.defaultSizes = new DefaultSizesController(baseUrl);
    }
    public presets: PresetsController;
    public images: ImagesController;
    public user: UserController;
    public orders: OrdersController;
    public defaultSizes: DefaultSizesController
}
