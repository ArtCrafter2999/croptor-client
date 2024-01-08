import React from 'react';
import styles from "./TextModal.module.scss"

type Props = {
    htmlContent: string;
}

const TextModal = ({htmlContent}: Props) => {
    return (
        <div className={styles.modal} dangerouslySetInnerHTML={{__html: htmlContent}}/>
    );
};

export default TextModal;