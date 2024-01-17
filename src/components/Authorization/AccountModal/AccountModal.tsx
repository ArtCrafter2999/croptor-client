import React, {useContext} from 'react';
import styles from "./AccountModal.module.scss"
import csx from "classnames";
import {AuthTab, UserContext} from "../../../App";
import PlanTab from "./PlanTab";
import AccountTab from "./AccountTab";

type Props = {
    tab: AuthTab;
    setTab: (v:AuthTab) => void;
}
const AccountModal = ({tab, setTab}: Props) => {
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
                <AccountTab/>:
                <PlanTab/>
            }
        </div>
    );
};

export default AccountModal;