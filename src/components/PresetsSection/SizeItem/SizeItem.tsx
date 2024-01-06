import React, {useState} from 'react';
import styles from "./SizeItem.module.scss"
import {PresetSize, Size} from "../../../reducer/reducer"
import TrashButton from "../../TrashButton/TrashButton";

type Props = {
    presetSize: PresetSize;
    onRemove?: () => void;
}

const SizeItem = ({presetSize: {size, name, icon}, onRemove}: Props) => {
    const sizeString = size.width + "x" + size.height;
    const [isHover, setHover] = useState<boolean>(false);

    return (
        <div className={styles.item} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <img src={icon} alt={name}/>
            {name ?
                <>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.size}>{sizeString}</span>
                </> :
                <span className={styles.name}>{sizeString}</span>
            }
            <div  className={styles.trash}>
                {isHover &&
					<TrashButton onClick={onRemove}/>
                }
            </div>
        </div>
    );
};

export default SizeItem;