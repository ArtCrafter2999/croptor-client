import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import LoadingPage from "./LoadingPage";
import {signinSilent} from "./user-service";

const ResignOidc = () => {
    const navigate = useNavigate();

    useEffect(() => {
        signinSilent().then(() => {
                navigate(localStorage.getItem('CallbackRedirect') ?? "/");
            }
        );
    }, [navigate]);

    return <LoadingPage/>;
};

export default ResignOidc;