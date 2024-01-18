import React, {useState} from 'react';
import styles from "./SizeItem.module.scss"
import Checkmark from "../../Checkmark/Checkmark";
import {Size} from "../../../models/Sizes";
import TrashButton from "../../TrashButton/TrashButton";

type Props = {
    name?: string;
    size: Size;
    isSelected: boolean;
    onClick?: (v: boolean) => void;
    onRemove?: () => void;
    onEdit?: () => void;
}

const SizeItem = ({name, size, isSelected, onClick, onRemove, onEdit}: Props) => {
    const [isHover, setHover] = useState<boolean>(false);
    const [isEditHover, setEditHover] = useState<boolean>(false);

    const sizeString = size.width + "x" + size.height;
    return (
        <div
            className={styles.item}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div onClick={() => onClick && onClick(!isSelected)}>
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
            {onRemove &&
				<div className={styles.button}>
                    {isHover &&
						<TrashButton onClick={onRemove}/>
                    }
				</div>
            }
            {onEdit &&
				<div className={styles.button} onClick={onEdit}>
                    {isHover &&
						<img src={`icons/edit-${isEditHover ? "hover" : "active"}.svg`} alt={"add"}
							 onMouseEnter={() => setEditHover(true)}
							 onMouseLeave={() => setEditHover(false)}/>
                    }
				</div>
            }
        </div>
    );
};

export default SizeItem;