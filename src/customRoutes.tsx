import React, {ReactNode} from "react";
import SignInOidc from "./auth/SignInOidc";
import SignOutOidc from "./auth/SignOutOidc";
import App from "./App";
import FullScreenText from "./components/FullScreenText/FullScreenText";
import {contactUs, privacyPolicy, refundPolicy, termsOfService} from "./components/Footer/Texts";

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
    },
    {
        path: "/privacypolicy",
        component: <FullScreenText html={privacyPolicy}/>
    },
    {
        path: "/termsofservice",
        component: <FullScreenText html={termsOfService}/>
    },
    {
        path: "/refundpolicy",
        component: <FullScreenText html={refundPolicy}/>
    },
    {
        path: "/contactus",
        component: <FullScreenText html={contactUs}/>
    }
]
export default customRoutes;