import React from 'react';
import styles from "./Checkmark.module.scss"
import csx from "classnames";

type Props = {
    value: boolean
    onChange?: (v: boolean) => void;
    classname?: string
    [x:string]: any
}

const Checkmark = ({value, onChange, classname, ...rest}: Props) => {
    return (
        <img
            className={csx(styles.icon, classname)}
            src={`icons/checkmark ${value? "active" : "inactive"}.svg`}
            alt={"checkmark active"}
            onClick={() => onChange && onChange(!value)}
            {...rest}
        />
    );
};

export default Checkmark;