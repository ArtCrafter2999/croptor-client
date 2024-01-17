import React, {useContext} from 'react';
import styles from "./ErrorModal.module.scss"
import {ModalContext} from "../Modal/Modal";

type Props = {
    error: string
    button: string
    onButtonClick?: () => void;
}

const ErrorModal = ({error, button, onButtonClick}: Props) => {
    const {closeModal} = useContext(ModalContext)
    return (
        <div className={styles.modal}>
            <p>{error}</p>
            <span onClick={() => {
                onButtonClick &&
                onButtonClick();
                closeModal();
            }}>{button}</span>
        </div>
    );
};

export default ErrorModal;