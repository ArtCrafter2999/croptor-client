import React from 'react';
import styles from "./Logo.module.scss"

const Logo = () => {
    return (
        <div className={styles.logoContainer}>
            <img src={"croptor-logo.svg"} alt={"logo"}/>
        </div>
    );
};

export default Logo;