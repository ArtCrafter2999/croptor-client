import {ClientBase} from "./ClientBase";
import {Category} from "../reducer/reducer";

export class DefaultSizesController extends ClientBase {

    getCategories() : Promise<Category[]> {
        let url = "/default/size";

        let options: RequestInit = {
            method: "GET",
            headers: {
            },
        };

        return this.sendRequest({url, options});
    }
    addSize(body: any): Promise<void> {
        let url = "/default/size";

        const content = JSON.stringify(body);

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    addCategory(body: any): Promise<void> {
        let url = "/default/category";

        const content = JSON.stringify(body);

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    removeSize(body: any): Promise<void> {
        let url = "/default/size";

        const content = JSON.stringify(body);

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    removeCategory(body: any): Promise<void> {
        let url = "/default/category";

        const content = JSON.stringify(body);

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    editSize(body: any): Promise<void> {
        let url = "/default/size";

        const content = JSON.stringify(body);

        let options: RequestInit = {
            body: content,
            method: "PUT",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    editCategory(body: any): Promise<void> {
        let url = "/default/category";

        const content = JSON.stringify(body);

        let options: RequestInit = {
            body: content,
            method: "PUT",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }
}
