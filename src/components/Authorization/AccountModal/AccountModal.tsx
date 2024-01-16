import React, {useContext, useState} from 'react';
import styles from "./AccountModal.module.scss"
import csx from "classnames";
import {UserContext} from "../../../App";
import {format} from "date-fns";
import PlanTab from "./PlanTab";

enum Tab {
    Account,
    Plan
}

const AccountModal = () => {
    const {user} = useContext(UserContext)
    const [selectedTab, selectTab] = useState<Tab>(Tab.Account);
    if(!user) throw new Error("User can't be undefined at this point");
    return (
        <div className={styles.modal}>
            <div className={styles.tabs}>
                <span className={csx({[styles.active]: selectedTab === Tab.Account})}
                      onClick={() => selectTab(Tab.Account)}>
                    Account
                </span>
                <span className={csx({[styles.active]: selectedTab === Tab.Plan})}
                      onClick={() => selectTab(Tab.Plan)}>
                    Plan
                </span>
            </div>
            {selectedTab === Tab.Account ?
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