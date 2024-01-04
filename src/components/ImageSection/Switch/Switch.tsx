import React from 'react';
import styles from "./Switch.module.scss"
import csx from "classnames";

type Props = {
    value: boolean;
    setValue: (v: boolean) => void;
    classname?: string;
    text?: string;

    [x: string]: any
}
const Switch = ({value, setValue, classname, text, ...rest}: Props) => {
    return (
        <div className={csx(styles.switchContainer, classname)} onClick={() => setValue(!value)} {...rest}>
            <div className={csx(styles.switch, {[styles.active]: value})}>
                <div className={styles.thumb}/>
            </div>
            {text &&
				<span>{text}</span>
            }
        </div>
    );
};

export default Switch;