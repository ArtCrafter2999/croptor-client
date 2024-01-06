import React, {useContext} from 'react';
import styles from "./DefaultSizes.module.scss"
import CategoryItem from "./CategoryItem/CategoryItem";
import {AppContext} from "../../App";
import {PresetSize} from "../../reducer/reducer";
import SizeList from "./SizeList";

const DefaultSizes = () => {
    const {defaultSizes} = useContext(AppContext)

    return (
        <div className={styles.section}>
            {defaultSizes.map(c => (
                <CategoryItem icon={c.icon} name={c.name} key={c.name}>
                    <SizeList icon={c.icon} list={c.sizes}/>
                </CategoryItem>
            ))}

            {/*<CategoryItem icon={"testIcons/youtube.svg"} name={"Youtube"}/>*/}
            {/*<CategoryItem icon={"testIcons/twitter.svg"} name={"Twitter"}/>*/}
            {/*<CategoryItem icon={"testIcons/pinterest.svg"} name={"Pinterest"}>*/}
            {/*    <SizeItem name={"Pin"} size={{width: 800, height: 1200}} isSelected={true}/>*/}
            {/*    <SizeItem name={"Profile"}  size={{width: 165, height: 165}} isSelected={false}/>*/}
            {/*    <SizeItem name={"Small Thumbnail"}  size={{width: 55, height: 55}} isSelected={false}/>*/}
            {/*    <SizeItem name={"Board Cover"}  size={{width: 222, height: 150}} isSelected={false}/>*/}
            {/*</CategoryItem>*/}
            {/*<CategoryItem icon={"testIcons/instagram.svg"} name={"Instagram"}/>*/}
            {/*<CategoryItem icon={"testIcons/twitch.svg"} name={"Twitch"}/>*/}
            {/*<CategoryItem icon={"testIcons/tiktok.svg"} name={"Tiktok"}/>*/}
            {/*<CategoryItem icon={"testIcons/snapchat.svg"} name={"Snapchat"}/>*/}
            {/*<CategoryItem icon={"testIcons/reddit.svg"} name={"Reddit"}/>*/}
            {/*<CategoryItem icon={"testIcons/google ads.svg"} name={"Google ads"}>*/}
            {/*    <SizeItem name={"Large Rectangle"}  size={{width: 336, height: 280}} isSelected={true}/>*/}
            {/*    <SizeItem name={"Medium Rectangle"}  size={{width: 300, height: 250}} isSelected={false}/>*/}
            {/*</CategoryItem>*/}
        </div>
    );
};

export default DefaultSizes;