import React, {useState} from 'react';
import styles from "./TopPart.module.scss"
import TrashButton from "../../TrashButton/TrashButton";
import csx from "classnames";

type Props = {
    name: string;
    onPrev?: () => void;
    onNext?: () => void;
    onSave?: () => void;
    onRemove?: () => void;
}
const TopPart = ({name, onPrev, onNext, onSave, onRemove}: Props) => {
    return (
        <div className={styles.part}>
            <div className={styles.pointer} onClick={onPrev}>
                <img src={"icons/vector-left.svg"} alt={"previous"}/>
            </div>
            <div className={styles.presetName}>
                <span>{name}</span>
            </div>
            <div className={styles.pointer} onClick={onNext}>
                <img src={"icons/vector-right.svg"} alt={"next"}/>
            </div>
            <SaveButton onClick={onSave} className={csx(styles.pointer, styles.icon)}/>
            <TrashButton onClick={onRemove} className={csx(styles.pointer, styles.icon)}/>
        </div>
    );
};

const SaveButton = ({...rest}) => {
    const [isHover, setHover] = useState<boolean>(false);

    return (
        <img src={`icons/save-${isHover ? "hover" : "active"}.svg`}
             alt={"Delete"}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             {...rest}
        />
    );
};

export default TopPart;