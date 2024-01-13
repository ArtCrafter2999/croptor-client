import {signinSilent} from "../auth/user-service";

export type Request = {
    url: string;
    options: RequestInit,
    addBaseUrl?: boolean
}
export class ClientBase {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected sendRequest(request: Request): Promise<any>{
        return this.transformRequest(request).then(newRequest => window
            .fetch(newRequest.url, newRequest.options)
            .then(response => this.process(response, request)));
    }

    protected transformRequest(request: Request) {
        if(request.addBaseUrl !== false)
            request.url = this.baseUrl + request.url;

        request.options.headers = {
            ...request.options.headers,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };
        return Promise.resolve(request);
    }

    private throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
        throw new ApiException(message, status, response, headers, result);
    }

    private process(response: Response, request: Request): Promise<any> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        }
        if (status === 200) {
            return response.text()
                .then((_responseText) => JSON.parse(_responseText));
        } else if (status === 201) {
            return response.text();
        } else if (status === 204) {
            return Promise.resolve<any>(null);
        } else if (status === 400) {
            return response.text()
                .then((_responseText) =>
                    this.throwException(
                        "Bad Request",
                        status,
                        _responseText,
                        _headers,
                        JSON.parse(_responseText) as ProblemDetails));
        } else if (status === 401) {
            return response.text()
                .then((_responseText) =>
                    this.throwException(
                        "Unauthorized",
                        status,
                        _responseText,
                        _headers));
        } else if (status === 403) {
            return response.text()
                .then((_responseText) =>
                    this.throwException(
                        "Forbidden",
                        status,
                        _responseText,
                        _headers,
                        JSON.parse(_responseText) as ProblemDetails));
        } else if (status === 500) {
            return response.text()
                .then((_responseText) =>
                    this.throwException(
                        "Server error",
                        status,
                        _responseText,
                        _headers));
        } else{
            return response.text().then((_responseText) =>
                this.throwException(
                    "An unexpected server error ("+status+") occurred.",
                    status,
                    _responseText,
                    _headers,
                    JSON.parse(_responseText) as ProblemDetails)
            );
        }
    }
}
export interface ProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    [key: string]: any;
}
export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}
