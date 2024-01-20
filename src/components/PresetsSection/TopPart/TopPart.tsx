import React, {ChangeEvent, useContext, useState} from 'react';
import styles from "./TopPart.module.scss"
import TrashButton from "../../TrashButton/TrashButton";
import csx from "classnames";
import {AppContext} from "../../../App";

type Props = {
    name: string;
    onPrev?: () => void;
    onNext?: () => void;
    onSave?: () => void;
    onRemove?: () => void;
    onChangeName?: (name: string) => void;
}
const TopPart = ({name, onPrev, onNext, onSave, onRemove, onChangeName}: Props) => {
    const [newTitle, setNewTitle] = useState<string>();
    const [isFocused, setFocused] = useState<boolean>(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setNewTitle(e.target.value ?? "")
    }
    function handleOnHover() {
        setNewTitle(name);
    }
    function handleFocus() {
        setFocused(true);
        setNewTitle("");
    }
    function handleMouseLeave() {
        if (!isFocused)
            setNewTitle(undefined);
    }
    function handleBlur() {
        setFocused(false);
        setNewTitle(undefined);
        if(!newTitle) return;
        onChangeName &&
        onChangeName(newTitle);
        onSave && onSave();
    }

    return (
        <div className={styles.part}>
            <div className={styles.pointer} onClick={onPrev}>
                <img src={"icons/vector-left.svg"} alt={"previous"}/>
            </div>
            <div className={styles.presetName}>
                {newTitle !== undefined?
                    <input
                        type={"text"}
                        maxLength={16}
                        value={newTitle}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={e => e.key === "Enter" && handleBlur()}
                        onMouseLeave={handleMouseLeave}
                    /> :
                    <span onMouseOver={handleOnHover}>{name}</span>
                }
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