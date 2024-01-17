import React, {ReactNode} from "react";
import SignInOidc from "./auth/SignInOidc";
import SignOutOidc from "./auth/SignOutOidc";
import App from "./App";

type CustomRoute = {
    path: string;
    redirectTo?: string;
    component?: ReactNode;
}

const customRoutes: CustomRoute[] = [
    {
        path: "/",
        component: <App/>
    },
    {
        path: "/signin-oidc",
        component: <SignInOidc />,
    },
    {
        path: "/signout-oidc",
        component: <SignOutOidc />,
    },
    {
        path: "/resign-oidc",
        component: <SignOutOidc />,
    }
]
export default customRoutes;