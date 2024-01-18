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
import Modal from "./components/Modal/Modal";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import isFileAnImage, {imageExtensions} from "./isFileAnImage";


const FREE_MAX_FILES_AMOUNT = 3;

export const AppContext = createContext<ReducerState & { dispatch: Dispatch<Action> }>(null as any);

export enum AuthTab {
    Account,
    Plan
}
const App = () => {
    const [state, dispatch] = useReducer(reducer, null as ReducerState | null)
    const [user, setUser] = useState<User>();
    const [authTab, setAuthTab] = useState<AuthTab>();
    const [error, setError] = useState<string>();
    const [errorFunc, setErrorFunc] = useState<() => void>();

    useEffect(() => {
        LoadData().then(newState => dispatch({action: "updateState", value: newState}));
    }, []);

    function handleFileDropped(files: File[]) {
        if(!state) return;
        const images: File[] = [];
        for (const file of files) {
            if (isFileAnImage(file)) {
                images.push(file)
            }
        }
        if(Object.values(state.filesDictionary).length + images.length > FREE_MAX_FILES_AMOUNT && (!user || user.plan === "Free")){
            setError(`To process more than ${FREE_MAX_FILES_AMOUNT} images at a time, please upgrade to PRO PLAN`)
            setErrorFunc((prev) => () => setAuthTab(AuthTab.Plan));
        }
        else
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

    if (!state) return <></>
    return (
        <UserContext.Provider value={{user, setUser}}>
            <AppContext.Provider value={{...state, dispatch}}>
                <div className={styles.app}>
                    <Logo/>
                    <Authorization tab={authTab} setTab={setAuthTab}/>
                    <div className={styles.workspace}>
                        <Header onFilesUploaded={handleFileDropped} />
                        <GlobalParameters/>
                        <ImageSection/>
                        <PresetsSection setError={m => {
                            setError(m);
                            setErrorFunc((prev) => () => setAuthTab(AuthTab.Plan));
                        }}/>
                        <CustomSizes/>
                        <DefaultSizes/>
                    </div>
                    <FileUpload onFilesDropped={handleFileDropped}/>
                    <Footer/>
                    <Modal isOpen={!!error} setOpen={() => setError(undefined)}>
                        <ErrorModal error={error as string} button={"Upgrade"} onButtonClick={errorFunc}/>
                    </Modal>
                </div>
            </AppContext.Provider>
        </UserContext.Provider>
    );
};

export const UserContext = createContext<{ user: (User | undefined), setUser: React.Dispatch<React.SetStateAction<User | undefined>> }>({} as any)

export default App;