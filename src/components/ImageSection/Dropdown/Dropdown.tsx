import React, {useEffect, useRef, useState} from 'react';
import styles from "./Dropdown.module.scss"
import usePopup from "../../usePopup";
import csx from "classnames";

type Props = {
    options: string[]
    selectedOption: string
    selectOption: (o: string) => void;
    icon?: string;
    classname?: string
    [x: string]: any
}

const Dropdown = ({options, selectedOption, selectOption, icon, classname, ...rest}: Props) => {
    const [isOpen, setOpen, ref] = usePopup();

    return (
        <>
            <div className={csx(styles.dropdown, classname)} onClick={() => setOpen(prev => !prev)} ref={ref as any} {...rest}>
                {icon &&
					<img src={icon} className={styles.icon}/>
                }
                <span>{selectedOption}</span>
                <img src={"icons/vector-down.svg"}/>
                {isOpen &&
					<div className={styles.options}>
                        {options.map(o => <span key={o} onClick={() => selectOption(o)}>{o}</span>)}
					</div>
                }
            </div>
        </>
    );
};

export default Dropdown;