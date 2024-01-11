import React, {useContext, useRef, useState} from 'react';
import styles from "./Header.module.scss"
import HeaderButton from "./HeaderButton";
import {AppContext} from "../../App";
import Lottie from "lottie-react";
import animation from "./animation.json"

type Props = {
    onFilesUploaded: (f: File[]) => void;
}
const Header = ({onFilesUploaded} : Props) => {
    const {imageDataDictionary, selectedPreset, dispatch} = useContext(AppContext)
    const [width, setWidth] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [isBatched, setBatched] = useState<boolean>(false);

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
        setBatched(true)
        setAnimation(true);
        setTimeout(() => setAnimation(false), 2000);
    }
    function handleUpload() {
        if (ref.current?.files) {
            onFilesUploaded(Array.from(ref.current.files))
        }
    }

    const [isAnimation, setAnimation] = useState<boolean>(false);

    const batchAmount = Object.values(imageDataDictionary).length * selectedPreset.sizes.length;

    return (
        <header className={styles.section}>
            <input type={"file"} style={{display: "none"}} ref={ref as any} onChange={handleUpload}/>
            <div className={styles.buttonContainer}>
                {isBatched ?
                    <HeaderButton className={styles.upload} color={"#808bc7"}
                                  onClick={() => setAnimation(prev => !prev)}>
                        {isAnimation ?
                            <Lottie className={styles.animation} animationData={animation} loop={true}/>
                            :
                            "Download"
                        }
                    </HeaderButton> :
                    <HeaderButton className={styles.upload} color={"#808bc7"}
                                  onClick={() => ref.current?.click()}>
                        Upload
                    </HeaderButton>
                }
                <HeaderButton color={"#f3e021"} onClick={handleBatch}>
                    Batch {batchAmount}
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