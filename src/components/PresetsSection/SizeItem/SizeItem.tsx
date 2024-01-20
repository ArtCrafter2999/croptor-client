import React, {useState} from 'react';
import styles from "./SizeItem.module.scss"
import TrashButton from "../../TrashButton/TrashButton";
import csx from "classnames";
import {PresetSize} from "../../../models/Sizes";

type Props = {
    presetSize: PresetSize;
    onRemove?: () => void;
    classname?: string
    [x: string]: any
}

const SizeItem = ({presetSize: {width, height, name, iconUri}, onRemove, classname, ...rest}: Props) => {
    const sizeString = width + "x" + height;
    const [isHover, setHover] = useState<boolean>(false);

    return (
        <div className={csx(styles.item, classname)}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             {...rest}>
            <img src={iconUri} alt={name}/>
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