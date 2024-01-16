import React, {useContext, useEffect, useState} from 'react';
import styles from "./Authorization.module.scss"
import Modal from "../Modal/Modal";
import AccountModal from "./AccountModal/AccountModal";
import usePopup from "../usePopup";
import {signinRedirect, signoutRedirect} from "../../auth/user-service";
import {AppContext, UserContext} from "../../App";
import csx from "classnames";
import AuthProvider from "../../auth/AuthProvider";

type Props = {
    isModalOpen: boolean;
    setModalOpen: (v: boolean) => void;
}
const Authorization = ({isModalOpen, setModalOpen}: Props) => {
    const {api} = useContext(AppContext)
    const {user, setUser} = useContext(UserContext)
    const [isOpen, setOpen, ref] = usePopup()

    useEffect(() => {
        if(isModalOpen && !user) {
            api? signinRedirect() :
            setUser({
                name: "iceid",
                email: "iceid@outlook.com",
                plan: "Free",
                image: "https://content.freelancehunt.com/profile/photo/225/idon.png",
                expires: new Date("2024-04-03")
            });
        }
    }, [isModalOpen]);

    return (
        <>
            <div className={styles.corner} ref={ref as any}>
                <AuthProvider>
                    {(u) => {
                        return u === undefined || user === undefined ?
                            <div className={styles.button} onClick={() => api ?
                                signinRedirect() :
                                setUser({
                                    name: "iceid",
                                    email: "iceid@outlook.com",
                                    plan: "Free",
                                    image: "https://content.freelancehunt.com/profile/photo/225/idon.png",
                                    expires: new Date("2024-04-03")
                                })}
                            >
                                Login
                            </div> :
                            <>
                                <img className={csx({[styles.noImage]: !user.image})}
                                     src={user.image ?? "icons/user.svg"}
                                     onClick={() => setOpen(prev => !prev)}/>
                                {isOpen &&
									<div className={styles.popupContainer}>
										<div className={styles.popup}>
											<div className={styles.head}><span>{user.name}</span></div>
											<div className={styles.content}>
												<div>
									<span className={styles.button} onClick={() => {
                                        setModalOpen(true)
                                        setOpen(false);
                                    }}>Account</span>
													<span>Plan: <b>{user.plan}</b></span>
												</div>
												<div className={styles.end}>
													<span className={styles.button}
														  onClick={signoutRedirect}>Sign Out</span>
												</div>
											</div>
										</div>
									</div>
                                }
                            </>
                    }
                    }
                </AuthProvider>
            </div>
            {user &&
				<Modal isOpen={isModalOpen} setOpen={setModalOpen}>
					<AccountModal/>
				</Modal>
            }
        </>
    );
};


export default Authorization;