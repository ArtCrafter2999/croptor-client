import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from "./AccountModal.module.scss"
import {AppContext, UserContext} from "../../../App";
import csx from "classnames";
import {UserToSave} from "../../../models/User";
import {imageExtensions} from "../../../isFileAnImage";

const AccountTab = () => {
    const {api} = useContext(AppContext)
    const {user, setUser} = useContext(UserContext)
    const [nameToChange, setNameToChange] = useState<string>();
    const [imageToChange, setImageToChange] = useState<string | undefined | null>(undefined);
    const inputRef = useRef<HTMLInputElement>();
    useEffect(() => {
        if(imageToChange !== undefined){
            handleOkClick();
        }
    }, [imageToChange]);
    if (!user) throw new Error("User can't be undefined at this point");
    function handleOkClick() {
        if(!user) return;
        const userToChange: UserToSave = {
            name: nameToChange ?? user.name,
            image: imageToChange ?? user.image,
        }
        if(api){
            api.user.save(userToChange)
                .then(() => setUser({...user, ...userToChange}));
        }
        else{
            setUser({...user, ...userToChange});
        }
        setImageToChange(undefined);
        setNameToChange(undefined);
    }

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if(!e.target.files || !api) return;
        const file = e.target.files[0]
        const lastDotIndex = file.name.lastIndexOf('.');

        if (lastDotIndex === -1) return;
        const extension = file.name.slice(lastDotIndex + 1).toLowerCase();
        if (!imageExtensions.includes(extension)) return;
        api.images.upload(file)
            .then(uri => setImageToChange(uri));
    }

    function handleEditEmail() {
        window.location.replace(process.env.REACT_APP_AUTHORITY+ "/Account/Email" ?? "/")
    }
    function handleEditPassword() {
        window.location.replace(process.env.REACT_APP_AUTHORITY+ "/Account/SetPassword" ?? "/")
    }

    return (
        <div className={styles.account}>
            <div className={styles.imageContainer}>
                <img className={csx({[styles.noImage]: !user.image})} src={user.image ?? "icons/user.svg"}/>
                <span className={styles.edit} onClick={() => inputRef.current?.click()}>Edit</span>
            </div>
            <div className={styles.list}>
                <>
                    <span className={styles.name}>Name</span>
                    <div className={styles.field}>
                        <span className={styles.edit} onClick={() => setNameToChange(user.name)}>edit</span>
                        <input className={styles.field}
                               value={nameToChange ?? user.name}
                               onChange={e => setNameToChange(e.target.value)}
                               readOnly={nameToChange === undefined}/>
                    </div>
                    <div>
                        {nameToChange !== undefined &&
							<div className={styles.ok} onClick={handleOkClick}>ok</div>
                        }
                    </div>
                </>
                <>
                    <span className={styles.name}>Email</span>
                    <div className={styles.field}>
                        <span className={styles.edit} onClick={handleEditEmail}>
                            edit
                        </span>
                        <input className={styles.field} value={user.email} readOnly/>
                    </div>
                    <div>
                        {/*<div className={styles.ok}>ok</div>*/}
                    </div>
                </>
                <>
                    <span className={styles.name}>Password</span>
                    <div className={styles.button} onClick={handleEditPassword}>
                        <span className={styles.button}>change</span>
                    </div>
                </>
            </div>
            <input type={"file"} style={{display: "none"}} onChange={handleUpload} ref={inputRef as any}/>
        </div>
    );
};

export default AccountTab;