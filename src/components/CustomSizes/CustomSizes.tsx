import React, {useContext} from 'react';
import styles from "./CustomSizes.module.scss"
import CategoryItem from "../DefaultSizes/CategoryItem/CategoryItem";
import {AppContext} from "../../App";
import SizeList from "../DefaultSizes/SizeList";

const CustomSizes = () => {
    const {customSizes} = useContext(AppContext)

    return (
        <div className={styles.section}>
            <CategoryItem icon={"icons/custom-size.svg"} name={"Custom"} alwaysOpened>
                <SizeList icon={"icons/custom-size.svg"} list={customSizes.map(size => ({size}))}/>
            </CategoryItem>
        </div>
    );
};

export default CustomSizes;