import { useState } from 'react';
import styles from "./Footer.module.scss"
import Modal from "../Modal/Modal";
import TextModal from "./TextModal/TextModal";
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    const [content, setContent] = useState<string>();
    const navigate = useNavigate();
    return (
        <>
            <footer className={styles.footer}>
                <span>
                    <span className={styles.button} onClick={() => navigate("/terms-of-service")}>Terms of Service</span>
                    <span className={styles.button} onClick={() => navigate("/refund-policy")}>Refund Policy</span>
                    <span className={styles.button} onClick={() => navigate("/privacy-policy")}>Privacy Policy</span>
                    <span className={styles.button} onClick={() => navigate("/company")}>Company</span>
                </span>
                <span>©Croptor 2024 All Rights Reserved</span>
            </footer>
            <Modal isOpen={!!content} setOpen={() => setContent(undefined)}>
                <TextModal htmlContent={content as string} />
            </Modal>
        </>
    );
};

export default Footer;