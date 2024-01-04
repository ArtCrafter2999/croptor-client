import React, {useState} from 'react';
import styles from "./ImageItem.module.scss"
import csx from "classnames";
import Dropdown from "../Dropdown/Dropdown";
import Switch from "../Switch/Switch";
import TrashButton from "../../TrashButton/TrashButton";
import Checkmark from "../../Checkmark/Checkmark";

type Props = {
    image?: string
    name?: string
    classname?: string
    empty?: boolean;
}
const ImageItem = ({
                       image = "https://img.freepik.com/free-photo/grunge-black-concrete-textured-background_53876-124541.jpg",
                       name = "sdsfdsfsfffffffffffffffffffffffdsfsdf",
                       classname, empty
                   }: Props) => {
    const [isCheckmark, setCheckmark] = useState<boolean>(false);
    const [fitNCrop, setFitNCrop] = useState<boolean>(true);
    const [horizontal, setHorizontal] = useState<string>("center");
    const [vertical, setVertical] = useState<string>("center");

    function onTrash() {

    }

    return (
        <div className={csx(styles.item, classname)}>
            <div className={styles.checkboxContainer} onClick={() => setCheckmark(prev => !prev)}
                 title="Use default parameters">
                <Checkmark value={isCheckmark}/>
            </div>
            <div className={styles.imageContainer}>
                {!empty &&
					<>
						<div className={styles.image}>
							<img
								src={image}
								alt={"image not loaded"}/>
						</div>
						<span>{name}</span>
					</>
                }
            </div>
            <div>
                <Dropdown options={["top", "center", "bottom"]} icon={"icons/vertical-snap-active.svg"}
                          selectedOption={vertical} selectOption={setVertical}
                          title={"Align cropping option vertically"}/>
                <Switch classname={styles.switch} value={fitNCrop} setValue={setFitNCrop} text={"Fit & Crop"}
                        title={"Resize image to the borders and then crop"}/>
            </div>
            <div>
                <Dropdown options={["left", "center", "right"]} icon={"icons/horizontal-snap-active.svg"}
                          selectedOption={horizontal} selectOption={setHorizontal}
                          title={"Align cropping option horizontally"}/>
            </div>
            <div className={styles.buttonContainer}>
                {!empty &&
					<div className={styles.button} title={"Set custom center"}>Set Center</div>
                }
            </div>
            <div className={styles.buttonContainer}>
                {!empty &&
					<TrashButton onClick={onTrash} title={"Remove image from list"}/>
                }
            </div>
        </div>
    );
};

export default ImageItem;