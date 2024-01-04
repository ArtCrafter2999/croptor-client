import React from 'react';
import styles from "./GlobalParameters.module.scss"
import ImageItem from "../ImageSection/ImageItem/ImageItem";

const GlobalParameters = () => {
    return (
        <div className={styles.section}>
            <ImageItem classname={styles.item} empty/>
        </div>
    );
};

export default GlobalParameters;