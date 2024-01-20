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
    const {api, dispatch} = useContext(AppContext)
    const {closeModal} = useContext(ModalContext)
    const [category, setCategory] = useState<Category>(defaultCategory);
    const [title, setTitle] = useState<string>("new size");
    const [size, setSize] = useState<Size>({width: 1, height: 1});

    function handleCreate() {
        api?.defaultSizes.addSize(category.id as string, {...size, name: title, iconUri: category.iconUri})
            .then(() =>
                dispatch({
                    action: "addSize", value: {
                        categoryId: category.id as string,
                        size: {...size, name: title, iconUri: category.iconUri}
                    }
                }));
        closeModal()
    }

    return (
        <>
            <div className={styles.inputGroup}>
                <span>Category</span>
                <select value={category.id}
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
                           onChange={(e) => setSize(prev => {
                               const value = Number(e.target.value);
                               return {height: prev.height, width: value > 0 ? value : 1};
                           })}
                    />
                    <span>Height</span>
                    <input type={"number"} value={size.height} min={1}
                           onChange={(e) => setSize(prev => {
                               const value = Number(e.target.value);
                               return {width: prev.width, height: value > 0 ? value : 1};
                           })}
                    />
                </div>
            </div>
            <div className={styles.button} onClick={handleCreate}>Create</div>
        </>
    );
};

export default AddSize;