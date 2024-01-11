import React, {createContext, Dispatch, useEffect, useReducer} from 'react';
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
import reducer, {Action, Category, ReducerState} from "./reducer/reducer";
import defaultSizes from "./defaultSizes.json";
import Authorization from "./components/Authorization/Authorization";

export const AppContext = createContext<ReducerState & { dispatch: Dispatch<Action> }>(null as any);

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'ico', "jfif"];
const App = () => {
    const [state, dispatch] = useReducer(reducer, {
        defaultParams: {
            useDefault: true,
            fitNCrop: true,
            horizontalSnap: "Center",
            verticalSnap: "Center"
        },
        imageDataDictionary: {},
        filesDictionary: {},
        sizesDictionary: {},
        selectedPreset: {name: "vogue 12", sizes: []},
        defaultSizes: defaultSizes as Category[],
        customSizes: [],
    })

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
    }, [state.imageDataDictionary]);

    return (
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
    );
};

export default App;