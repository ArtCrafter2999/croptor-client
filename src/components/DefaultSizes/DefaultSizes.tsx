import React from 'react';
import styles from "./DefaultSizes.module.scss"
import Category from "./Category/Category";
import SizeItem from "./SizeItem/SizeItem";

const DefaultSizes = () => {
    return (
        <div className={styles.section}>
            <Category icon={"testIcons/youtube.svg"} name={"Youtube"}/>
            <Category icon={"testIcons/twitter.svg"} name={"Twitter"}/>
            <Category icon={"testIcons/pinterest.svg"} name={"Pinterest"}>
                <SizeItem name={"Pin"} size={{width: 800, height: 1200}} isSelected={true}/>
                <SizeItem name={"Profile"}  size={{width: 165, height: 165}} isSelected={false}/>
                <SizeItem name={"Small Thumbnail"}  size={{width: 55, height: 55}} isSelected={false}/>
                <SizeItem name={"Board Cover"}  size={{width: 222, height: 150}} isSelected={false}/>
            </Category>
            <Category icon={"testIcons/instagram.svg"} name={"Instagram"}/>
            <Category icon={"testIcons/twitch.svg"} name={"Twitch"}/>
            <Category icon={"testIcons/tiktok.svg"} name={"Tiktok"}/>
            <Category icon={"testIcons/snapchat.svg"} name={"Snapchat"}/>
            <Category icon={"testIcons/reddit.svg"} name={"Reddit"}/>
            <Category icon={"testIcons/google ads.svg"} name={"Google ads"}>
                <SizeItem name={"Large Rectangle"}  size={{width: 336, height: 280}} isSelected={true}/>
                <SizeItem name={"Medium Rectangle"}  size={{width: 300, height: 250}} isSelected={false}/>
            </Category>
        </div>
    );
};

export default DefaultSizes;