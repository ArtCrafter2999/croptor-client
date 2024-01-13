import {ClientBase} from "./ClientBase";
import {GlobalParams, ImageParamsDictionary, ImageParamsDto, Parameters} from "../models/Params";
import {CategorySize} from "../models/Sizes";

export class ImagesController extends ClientBase {
    crop(files: File[], imageParams: ImagesParamsDto): Promise<string> {
        let url = `/images/crop`;

        // Create a FormData object to handle file uploads
        const formData = new FormData();

        // Append files to the FormData object
        for (const file of files) {
            formData.append("files", file);
        }

        // Append imageParams as a JSON string to the FormData object
        formData.append("imageParams", JSON.stringify(imageParams));

        let options: RequestInit = {
            body: formData,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            }
        };

        return this.sendRequest({ url, options });
    }
}

type ImagesParamsDto = {
    sizes: CategorySize[];
    params: {[fileName: string]: ImageParamsDto}
}