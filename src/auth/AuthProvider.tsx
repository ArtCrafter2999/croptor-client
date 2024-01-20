import React, {ReactNode, useContext, useEffect, useRef, useState} from 'react';
import {User, UserManager} from 'oidc-client';
import setAuthHeader from './setAuthHeader';
import {loadUser, signinSilent} from './user-service';
import userManager from "./user-service";
import {AppContext, UserContext} from "../App";
import {LoadData} from "../reducer/reducer";

const AuthProvider = ({
                          children
                      }: { children: (user: User | null) => ReactNode }): any => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [oidcUser, setOidcUser] = useState<User | null>(null);
    const {api, dispatch} = useContext(AppContext)
    const {user, setUser} = useContext(UserContext)
    useEffect(() => {
        function GetUser() {
            if (!localStorage.getItem("token") || user) return;
            api?.user.get()
                .then(u => setUser(u))
                .then(() => LoadData())
                .then((s) => dispatch({action: "updateState", value: s}))
                .catch(
                () => {}
                // signinSilent()
            );
        }

        loadUser().then(user => {
            GetUser();
            setOidcUser(user);
            setLoaded(true);
        });
        const onUserLoaded = (user: User) => {
            // console.log('User loaded ', user);
            setAuthHeader(user.access_token);
            setLoaded(true);
        };
        const onUserUnloaded = () => {
            setAuthHeader(null);
            // console.log('User unloaded');
        };
        const onAccessTokenExpiring = () => {
            // console.log('User access token expiring');
        };
        const onAccessTokenExpired = () => {
            // console.log('User access token expired');
        };
        const onUserSignedOut = () => {
            // console.log('User signed out');
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
        return children(oidcUser);
    }
}

export default AuthProvider;
