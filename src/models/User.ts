export type User = {
    id: string
    name: string;
    email: string;
    image?: string;
    plan: "Free" | "Pro" | "Admin";
    expires: Date
}