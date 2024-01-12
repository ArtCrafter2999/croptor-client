import React, {useContext} from 'react';
import styles from "./GlobalParameters.module.scss"
import ImageItem from "../ImageSection/ImageItem/ImageItem";
import {AppContext} from "../../App";
import {Parameters} from "../../models/Params";

const GlobalParameters = () => {
    const {defaultParams, dispatch} = useContext(AppContext)
    function handleChange(params: Parameters) {
        dispatch({action: "defaultParams", value: params});
    }
    return (
        <div className={styles.section}>
            <ImageItem params={{...defaultParams, centerPosition: null}} onChange={handleChange} classname={styles.item}/>
        </div>
    );
};

export default GlobalParameters;