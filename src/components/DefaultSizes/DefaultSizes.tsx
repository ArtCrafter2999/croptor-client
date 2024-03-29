import React, {useContext, useState} from 'react';
import styles from "./DefaultSizes.module.scss"
import CategoryItem from "./CategoryItem/CategoryItem";
import {AppContext, UserContext} from "../../App";
import SizeList from "./SizeList";
import Modal from "../Modal/Modal";
import AddModal from "./AddModal/AddModal";
import {Category} from "../../reducer/reducer";
import {CategorySize, PresetSize} from "../../models/Sizes";
import EditCategoryModal from "./EditCategoryModal/EditCategoryModal";
import EditSizeModal from "./EditSizeModal/EditSizeModal";

const DefaultSizes = () => {
    const {defaultSizes, api, dispatch} = useContext(AppContext)
    const {user} = useContext(UserContext)
    const [isAdd, setAdd] = useState<boolean>(false);
    const [category, setCategory] = useState<Category>(defaultSizes[0]);
    const [categoryToEdit, setCategoryToEdit] = useState<Category>();
    const [sizeToEdit, setSizeToEdit] = useState<CategorySize>();

    function handleRemoveSize(categoryId: string, size: PresetSize) {
        api?.defaultSizes.removeSize(categoryId, size)
            .then(() => dispatch({action: "removeSize", value: {categoryId, size}}))
    }

    function handleAdd(category: Category) {
        setAdd(true)
        setCategory(category);
    }

    function handleRemoveCategory(category: Category) {
        if(category.id)
            api?.defaultSizes.removeCategory(category.id)
                .then(() => dispatch({action: "removeCategory", value: {categoryId: category.id as string}}))
    }

    const sorted = [...defaultSizes].sort((a, b) => {
        if (a.name > b.name) {
            return -1; // Return a negative value to sort in reversed order
        } else if (a.name < b.name) {
            return 1; // Return a positive value to sort in reversed order
        } else {
            return 0; // Return 0 if the names are equal
        }
    })

    return (
        <div className={styles.section}>
            {sorted.map(c => (
                <CategoryItem icon={c.iconUri} name={c.name} key={c.name}
                              onAdd={
                                  user?.plan === "Admin" ?
                                  () => handleAdd(c)
                                  :  undefined
                              }
                              onRemove={
                                  user?.plan === "Admin" ?
                                  () => handleRemoveCategory(c)
                                  :  undefined
                              }
                              onEdit={
                                  user?.plan === "Admin" ?
                                  () => setCategoryToEdit(c)
                                  :  undefined
                              }
                >
                    <SizeList icon={c.iconUri} list={c.sizes} category={c}
                              onRemove={
                                  user?.plan === "Admin" ?
                                  handleRemoveSize
                                  :  undefined
                              }
                              onEdit={
                                  user?.plan === "Admin" ?
                                      (s) => {
                                          setSizeToEdit(s);
                                          setCategory(c);
                                      }
                                  :  undefined
                              }
                    />
                </CategoryItem>
            ))}
            <Modal isOpen={isAdd} setOpen={setAdd}>
                <AddModal categories={defaultSizes} category={category}/>
            </Modal>
            <Modal isOpen={!!categoryToEdit} setOpen={() => setCategoryToEdit(undefined)}>
                <EditCategoryModal category={categoryToEdit as Category}/>
            </Modal>
            <Modal isOpen={!!sizeToEdit} setOpen={() => setSizeToEdit(undefined)}>
                <EditSizeModal category={category} sizeToChange={sizeToEdit as CategorySize}/>
            </Modal>
        </div>
    );
};

export default DefaultSizes;