import {ClientBase} from "./ClientBase";
import {Category} from "../reducer/reducer";
import {PresetSize} from "../models/Sizes";

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
    addSize(categoryId: string, size: PresetSize): Promise<void> {
        let url = "/default/size";

        const content = JSON.stringify({categoryId, size});

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    addCategory(name: string, icon?: string): Promise<void> {
        let url = "/default/category";

        const content = JSON.stringify({name, icon});

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    removeSize(categoryId: string, size: PresetSize): Promise<void> {
        let url = "/default/size";

        const content = JSON.stringify({categoryId, size});

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    removeCategory(categoryId: string): Promise<void> {
        let url = "/default/category";

        const content = JSON.stringify({categoryId});

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    editSize(categoryId: string, oldSize: PresetSize, newSize: PresetSize): Promise<void> {
        let url = "/default/size";

        const content = JSON.stringify({categoryId, oldSize, newSize});

        let options: RequestInit = {
            body: content,
            method: "PUT",
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        };

        return this.sendRequest({url, options});
    }

    editCategory(id: string, name: string, icon?: string): Promise<void> {
        let url = "/default/category";

        const content = JSON.stringify({id, name, icon});

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
