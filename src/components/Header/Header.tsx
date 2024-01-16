import React, {useContext, useRef, useState} from 'react';
import styles from "./Header.module.scss"
import HeaderButton from "./HeaderButton";
import {AppContext} from "../../App";
import Lottie from "lottie-react";
import animation from "./animation.json"
import {CategorySize} from "../../models/Sizes";
import {ImageParamsDto} from "../../models/Params";

type Props = {
    onFilesUploaded: (f: File[]) => void;
}
const Header = ({onFilesUploaded}: Props) => {
    const {filesDictionary, imageDataDictionary, selectedPreset, dispatch, api, defaultParams} = useContext(AppContext)
    const [width, setWidth] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [downloadLink, setDownloadLink] = useState<string>();

    const ref = useRef<HTMLInputElement>();

    function handleReset() {
        dispatch({action: "resetFiles"});
    }

    function handleAddCustom() {
        if (!width || !height) return;
        dispatch({action: "addCustomSize", value: {width: parseInt(width), height: parseInt(height)}});
        setWidth("");
        setHeight("");
    }

    function handleChangeWidth(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === "") {
            setWidth("");
            return;
        }
        const num = parseInt(e.target.value);
        if (!Number.isNaN(num)) setWidth(num.toString());
        else e.target.value = width ?? "";
    }

    function handleChangeHeight(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === "") {
            setHeight("");
            return;
        }
        const num = parseInt(e.target.value);
        if (!Number.isNaN(num)) setHeight(num.toString());
        else e.target.value = height ?? "";
    }

    function handleBatch() {
        // if(!animation)
        setAnimation(true);
        if (api) {
            const sizes: CategorySize[] = selectedPreset.sizes;
            const files: File[] = Object.values(filesDictionary);
            const params: { [fileName: string]: ImageParamsDto } = {}
            Object.values(imageDataDictionary)
                .map<(ImageParamsDto & { name: string })>(data =>
                    data.useDefault ?
                        {...defaultParams, centerPosition: null, name: data.name} :
                        {...data}
                ).forEach(param => params[param.name] = param);
            api.images.crop(files, {sizes, params}).then((link) => {
                setAnimation(false);
                setDownloadLink(link);
            });
        } else {
            setDownloadLink("not link");
            setTimeout(() => setAnimation(false), 1000);
        }
    }

    function handleUpload() {
        if (ref.current?.files) {
            onFilesUploaded(Array.from(ref.current.files))
        }
    }

    function handleDownload() {
        console.log("open", downloadLink)
        window.open(downloadLink, '_blank');
    }

    const [isAnimation, setAnimation] = useState<boolean>(false);

    const batchAmount = Object.values(imageDataDictionary).length * selectedPreset.sizes.length;

    return (
        <header className={styles.section}>
            <input type={"file"} multiple style={{display: "none"}} ref={ref as any} onChange={handleUpload}/>
            <div className={styles.buttonContainer}>
                {isAnimation ?
                    <HeaderButton className={styles.upload} color={"#808bc7"}>
                        <Lottie className={styles.animation} animationData={animation} loop={true}/>
                    </HeaderButton>
                    :
                    downloadLink ?
                        <HeaderButton className={styles.upload} color={"#808bc7"}
                                      onClick={handleDownload}
                        >
                            Download
                        </HeaderButton> :
                        <HeaderButton className={styles.upload} color={"#808bc7"}
                                      onClick={() => ref.current?.click()}
                        >
                            Upload
                        </HeaderButton>

                }
                <HeaderButton color={"#f3e021"} onClick={handleBatch}>
                    Batch {batchAmount > 0 && batchAmount}
                </HeaderButton>
                <HeaderButton color={"#f9446e"} onClick={handleReset}>
                    Reset
                </HeaderButton>
            </div>
            <div className={styles.buttonContainer}/>
            <div className={styles.buttonContainer}>
                <span>Crop Width</span>
                <input type={"text"} value={width} onChange={handleChangeWidth}/>
                <span>Crop Height</span>
                <input type={"text"} value={height} onChange={handleChangeHeight}/>
                <HeaderButton color={"#f3e021"} onClick={handleAddCustom}>
                    Add Custom
                </HeaderButton>
            </div>
        </header>
    );
};

export default Header;