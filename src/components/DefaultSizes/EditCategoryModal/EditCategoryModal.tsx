import React, {useContext, useState} from 'react';
import styles from "../ModalContent.module.scss"
import {Category} from "../../../reducer/reducer";
import {AppContext} from "../../../App";
import {ModalContext} from "../../Modal/Modal";
import isFileAnImage from "../../../isFileAnImage";

type Props = {
    category: Category
}

const EditCategoryModal = ({category}: Props) => {
    const {api, dispatch} = useContext(AppContext)
    const {closeModal} = useContext(ModalContext)
    const [clearKey, setClearKey] = useState<number>(0);
    const [file, setFile] = useState<File>();
    const [title, setTitle] = useState<string>(category.name);

    function handleEdit() {
        if(!api) return;
        function upload(file: File| undefined): Promise<string | undefined> {
            if(!api) throw new Error("api cant be undefined at this point")
            if(file)
                return api.images.upload(file);
            return Promise.resolve(undefined);
        }
        upload(file)
            .then(uri => api.defaultSizes.editCategory(category.id as string, title, uri).then(() => uri))
            .then((uri) =>
                dispatch({action: "editCategory", value:{id: category.id as string, name: title, icon: uri}}))
        ;
        closeModal()
    }

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (isFileAnImage(file)) {
            setFile(file);
        } else {
            setClearKey(prev => prev + 1)
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <h1>Edit Category</h1>
                <div className={styles.inputGroup}>
                    <span>Icon</span>
                    <input key={clearKey} type={"file"} onChange={handleUpload}/>
                </div>
                <div className={styles.inputGroup}>
                    <span>Name</span>
                    <input type={"text"} value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className={styles.button} onClick={handleEdit}>Edit</div>
            </div>
        </div>
    );
};

export default EditCategoryModal;