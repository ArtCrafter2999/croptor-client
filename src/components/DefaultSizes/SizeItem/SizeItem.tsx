import React from 'react';
import styles from "./SizeItem.module.scss"
import Checkmark from "../../Checkmark/Checkmark";

export type Size = {
    width: number,
    height: number,
}

type Props = {
    icon?: string;
    name?: string;
    size: Size;
    isSelected: boolean;
    onClick?: (v: boolean) => void;
}

const SizeItem = ({icon, name, size, isSelected, onClick}: Props) => {
    const sizeString = size.width + "x" + size.height;
    return (
        <div className={styles.item} onClick={() => onClick && onClick(!isSelected)}>
            <div className={styles.checkmark}>
                <Checkmark value={isSelected}/>
            </div>
            {name ?
                <>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.size}>{sizeString}</span>
                </> :
                <span className={styles.name}>{sizeString}</span>
            }
        </div>
    );
};

export default SizeItem;