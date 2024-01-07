import React, {useContext} from 'react';
import styles from "./ImageSection.module.scss"
import ImageItem from "./ImageItem/ImageItem";
import {AppContext} from "../../App";
import {ImageParams} from "../../reducer/reducer";

const ImageSection = () => {
    const {imageDataDictionary, dispatch} = useContext(AppContext)
    return (
        <div className={styles.section}>
            {Object.values(imageDataDictionary).map(data =>
                <ImageItem
                    key={data.image}
                    params={data}
                    onChange={d =>
                        dispatch({
                            action: "imageParams",
                            value: d as unknown as ImageParams
                        })
                    }
                    onTrash={(i) => dispatch({action: "removeImage", value: i})}
                />
            )}
        </div>
    );
};

export default ImageSection;
