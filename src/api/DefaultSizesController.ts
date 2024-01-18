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
    addSize(): Promise<void> {
        let url = "/default/size";

        const content = JSON.stringify({});

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    addCategory(): Promise<void> {
        let url = "/default/category";

        const content = JSON.stringify({});

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    removeSize(): Promise<void> {
        let url = "/default/size";

        const content = JSON.stringify({});

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    removeCategory(): Promise<void> {
        let url = "/default/category";

        const content = JSON.stringify({});

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    editSize(): Promise<void> {
        let url = "/default/size";

        const content = JSON.stringify({});

        let options: RequestInit = {
            body: content,
            method: "PUT",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    editCategory(): Promise<void> {
        let url = "/default/category";

        const content = JSON.stringify({});

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
