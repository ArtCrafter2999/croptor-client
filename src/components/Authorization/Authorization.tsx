import React, {useEffect, useRef, useState} from 'react';
import styles from "./Authorization.module.scss"
import HeaderButton from "../Header/HeaderButton";
import Modal from "../Modal/Modal";
import AccountModal from "./AccountModal/AccountModal";
import usePopup from "../usePopup";

const Authorization = () => {
    const [isAuthorized, setAuthorized] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [isOpen, setOpen, ref] = usePopup()

    return (
        <>
            <div className={styles.corner} ref={ref as any}>
                {isAuthorized ?
                    <img className={styles.noImage} src={"icons/user.svg"} onClick={() => setOpen(prev => !prev)}/>
                    :
                    <HeaderButton color={"#00dede"} onClick={() => setAuthorized(true)}>
                        Login
                    </HeaderButton>
                }
                {isOpen &&
					<div className={styles.popupContainer}>
						<div className={styles.popup}>
							<div className={styles.head}><span>Iceid</span></div>
							<div className={styles.content}>
								<div>
									<span className={styles.button} onClick={() => {
                                        setModalOpen(true)
                                        setOpen(false);
                                    }}>Account</span>
									<span>Plan: <b>Pro</b></span>
								</div>
								<div className={styles.end}>
									<span className={styles.button}>Sign Out</span>
								</div>
							</div>
						</div>
					</div>
                }
            </div>
            <Modal isOpen={isModalOpen} setOpen={setModalOpen}>
                <AccountModal/>
            </Modal>
        </>
    );
};

export default Authorization;