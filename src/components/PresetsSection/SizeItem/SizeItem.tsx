import React, {useState} from 'react';
import styles from "./SizeItem.module.scss"
import {PresetSize, Size} from "../../../reducer/reducer"
import TrashButton from "../../TrashButton/TrashButton";
import csx from "classnames";

type Props = {
    presetSize: PresetSize;
    onRemove?: () => void;
    classname?: string
    [x: string]: any
}

const SizeItem = ({presetSize: {size, name, icon}, onRemove, classname, ...rest}: Props) => {
    const sizeString = size.width + "x" + size.height;
    const [isHover, setHover] = useState<boolean>(false);

    return (
        <div className={csx(styles.item, classname)}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             {...rest}>
            <img src={icon} alt={name}/>
            {name ?
                <>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.size}>{sizeString}</span>
                </> :
                <span className={styles.name}>{sizeString}</span>
            }
            <div className={styles.trash}>
                {onRemove && isHover &&
					<TrashButton onClick={onRemove}/>
                }
            </div>
        </div>
    );
};

export default SizeItem;