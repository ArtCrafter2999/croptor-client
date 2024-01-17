import {ClientBase} from "./ClientBase";
import {User, UserToSave} from "../models/User";

export class UserController extends ClientBase {
    get (): Promise<User> {
        const url = "/user"

        let options: RequestInit = {
            method: "GET",
            headers: {}
        };

        return this.sendRequest({url, options});
    }
    save (user: UserToSave): Promise<void> {
        const url = "/user"

        const content = JSON.stringify(user);

        let options: RequestInit = {
            body: content,
            method: "PUT",
            headers: {
                "Content-Type": "application/json-patch+json",
            }
        };

        return this.sendRequest({url, options});
    }
}