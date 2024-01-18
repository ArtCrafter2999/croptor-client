import React, {useContext, useState} from 'react';
import styles from "../ModalContent.module.scss"
import {CategorySize, Size} from "../../../models/Sizes";
import {AppContext} from "../../../App";
import {ModalContext} from "../../Modal/Modal";
import {Category} from "../../../reducer/reducer";

type Props = {
    category: Category;
    sizeToChange: CategorySize
}

const EditSizeModal = ({category, sizeToChange}: Props) => {
    const {api} = useContext(AppContext)
    const {closeModal} = useContext(ModalContext)
    const [title, setTitle] = useState<string>(sizeToChange.name as string);
    const [size, setSize] = useState<Size>(sizeToChange);

    function handleCreate() {
        api?.defaultSizes.editSize(
            category.id as string,
            {...sizeToChange, icon: category.icon},
            {...size, name: title, icon: category.icon});
        closeModal()
    }

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <h1>Edit Size</h1>
                <div className={styles.inputGroup}>
                    <span>Name</span>
                    <input type={"text"} value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className={styles.inputGroup}>
                    <span>Size</span>
                    <div className={styles.row}>
                        <span>Width</span>
                        <input type={"number"} value={size.width} min={1}
                               onChange={(e) => setSize(prev =>
                                   ({height: prev.height, width: Number(e.target.value)}))}/>
                        <span>Height</span>
                        <input type={"number"} value={size.height} min={1}
                               onChange={(e) => setSize(prev =>
                                   ({width: prev.width, height: Number(e.target.value)}))}/>
                    </div>
                </div>
                <div className={styles.button} onClick={handleCreate}>Create</div>
            </div>
        </div>
    )
};

export default EditSizeModal;