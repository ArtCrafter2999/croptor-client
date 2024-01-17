export type WayForPayRequest = {[x: string]: string | number} & {
    merchantAccount: string;
    merchantDomainName: string;
    merchantSignature: string;
    returnUrl: string;
    serviceUrl: string;
    orderReference: string;
    orderDate: number;
    amount: number;
    currency: string;
    productCount: number;
    productName: string;
    productPrice: number;
    clientAccountId: string;
}