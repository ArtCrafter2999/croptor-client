import {ClientBase} from "./ClientBase";
import {User} from "../models/User";

export class UserController extends ClientBase {
    get (): Promise<User> {
        const url = "/user"

        let options: RequestInit = {
            method: "GET",
            headers: {}
        };

        return this.sendRequest({url, options});
    }
}