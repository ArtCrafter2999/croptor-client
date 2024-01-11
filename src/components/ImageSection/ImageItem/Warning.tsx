import React from 'react';
import styles from "./ImageItem.module.scss"
import {PresetSize} from "../../../reducer/reducer";
import SizeItem from "../../PresetsSection/SizeItem/SizeItem";

type Props = {
    incapableSizes: PresetSize[]
}

const Warning = ({incapableSizes}: Props) => {
    return (
        <div className={styles.warning}>
            <p>The preset is larger than the uploaded image. <br/>
                Please switch on FIT & CROP function or edit preset settings</p>
            <div>
                {incapableSizes.map(s =>
                    <SizeItem key={s.name ?? "" + s.size.width + "x" + s.size.height}
                              presetSize={s}
                              classname={styles.sizeItem}
                    />)}
            </div>
        </div>
    );
};

export default Warning;