import React, { ReactNode } from "react";
import SignInOidc from "./auth/SignInOidc";
import SignOutOidc from "./auth/SignOutOidc";
import App from "./App";
import FullScreenText from "./components/FullScreenText/FullScreenText";

type CustomRoute = {
    path: string;
    redirectTo?: string;
    component?: ReactNode;
}

const customRoutes: CustomRoute[] = [
    {
        path: "/",
        component: <App />
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
    },
    {
        path: "/privacy-policy",
        component: <FullScreenText page={"Privacy Policy"} />
    },
    {
        path: "/terms-of-service",
        component: <FullScreenText page={"Terms Of Service"} />
    },
    {
        path: "/refund-policy",
        component: <FullScreenText page={"Refund Policy"} />
    },
    {
        path: "/company",
        component: <FullScreenText page={"Company"} />
    }
]
export default customRoutes;