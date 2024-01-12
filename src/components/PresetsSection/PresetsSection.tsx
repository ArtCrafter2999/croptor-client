import React, {useContext} from 'react';
import styles from "./PresetsSection.module.scss"
import TopPart from "./TopPart/TopPart";
import SizeItem from "./SizeItem/SizeItem";
import {AppContext} from "../../App";
import {PresetSize} from "../../models/Sizes";

const PresetsSection = () => {
    const {selectedPreset, dispatch, api} = useContext(AppContext)

    function handleRemove(s: PresetSize) {
        dispatch({action:"removeSizeFromPreset", value: {name: s.name, size: s}});
    }
    function handleSave() {
        api?.presets.savePreset(selectedPreset);
    }

    return (
        <div className={styles.section}>
            <TopPart name={selectedPreset.name} onSave={handleSave}/>
            <div>
                {selectedPreset.sizes.map(s =>
                    <SizeItem key={s.name ?? "" + s.width + "x" + s.height}
                              presetSize={s}
                              onRemove={() => handleRemove(s)}/>)}

                {/*<SizeItem size={{width: 1280, height: 720}} icon={"icons/custom-size.svg"}/>*/}
                {/*<SizeItem size={{width: 1920, height: 1080}} icon={"icons/custom-size.svg"}/>*/}
                {/*<SizeItem size={{width: 777, height: 888}} icon={"icons/custom-size.svg"}/>*/}
                {/*<SizeItem name={"Header"} size={{width: 1500, height: 1500}} icon={"testIcons/twitter.svg"}/>*/}
                {/*<SizeItem name={"Small Thumbnail"} size={{width: 55, height: 55}} icon={"testIcons/pinterest.svg"}/>*/}
                {/*<SizeItem name={"Video Thumbnail"} size={{width: 1280, height: 720}} icon={"testIcons/youtube.svg"}/>*/}
                {/*<SizeItem name={"Profile"} size={{width: 110, height: 110}} icon={"testIcons/instagram.svg"}/>*/}
                {/*<SizeItem name={"Pin"} size={{width: 800, height: 1200}} icon={"testIcons/pinterest.svg"}/>*/}
                {/*<SizeItem name={"Image Ad"} size={{width: 1080, height: 1920}} icon={"testIcons/pinterest.svg"}/>*/}
            </div>
        </div>
    );
};

export default PresetsSection;