import React, {ReactNode, useState} from 'react';
import styles from "./Footer.module.scss"
import Modal from "../Modal/Modal";
import TextModal from "./TextModal/TextModal";
import {termsOfService, refundPolicy, privacyPolicy, contactUs} from "./Texts";
const Footer = () => {
    const [content, setContent] = useState<string>();

    return (
        <>
            <footer className={styles.footer}>
                <span>
                    <span className={styles.button} onClick={() => setContent(termsOfService)}>Terms of Service</span>
                    <span className={styles.button} onClick={() => setContent(refundPolicy)}>Refund Policy</span>
                    <span className={styles.button} onClick={() => setContent(privacyPolicy)}>Privacy Policy</span>
                    <span className={styles.button} onClick={() => setContent(contactUs)}>Contact Us</span>
                </span>
                <span>©Croptor 2024 All Rights Reserved</span>
            </footer>
            <Modal isOpen={!!content} setOpen={() => setContent(undefined)}>
                <TextModal htmlContent={content as string}/>
            </Modal>
        </>
    );
};

export default Footer;