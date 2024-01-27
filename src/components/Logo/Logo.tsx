import React from 'react';
import styles from "./Logo.module.scss"

const Logo = () => {
    return (
        <a className={styles.logoContainer} href={"https://croptor.com"}>
            <img src={"croptor-logo.svg"} alt={"logo"}/>
        </a>
    );
};

export default Logo;