export type UserToSave = {
    name: string;
    image: string | null;
}

export type User = UserToSave & {
    id: string
    email: string;
    plan: "Free" | "Pro" | "Admin";
    expires: Date
}