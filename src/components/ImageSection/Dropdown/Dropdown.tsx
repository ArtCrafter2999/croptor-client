import React, {useEffect, useRef, useState} from 'react';
import styles from "./Dropdown.module.scss"

type Props = {
    options: string[]
    selectedOption: string
    selectOption: (o: string) => void;
    icon?: string;
    classname?: string
    [x: string]: any
}

const Dropdown = ({options, selectedOption, selectOption, icon, classname, ...rest}: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        function onClick(e: MouseEvent) {
            if(isOpen && ref.current && !ref.current.contains(e.target as any)) {
                setOpen(false);
            }
        }
        window.addEventListener("click", onClick);
        return () => window.addEventListener("click", onClick);
    }, [ref.current]);

    return (
        <>
            <div className={styles.dropdown} onClick={() => setOpen(prev => !prev)} ref={ref as any} {...rest}>
                {icon &&
					<img src={icon} className={styles.icon}/>
                }
                <span>{selectedOption}</span>
                <img src={"icons/vector-down.svg"}/>
                {isOpen &&
					<div className={styles.options}>
                        {options.map(o => <span onClick={() => selectOption(o)}>{o}</span>)}
					</div>
                }
            </div>
        </>
    );
};

export default Dropdown;