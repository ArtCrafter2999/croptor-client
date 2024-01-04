import React from 'react';
import styles from "./PresetsSection.module.scss"
import TopPart from "./TopPart/TopPart";
import SizeItem from "./SizeItem/SizeItem";

const PresetsSection = () => {
    return (
        <div className={styles.section}>
            <TopPart name={"vogue 12"}/>
            <div>
                <SizeItem size={{width: 1280, height: 720}} icon={"icons/custom-size.svg"}/>
                <SizeItem size={{width: 1920, height: 1080}} icon={"icons/custom-size.svg"}/>
                <SizeItem size={{width: 777, height: 888}} icon={"icons/custom-size.svg"}/>
                <SizeItem name={"Header"} size={{width: 1500, height: 1500}} icon={"testIcons/twitter.svg"}/>
                <SizeItem name={"Small Thumbnail"} size={{width: 55, height: 55}} icon={"testIcons/pinterest.svg"}/>
                <SizeItem name={"Video Thumbnail"} size={{width: 1280, height: 720}} icon={"testIcons/youtube.svg"}/>
                <SizeItem name={"Profile"} size={{width: 110, height: 110}} icon={"testIcons/instagram.svg"}/>
                <SizeItem name={"Pin"} size={{width: 800, height: 1200}} icon={"testIcons/pinterest.svg"}/>
                <SizeItem name={"Image Ad"} size={{width: 1080, height: 1920}} icon={"testIcons/pinterest.svg"}/>
            </div>
        </div>
    );
};

export default PresetsSection;