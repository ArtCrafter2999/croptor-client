import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./AccountModal.module.scss"
import { format } from "date-fns";
import { AppContext, UserContext } from "../../../App";
import { WayForPayRequest } from "../../../models/WayForPayRequest";

const PlanTab = () => {
    const { user } = useContext(UserContext)
    const { api } = useContext(AppContext)
    const [monthAmount, setMonthAmount] = useState<number>(1);
    const submitRef = useRef<HTMLInputElement>();
    const [request, setRequest] = useState<WayForPayRequest>();

    if (!user) throw new Error("User can't be undefined at this point");

    useEffect(() => {
        if (request && submitRef.current) {
            submitRef.current.click();
        }
    }, [request]);

    function handleUpdate() {
        if (!api) return;
        api.orders.create(monthAmount)
            .then(r => setRequest(r))
    }

    const expires = new Date(user.expires)
    const currentDate: Date = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return (
        <div className={styles.plan}>
            <>
                <div className={styles.list}>
                    <span className={styles.name}>Current Plan</span>
                    <div className={styles.field}>
                        <span className={styles.field}>{user.plan}</span>
                    </div>

                    <>
                        <span className={styles.name}>Valid Till</span>
                        <div className={styles.field}>
                            <span className={styles.field}>{expires >= currentDate ? format(expires, "dd.MM.yyyy") : user.plan + " Plan"}</span>
                        </div>
                    </>
                    <span className={styles.name}>Update </span>
                    <div className={styles.field}>
                        <span className={styles.field}>$9/mo</span>
                        <NumberField number={monthAmount} setNumber={setMonthAmount} />
                    </div>
                </div>
                <form method="post" action="https://secure.wayforpay.com/pay" acceptCharset="utf-8">
                    {request &&
                        Object.keys(request)
                            .map(k => {
                                if (k.startsWith("product"))
                                    return <input name={k + "[]"} value={request[k]} />
                                return <input name={k} value={request[k]} />
                            })
                    }
                    <input type={"submit"} ref={submitRef as any} />
                </form>
                <div className={styles.button} onClick={handleUpdate}>UPDATE</div>
            </>
        </div>
    );
};

type NFProps = {
    number: number;
    setNumber: (f: (prev: number) => number) => void;
}
const NumberField = ({ number, setNumber }: NFProps) => {
    return (
        <div className={styles.numberField}>
            <span>{number}</span>
            <img src={"icons/up arrow.svg"} alt={"up"} onClick={() => setNumber(prev => prev < 12 ? prev + 1 : prev)} />
            <img src={"icons/down arrow.svg"} alt={"down"}
                onClick={() => setNumber(prev => prev > 1 ? prev - 1 : prev)} />
        </div>
    );
};

export default PlanTab;