import React, {useContext} from 'react';
import styles from "./ImageSection.module.scss"
import ImageItem from "./ImageItem/ImageItem";
import {AppContext} from "../../App";

const ImageSection = () => {
    const {imageDataDictionary, defaultParams, dispatch} = useContext(AppContext)
    return (
        <div className={styles.section}>
            {Object.values(imageDataDictionary).map(data =>
                <ImageItem
                    key={data.image}
                    params={data.useDefault? {...data, ...defaultParams, useDefault: data.useDefault} : data}
                    onChange={d =>
                        dispatch({
                            action: "imageParams",
                            value: {...data, ...d, useDefault: "changed" in d && d.changed? false: d.useDefault}
                        })
                    }
                />
            )}
        </div>
    );
};

export default ImageSection;
