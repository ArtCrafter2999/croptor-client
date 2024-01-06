import React, {useContext} from 'react';
import styles from "./GlobalParameters.module.scss"
import ImageItem from "../ImageSection/ImageItem/ImageItem";
import {AppContext} from "../../App";
import {Parameters} from "../../reducer/reducer";

const GlobalParameters = () => {
    const {defaultParams, dispatch} = useContext(AppContext)
    function handleChange(params: Parameters) {
        dispatch({action: "defaultParams", value: params});
    }
    return (
        <div className={styles.section}>
            <ImageItem params={defaultParams} onChange={handleChange} classname={styles.item}/>
        </div>
    );
};

export default GlobalParameters;