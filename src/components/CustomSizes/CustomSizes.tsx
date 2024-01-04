import React from 'react';
import styles from "./CustomSizes.module.scss"
import Category from "../DefaultSizes/Category/Category";
import SizeItem from "../DefaultSizes/SizeItem/SizeItem";

const CustomSizes = () => {
    return (
        <div className={styles.section}>
            <Category icon={"icons/custom-size.svg"} name={"Custom"} alwaysOpened>
                <SizeItem size={{width: 1280, height: 720}} isSelected={true}/>
                <SizeItem size={{width: 1920, height: 1080}} isSelected={true}/>
                <SizeItem size={{width: 777, height: 888}} isSelected={true}/>
            </Category>
        </div>
    );
};

export default CustomSizes;