import React from 'react';
import styles from "./Footer.module.scss"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <span>
                <a href={"#"} target="_blank" rel="noopener noreferrer">Terms of Service</a>
                <a href={"#"} target="_blank" rel="noopener noreferrer">Refund Policy</a>
                <a href={"#"} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                <a href={"#"} target="_blank" rel="noopener noreferrer">Contact Us</a>
            </span>
            <span>
                <a href={"#"} target="_blank" rel="noopener noreferrer">
                    ©Croptor 2024 All Rights Reserved
                </a>
            </span>
        </footer>
    );
};

export default Footer;