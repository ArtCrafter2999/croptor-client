import React from 'react';
import styles from "./ImageSection.module.scss"
import ImageItem from "./ImageItem/ImageItem";

const ImageSection = () => {
    return (
        <div className={styles.section}>
            <ImageItem/>
            <ImageItem/>
            <ImageItem/>
            <ImageItem/>
            <ImageItem/>
            <ImageItem/>
            <ImageItem/>
            <ImageItem/>
        </div>
    );
};

export default ImageSection;
