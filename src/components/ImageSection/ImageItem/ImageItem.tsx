import React, {useEffect, useState} from 'react';
import styles from "./ImageItem.module.scss"
import csx from "classnames";
import Dropdown from "../Dropdown/Dropdown";
import Switch from "../Switch/Switch";
import TrashButton from "../../TrashButton/TrashButton";
import Checkmark from "../../Checkmark/Checkmark";
import {Horizontal, ImageParams, Parameters, Vertical} from "../../../reducer/reducer";
import Modal from "../../Modal/Modal";
import SetCenterModal from "../../SetCenterModal/SetCenterModal";

type Props = {
    params: ImageParams | Parameters
    classname?: string
    onChange: (d: ImageParams | Parameters) => void;
    onTrash?: (image: string) => void;
}
const ImageItem = ({
                       params,
                       classname,
                       onChange,
                       onTrash
                   }: Props) => {
    const [isCheckmark, setCheckmark] = useState<boolean>(params.useDefault);
    const [fitNCrop, setFitNCrop] = useState<boolean>(params.fitNCrop);
    const [horizontal, setHorizontal] = useState<Horizontal>(params.horizontalSnap);
    const [vertical, setVertical] = useState<Vertical>(params.verticalSnap);
    const [isSetCenter, setSetCenter] = useState<boolean>(false);


    useEffect(() => {
        onChange({
            ...params,
            useDefault: isCheckmark,
            fitNCrop,
            horizontalSnap: horizontal,
            verticalSnap: vertical
        });
    }, [isCheckmark, fitNCrop, horizontal, vertical]);


    return (
        <div className={csx(styles.item, classname)}>
            <div className={styles.checkboxContainer} onClick={() => setCheckmark(prev => !prev)}
                 title="Use default parameters">
                <Checkmark value={isCheckmark}/>
            </div>
            <div className={styles.imageContainer}>
                {"image" in params &&
					<>
						<div className={styles.image}>
							<img
								src={(params as ImageParams).image}
								alt={"image not loaded"}/>
							<div className={styles.icon}>
								<img
									src={"icons/warning.svg"}
									alt={"warning"}/>
							</div>
						</div>
						<span>{(params as ImageParams).name}</span>
					</>
                }
            </div>
            <div>
                <Dropdown options={["Top", "Center", "Bottom"]} icon={"icons/vertical-snap-active.svg"}
                          selectedOption={vertical} selectOption={(v) => setVertical(v as Vertical)}
                          title={"Align cropping option vertically"}/>
                <Switch classname={styles.switch} value={fitNCrop} setValue={setFitNCrop} text={"Fit & Crop"}
                        title={"Resize image to the borders and then crop"}/>
            </div>
            <div>
                <Dropdown options={["Left", "Center", "Right"]} icon={"icons/horizontal-snap-active.svg"}
                          selectedOption={horizontal} selectOption={(v) => setHorizontal(v as Horizontal)}
                          title={"Align cropping option horizontally"}/>
            </div>
            <div className={styles.buttonContainer}>
                {"image" in params &&
					<div className={styles.button} title={"Set custom center"} onClick={() => setSetCenter(true)}
					>
                        {/*{params.centerPosition? params.centerPosition.x + " " + params.centerPosition.y: "Set Center"}*/}
						Set Center
					</div>
                }
            </div>
            <div className={styles.buttonContainer}>
                {"image" in params &&
					<TrashButton onClick={() => onTrash && onTrash(params.image)} title={"Remove image from list"}/>
                }
            </div>
            {"image" in params &&
				<Modal isOpen={isSetCenter} setOpen={setSetCenter}>
					<SetCenterModal
						params={(params as ImageParams)}
						onOk={(centerPosition) => onChange({...params, centerPosition})}/>
				</Modal>
            }
        </div>
    );
};

export default ImageItem;