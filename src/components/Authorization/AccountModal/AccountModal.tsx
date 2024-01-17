import React, {useContext} from 'react';
import styles from "./AccountModal.module.scss"
import csx from "classnames";
import {AuthTab, UserContext} from "../../../App";
import PlanTab from "./PlanTab";

type Props = {
    tab: AuthTab;
    setTab: (v:AuthTab) => void;
}
const AccountModal = ({tab, setTab}: Props) => {
    const {user} = useContext(UserContext)
    if(!user) throw new Error("User can't be undefined at this point");
    return (
        <div className={styles.modal}>
            <div className={styles.tabs}>
                <span className={csx({[styles.active]: tab === AuthTab.Account})}
                      onClick={() => setTab(AuthTab.Account)}>
                    Account
                </span>
                <span className={csx({[styles.active]: tab === AuthTab.Plan})}
                      onClick={() => setTab(AuthTab.Plan)}>
                    Plan
                </span>
            </div>
            {tab === AuthTab.Account ?
                <div className={styles.account}>
                    <div className={styles.imageContainer}>
                        <img src={"https://content.freelancehunt.com/profile/photo/225/idon.png"}/>
                        <span className={styles.edit}>Edit</span>
                    </div>
                    <div className={styles.list}>
                        <>
                            <span className={styles.name}>Name</span>
                            <div className={styles.field}>
                                <span className={styles.edit}>edit</span>
                                <span className={styles.field}>{user.name}</span>
                            </div>
                            <div className={styles.ok}>ok</div>
                        </>
                        <>
                            <span className={styles.name}>Email</span>
                            <div className={styles.field}>
                                <span className={styles.edit}>edit</span>
                                <span className={styles.field}>{user.email}</span>
                            </div>
                            <div className={styles.ok}>ok</div>
                        </>
                        <>
                            <span className={styles.name}>Password</span>
                            <div className={styles.button}>
                                <span className={styles.button}>change</span>
                            </div>
                        </>
                    </div>
                </div> :
                <PlanTab/>
            }
        </div>
    );
};

export default AccountModal;