import React, {useContext, useEffect, useState} from 'react';
import styles from "./AccountModal.module.scss"
import {format} from "date-fns";
import {UserContext} from "../../../App";

const PlanTab = () => {
    const {user} = useContext(UserContext)
    const [monthAmount, setMonthAmount] = useState<number>(1);
    const [isPayment, setPayment] = useState<boolean>(false);

    if (!user) throw new Error("User can't be undefined at this point");

    async function handleUpdate() {

    }

    return (
        <div className={styles.plan}>
            {!isPayment ?
                <>
                    <div className={styles.list}>
                        <span className={styles.name}>Current Plan</span>
                        <div className={styles.field}>
                            <span className={styles.field}>{user.plan}</span>
                        </div>
                        <span className={styles.name}>Valid Till</span>
                        <div className={styles.field}>
                            <span className={styles.field}>{format(new Date(user.expires), "dd.MM.yyyy")}</span>
                        </div>
                        <span className={styles.name}>Update </span>
                        <div className={styles.field}>
                            <span className={styles.field}>$9/mo</span>
                            <NumberField number={monthAmount} setNumber={setMonthAmount}/>
                        </div>
                    </div>
                    <div className={styles.button} onClick={handleUpdate}>Update</div>
                </>
                :
                <></>
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
            <img src={"icons/up arrow.svg"} alt={"up"} onClick={() => setNumber(prev => prev < 12 ? prev + 1 : prev)}/>
            <img src={"icons/down arrow.svg"} alt={"down"}
                 onClick={() => setNumber(prev => prev > 1 ? prev - 1 : prev)}/>
        </div>
    );
};

export default PlanTab;