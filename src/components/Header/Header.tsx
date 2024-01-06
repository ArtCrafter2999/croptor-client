import React, {useContext, useState} from 'react';
import styles from "./Header.module.scss"
import HeaderButton from "./HeaderButton";
import {AppContext} from "../../App";

const Header = () => {
    const {dispatch} = useContext(AppContext)
    const [width, setWidth] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    function handleReset() {
        dispatch({action:"resetFiles"});
    }
    function handleAddCustom() {
        if(!width || !height) return;
        dispatch({action: "addCustomSize", value: {width: parseInt(width), height: parseInt(height)}});
        setWidth("");
        setHeight("");
    }
    function handleChangeWidth(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.value === "") {
            setWidth("");
            return;
        }
        const num = parseInt(e.target.value);
        if(!Number.isNaN(num)) setWidth(num.toString());
        else e.target.value = width ?? "";
    }
    function handleChangeHeight(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.value === "") {
            setHeight("");
            return;
        }
        const num = parseInt(e.target.value);
        if(!Number.isNaN(num)) setHeight(num.toString());
        else e.target.value = height ?? "";
    }

    return (
        <header className={styles.section}>
            <div className={styles.buttonContainer}>
                <HeaderButton text={"Download"} color={"#808bc7"}/>
                <HeaderButton text={"Batch"} color={"#f3e021"}/>
                <HeaderButton text={"Reset"} color={"#f9446e"} onClick={handleReset}/>
            </div>
            <div className={styles.buttonContainer}/>
            <div className={styles.buttonContainer}>
                <span>Crop Width</span>
                <input type={"text"} value={width} onChange={handleChangeWidth}/>
                <span>Crop Height</span>
                <input type={"text"} value={height} onChange={handleChangeHeight}/>
                <HeaderButton text={"Add Custom"} color={"#f3e021"} onClick={handleAddCustom}/>
            </div>
        </header>
    );
};

export default Header;