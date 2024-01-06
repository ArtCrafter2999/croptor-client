import React, {ReactNode, useContext, useState} from 'react';
import styles from "./CategoryItem.module.scss"
import {AppContext} from "../../../App";
import csx from "classnames";

type Props = {
    icon: string,
    name: string,
    alwaysOpened?: boolean
    children?: ReactNode;
}
const CategoryItem = ({alwaysOpened = false, icon, name, children}: Props) => {
    const [isOpened, setOpened] = useState<boolean>(alwaysOpened);
    return (
        <div className={styles.category}>
            <div className={csx(styles.row, {[styles.alwaysOpened]: alwaysOpened})}
                 onClick={() => !alwaysOpened && setOpened(prev => !prev)}>
                <img src={icon}/>
                <span>{name}</span>
            </div>
            {isOpened &&
				<div className={styles.sizes}>
                    {children}
				</div>
            }
        </div>
    );
};


export default CategoryItem;