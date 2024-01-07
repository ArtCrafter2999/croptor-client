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
}
const TopPart = ({name, onPrev, onNext, onSave}: Props) => {
    const {dispatch} = useContext(AppContext)
    const [newTitle, setNewTitle] = useState<string>();
    const [isFocused, setFocused] = useState<boolean>(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setNewTitle(e.target.value ?? "")
    }
    function handleOnHover() {
        setNewTitle(name);
    }
    function handleMouseLeave() {
        if (!isFocused)
            setNewTitle(undefined);
    }
    function handleBlur() {
        if(!newTitle) return;
        setFocused(false);
        dispatch({action: "changePresetTitle", value: newTitle});
        setNewTitle(undefined);
    }
    function handleRemove() {
        dispatch({action: "removePreset"});
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
                        maxLength={20}
                        value={newTitle}
                        onChange={handleChange}
                        onFocus={() => setFocused(true)}
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
            <TrashButton onClick={handleRemove} className={csx(styles.pointer, styles.icon)}/>
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