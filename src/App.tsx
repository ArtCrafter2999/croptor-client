import React, {createContext, Dispatch, useEffect, useReducer, useState} from 'react';
import styles from "./App.module.scss"
import Footer from "./components/Footer/Footer";
import Logo from "./components/Logo/Logo";
import Header from "./components/Header/Header";
import DefaultSizes from "./components/DefaultSizes/DefaultSizes";
import GlobalParameters from "./components/GlobalParameters/GlobalParametrs";
import ImageSection from "./components/ImageSection/ImageSection";
import PresetsSection from "./components/PresetsSection/PresetsSection";
import CustomSizes from "./components/CustomSizes/CustomSizes";
import FileUpload from "./components/FileUpload/FileUpload";
import reducer, {Action, LoadData, ReducerState} from "./reducer/reducer";
import Authorization from "./components/Authorization/Authorization";
import {User} from "./models/User";
import AuthProvider from "./auth/AuthProvider";

export const AppContext = createContext<ReducerState & { dispatch: Dispatch<Action> }>(null as any);

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'ico', "jfif"];
const App = () => {
    const [state, dispatch] = useReducer(reducer, null as ReducerState | null)

    useEffect(() => {
        LoadData().then(newState => dispatch({action: "updateState", value: newState}));
    }, []);

    function handleFileDropped(files: File[]) {
        const images: File[] = [];
        for (const file of files) {
            const lastDotIndex = file.name.lastIndexOf('.');

            if (lastDotIndex === -1) continue;
            const extension = file.name.slice(lastDotIndex + 1).toLowerCase();
            if (imageExtensions.includes(extension)) {
                images.push(file)
            }
        }
        if (images.length > 0) {
            dispatch({action: "addFiles", value: images})
        }
    }

    useEffect(() => {
        if (!state) return;
        Object.values(state.imageDataDictionary).forEach((data) => {
            if (state.sizesDictionary[data.name]) return;
            const img = new Image();
            img.src = data.image;
            img.onload = () =>
                dispatch({
                    action: "saveImageSize",
                    value: {
                        name: data.name,
                        size: {
                            width: img.width,
                            height: img.height
                        }
                    }
                })
        })
    }, [state, state?.imageDataDictionary]);

    const [user, setUser] = useState<User>();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && state && state.api) {
            state.api.user.get().then((u) => {
                setUser(u);
                console.log(u)
            });
        }
    }, [state, state?.api])

    if (!state) return <></>
    return (
        <UserContext.Provider value={{user, setUser}}>
            <AppContext.Provider value={{...state, dispatch}}>
                <div className={styles.app}>
                    <Logo/>
                    <Authorization/>
                    <div className={styles.workspace}>
                        <Header onFilesUploaded={handleFileDropped}/>
                        <GlobalParameters/>
                        <ImageSection/>
                        <PresetsSection/>
                        <CustomSizes/>
                        <DefaultSizes/>
                    </div>
                    <FileUpload onFilesDropped={handleFileDropped}/>
                    <Footer/>
                </div>
            </AppContext.Provider>
        </UserContext.Provider>
    );
};

export const UserContext = createContext<{ user: (User | undefined), setUser: React.Dispatch<React.SetStateAction<User | undefined>> }>({} as any)

export default App;