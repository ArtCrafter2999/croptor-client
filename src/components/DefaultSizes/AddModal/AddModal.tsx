import React, {useState} from 'react';
import styles from "../ModalContent.module.scss"
import content from "../ModalContent.module.scss"
import csx from "classnames";
import AddSize from "./Tabs/AddSize";
import AddCategory from "./Tabs/AddCategory";

enum Tab {
    AddSize,
    AddCategory,
    EditCategory,
    EditSize
}

type Props = {
    category: string
    categories: string[]
}
const AddModal = ({category, categories}: Props) => {
    const [tab, setTab] = useState<Tab>(Tab.AddSize);

    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <div
                    className={csx({[styles.active]: tab !== Tab.AddSize})}
                    onClick={tab !== Tab.AddSize ? () => setTab(Tab.AddSize) : undefined}
                >
                    Add Size
                </div>
                <div
                    className={csx({[styles.active]: tab !== Tab.AddCategory})}
                    onClick={tab !== Tab.AddCategory ? () => setTab(Tab.AddCategory) : undefined}
                >
                    Add Category
                </div>
            </div>
            <div className={content.content}>
                {
                    (tab === Tab.AddSize && <AddSize categories={categories} defaultCategory={category}/>) ||
                    (tab === Tab.AddCategory && <AddCategory/>)
                }
            </div>
        </div>
    );
};

export default AddModal;