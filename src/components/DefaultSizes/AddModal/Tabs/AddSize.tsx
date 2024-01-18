import React, {useContext, useState} from 'react';
import styles from "../../ModalContent.module.scss"
import {Size} from "../../../../models/Sizes";
import {ModalContext} from "../../../Modal/Modal";
import {AppContext} from "../../../../App";
import {Category} from "../../../../reducer/reducer";

type Props = {
    defaultCategory: Category
    categories: Category[];
}

const AddSize = ({defaultCategory, categories}: Props) => {
    const {api} = useContext(AppContext)
    const {closeModal} = useContext(ModalContext)
    const [category, setCategory] = useState<Category>(defaultCategory);
    const [title, setTitle] = useState<string>("new size");
    const [size, setSize] = useState<Size>({width: 1, height: 1});

    function handleCreate() {
        api?.defaultSizes.addSize(category.id as string, {...size, name: title, icon: category.icon});
        closeModal()
    }

    return (
        <>
            <div className={styles.inputGroup}>
                <span>Category</span>
                <select value={category.id ?? category.name}
                        onChange={e => setCategory(
                            categories.find(c => c.id === e.target.value || c.name === e.target.value) as Category)}>
                    {categories.map(c => <option value={c.id}>{c.name}</option>)}
                </select>
            </div>
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
        </>
    );
};

export default AddSize;