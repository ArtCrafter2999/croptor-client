import {ClientBase} from "./ClientBase";
import {WayForPayRequest} from "../models/WayForPayRequest";

export class OrdersController extends ClientBase {
    create(amount: number): Promise<WayForPayRequest> {
        let url = `/orders`;

        const content = JSON.stringify({amount});

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            }
        };

        return this.sendRequest({url, options});
    }
}