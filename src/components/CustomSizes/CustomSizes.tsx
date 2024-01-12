import React, {useContext} from 'react';
import styles from "./CustomSizes.module.scss"
import CategoryItem from "../DefaultSizes/CategoryItem/CategoryItem";
import {AppContext} from "../../App";
import SizeList from "../DefaultSizes/SizeList";
import {CategorySize} from "../../models/Sizes";

const CustomSizes = () => {
    const {customSizes, dispatch} = useContext(AppContext)

    function handleRemove(_: unknown, s: CategorySize) {
        dispatch({action: "removeCustomSize", value: s});
    }

    return (
        <div className={styles.section}>
            <CategoryItem icon={"icons/custom-size.svg"} name={"Custom"} alwaysOpened>
                <SizeList icon={"icons/custom-size.svg"} list={customSizes} category={"Custom"} onRemove={handleRemove}/>
            </CategoryItem>
        </div>
    );
};

export default CustomSizes;