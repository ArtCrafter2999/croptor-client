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
    const {api, dispatch} = useContext(AppContext)
    const {closeModal} = useContext(ModalContext)
    const [title, setTitle] = useState<string>(sizeToChange.name as string);
    const [size, setSize] = useState<Size>(sizeToChange);

    function handleEdit() {
        const categoryId = category.id as string;
        const oldSize = {...sizeToChange, icon: category.icon};
        const newSize = {...size, name: title, icon: category.icon};
        api?.defaultSizes.editSize(categoryId, oldSize, newSize)
            .then(() => dispatch({action: "editSize", value: {oldSize, newSize, categoryId}}))
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
                <div className={styles.button} onClick={handleEdit}>Edit</div>
            </div>
        </div>
    )
};

export default EditSizeModal;