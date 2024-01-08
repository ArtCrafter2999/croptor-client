import React, {useState} from 'react';
import styles from "./AccountModal.module.scss"
import csx from "classnames";

enum Tab {
    Account,
    Plan
}

const AccountModal = () => {
    const [selectedTab, selectTab] = useState<Tab>(Tab.Account);
    const [monthAmount, setMonthAmount] = useState<number>(1);
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
                                <span className={styles.field}>iceid</span>
                            </div>
                            <div className={styles.ok}>ok</div>
                        </>
                        <>
                            <span className={styles.name}>Email</span>
                            <div className={styles.field}>
                                <span className={styles.edit}>edit</span>
                                <span className={styles.field}>iceid@outlook.com</span>
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
                <div className={styles.plan}>
                    <div className={styles.list}>
                        <span className={styles.name}>Current Plan</span>
                        <div className={styles.field}>
                            <span className={styles.field}>Pro / Free</span>
                        </div>
                        <span className={styles.name}>Valid Till</span>
                        <div className={styles.field}>
                            <span className={styles.field}>03.04.2024</span>
                        </div>
                        <span className={styles.name}>Update </span>
                        <div className={styles.field}>
                            <span className={styles.field}>$9/mo</span>
                            <NumberField number={monthAmount} setNumber={setMonthAmount}/>
                        </div>
                    </div>
                    <div className={styles.button}>Update</div>
                </div>
            }
        </div>
    );
};
type NFProps = {
    number: number;
    setNumber: (f: (prev: number) => number) => void;
}
const NumberField = ({number, setNumber}: NFProps) => {
    return (
        <div className={styles.numberField}>
            <span>{number}</span>
            <img src={"icons/up arrow.svg"} alt={"up"} onClick={() => setNumber(prev => prev < 12? prev + 1 : prev)}/>
            <img src={"icons/down arrow.svg"} alt={"down"} onClick={() => setNumber(prev => prev > 1? prev - 1 : prev)}/>
        </div>
    );
};

export default AccountModal;