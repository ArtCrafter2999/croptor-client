export type User = {
    name: string;
    email: string;
    image?: string;
    plan: "Free" | "Pro" | "Admin";
    expires: Date
}