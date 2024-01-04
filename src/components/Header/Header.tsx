import React from 'react';
import styles from "./Header.module.scss"
import HeaderButton from "./HeaderButton";

const Header = () => {
    return (
        <header className={styles.section}>
            <div className={styles.buttonContainer}>
                <HeaderButton text={"Download"} color={"#808bc7"}/>
                <HeaderButton text={"Batch"} color={"#f3e021"}/>
                <HeaderButton text={"Reset"} color={"#f9446e"}/>
            </div>
            <div className={styles.buttonContainer}/>
            <div className={styles.buttonContainer}>
                <span>Crop Width</span>
                <input/>
                <span>Crop Height</span>
                <input/>
                <HeaderButton text={"Add Custom"} color={"#f3e021"}/>
            </div>
        </header>
    );
};

export default Header;