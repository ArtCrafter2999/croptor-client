import {ClientBase} from "./ClientBase";
import {ImageParamsDto} from "../models/Params";
import {CategorySize} from "../models/Sizes";

export class ImagesController extends ClientBase {
    crop(files: File[], imageParams: ImagesParamsDto): Promise<string> {
        let url = `/images/crop`;

        // Create a FormData
        const formData = new FormData();

        // Append files to the FormData object
        for (const file of files) {
            formData.append("files", file);
        }
        // Append imageParams as a JSON string to the FormData object
        formData.append("images", JSON.stringify(imageParams));

        let options: RequestInit = {
            body: formData,
            method: "POST",
            headers: {
            }
        };

        return this.sendRequest({ url, options });
    }

    upload(file: File): Promise<string> {
        let url = `/images/upload`;

        const formData = new FormData();

        formData.append("files", file);
        let options: RequestInit = {
            body: formData,
            method: "POST",
            headers: {
            }
        };

        return this.sendRequest({ url, options });
    }
}

type ImagesParamsDto = {
    sizes: CategorySize[];
    params: {[fileName: string]: ImageParamsDto}
}