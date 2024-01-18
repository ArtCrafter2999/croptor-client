import React, {useContext, useState} from 'react';
import styles from "./DefaultSizes.module.scss"
import CategoryItem from "./CategoryItem/CategoryItem";
import {AppContext, UserContext} from "../../App";
import SizeList from "./SizeList";
import Modal from "../Modal/Modal";
import AddModal from "./AddModal/AddModal";
import {Category} from "../../reducer/reducer";
import {CategorySize} from "../../models/Sizes";
import EditCategoryModal from "./EditCategoryModal/EditCategoryModal";
import EditSizeModal from "./EditSizeModal/EditSizeModal";

const DefaultSizes = () => {
    const {defaultSizes, api} = useContext(AppContext)
    const {user} = useContext(UserContext)
    const [isAdd, setAdd] = useState<boolean>(false);
    const [category, setCategory] = useState<Category>(defaultSizes[0]);
    const [categoryToEdit, setCategoryToEdit] = useState<Category>();
    const [sizeToEdit, setSizeToEdit] = useState<CategorySize>();

    function handleRemoveSize() {
        api?.defaultSizes.removeSize()
    }

    function handleAdd(category: Category) {
        setAdd(true)
        setCategory(category);
    }

    function handleRemoveCategory() {
        api?.defaultSizes.removeCategory()
    }

    return (
        <div className={styles.section}>
            {defaultSizes.map(c => (
                <CategoryItem icon={c.icon} name={c.name} key={c.name}
                              onAdd={
                                  // user?.plan === "Admin" ?
                                  () => handleAdd(c)
                                  // :  undefined
                              }
                              onRemove={
                                  // user?.plan === "Admin" ?
                                  handleRemoveCategory
                                  // :  undefined
                              }
                              onEdit={
                                  // user?.plan === "Admin" ?
                                  () => setCategoryToEdit(c)
                                  // :  undefined
                              }
                >
                    <SizeList icon={c.icon} list={c.sizes} category={c.name}
                              onRemove={
                                  // user?.plan === "Admin" ?
                                  handleRemoveSize
                                  // :  undefined
                              }
                              onEdit={
                                  // user?.plan === "Admin" ?
                                  setSizeToEdit
                                  // :  undefined
                              }
                    />
                </CategoryItem>
            ))}
            <Modal isOpen={isAdd} setOpen={setAdd}>
                <AddModal categories={defaultSizes.map(c => c.name)} category={category.name}/>
            </Modal>
            <Modal isOpen={!!categoryToEdit} setOpen={() => setCategoryToEdit(undefined)}>
                <EditCategoryModal category={categoryToEdit as Category}/>
            </Modal>
            <Modal isOpen={!!sizeToEdit} setOpen={() => setSizeToEdit(undefined)}>
                <EditSizeModal sizeToChange={sizeToEdit as CategorySize}/>
            </Modal>
        </div>
    );
};

export default DefaultSizes;