import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {User, UserManager} from 'oidc-client';
import setAuthHeader from './setAuthHeader';
import {loadUser, signinRedirect} from './user-service';
import {useLocation} from "react-router-dom";
import userManager from "./user-service";

const AuthProvider = ({
                          children
                      }: { children: (user: User | null) => ReactNode }): any => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        loadUser().then(user => {
            setUser(user);
            setLoaded(true);
        });
        const onUserLoaded = (user: User) => {
            console.log('User loaded ', user);
            setAuthHeader(user.access_token);
            setLoaded(true);
        };
        const onUserUnloaded = () => {
            setAuthHeader(null);
            console.log('User unloaded');
        };
        const onAccessTokenExpiring = () => {
            console.log('User access token expiring');
        };
        const onAccessTokenExpired = () => {
            console.log('User access token expired');
        };
        const onUserSignedOut = () => {
            console.log('User signed out');
        };

        userManager.events.addUserLoaded(onUserLoaded);
        userManager.events.addUserUnloaded(onUserUnloaded);
        userManager.events.addAccessTokenExpired(onAccessTokenExpired);
        userManager.events.addAccessTokenExpiring(onAccessTokenExpiring);
        userManager.events.addUserSignedOut(onUserSignedOut);

        return () => {
            if (userManager) {
                userManager.events.removeUserLoaded(onUserLoaded);
                userManager.events.removeUserUnloaded(onUserUnloaded);
                userManager.events.removeAccessTokenExpired(onAccessTokenExpired);
                userManager.events.removeAccessTokenExpiring(onAccessTokenExpiring);
                userManager.events.removeUserSignedOut(onUserSignedOut);
            }
        }
    }, [userManager]);

    if (!isLoaded)
        return <></>
    else {
        return children(user);
    }
}

export default AuthProvider;
