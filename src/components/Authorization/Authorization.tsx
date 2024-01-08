import React, {useState} from 'react';
import styles from "./Authorization.module.scss"
import HeaderButton from "../Header/HeaderButton";
import Modal from "../Modal/Modal";
import AccountModal from "./AccountModal/AccountModal";

const Authorization = () => {
    const [isAuthorized, setAuthorized] = useState<boolean>(false);
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className={styles.corner}>
                {isAuthorized ?
                    <img src={"icons/user.svg"} onClick={() => setOpen(true)}/>
                    :
                    <HeaderButton text={"Login"} color={"#00dede"} onClick={() => setAuthorized(true)}/>
                }
            </div>
            <Modal isOpen={isOpen} setOpen={setOpen}>
               <AccountModal/>
            </Modal>
        </>
    );
};

export default Authorization;