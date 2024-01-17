import {ClientBase} from "./ClientBase";
import {Size} from "../models/Sizes";
import {Preset} from "../models/Preset";

export class PresetsController extends ClientBase {
    addCustomSize(size: Size): Promise<void> {
        let url = `/presets/size`;

        const content = JSON.stringify(size);

        let options: RequestInit = {
            body: content,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
            }
        };

        return this.sendRequest({url, options});
    }
    getCustomSizes(): Promise<Size[]> {
        let url = `/presets/sizes/custom`;

        let options: RequestInit = {
            method: "GET",
            headers: {}
        };

        return this.sendRequest({url, options});
    }

    removeCustomSize(size: Size): Promise<void> {
        let url = `/presets/size`;

        const content = JSON.stringify(size);

        let options: RequestInit = {
            body: content,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json-patch+json",
            }
        };

        return this.sendRequest({url, options});
    }

    getPresets(): Promise<string[]> {
        let url = `/presets`;

        let options: RequestInit = {
            method: "GET",
            headers: {}
        };
        return this.sendRequest({url, options})
    }

    getPreset(id: string): Promise<Preset> {
        let url = `/presets/${id}`;

        let options: RequestInit = {
            method: "GET",
            headers: {}
        };
        return this.sendRequest({url, options})
    }

    savePreset(preset: Preset): Promise<void> {
        let url = `/presets`;

        const content = JSON.stringify(preset);

        let options: RequestInit = {
            body: content,
            method: "PUT",
            headers: {
                "Content-Type": "application/json-patch+json",
            }
        };
        return this.sendRequest({url, options})
    }

    removePreset(id: string): Promise<void> {
        let url = `/presets`;

        const content = JSON.stringify({id});

        let options: RequestInit = {
            body: content,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json-patch+json",
            }
        };
        return this.sendRequest({url, options})
    }
}