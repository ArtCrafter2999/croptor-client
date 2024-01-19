import {ClientBase} from "./ClientBase";
import {WayForPayRequest} from "../models/WayForPayRequest";

export class OrdersController extends ClientBase {
    create(amount: number): Promise<WayForPayRequest> {
        let url = `/orders?amount={amount}`;
        url.replace("{amount}", encodeURIComponent("" + amount));

        let options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            }
        };

        return this.sendRequest({url, options});
    }
}