import React, {useContext, useEffect, useState} from 'react';
import styles from "./ImageItem.module.scss"
import csx from "classnames";
import Dropdown from "../Dropdown/Dropdown";
import Switch from "../Switch/Switch";
import TrashButton from "../../TrashButton/TrashButton";
import Checkmark from "../../Checkmark/Checkmark";
import Modal from "../../Modal/Modal";
import SetCenterModal from "../../SetCenterModal/SetCenterModal";
import {AppContext} from "../../../App";
import Warning from "./Warning";
import ObservableParams from "./ObservableParams";
import {PresetSize, Size} from "../../../models/Sizes";
import {Horizontal, Vertical} from "../../../models/Alignment";
import {ImageParams, Parameters} from "../../../models/Params";

type Props = {
    params: ImageParams | Parameters
    classname?: string
    onChange: (d: Parameters) => void;
}
const ImageItem = ({
                       params,
                       classname,
                       onChange
                   }: Props) => {
    const [isSetCenter, setSetCenter] = useState<boolean>(false);
    const state = new ObservableParams(params, onChange)
    const {sizesDictionary, selectedPreset, dispatch} = useContext(AppContext)
    const [isWarningHover, setWarningHover] = useState<boolean>(false);
    const originalSize: Size | undefined = "name" in params ? sizesDictionary[params.name] : undefined;
    const incapableSizes: PresetSize[] = []
    if (originalSize && !params.fitNCrop) {
        selectedPreset.sizes.forEach(s => {
            if (!originalSize) return;
            if (s.width > originalSize.width || s.height > originalSize.height)
                incapableSizes.push(s);
        })
    }
    useEffect(() => {
        if(params.useDefault && params.centerPosition){
            state.centerPosition = null;
        }
    }, [params.useDefault]);
    function handleWarningHover() {
        if (incapableSizes.length > 0)
            setWarningHover(true);
    }

    function handleRemove() {
        if ("name" in params)
            dispatch({action: "removeImage", value: params.name});
    }

    return (
        <div className={csx(styles.item, classname)}>
            <div className={styles.checkboxContainer} onClick={() => state.useDefault = !state.useDefault}
                 title="Use default parameters">
                <Checkmark value={state.useDefault}/>
            </div>
            <div className={styles.imageContainer}>
                {"image" in params &&
					<>
						<div className={styles.image}>
							<img
								src={(params as ImageParams).image}
								alt={"image not loaded"}/>
							<div className={styles.icon}
								 onMouseEnter={handleWarningHover}
								 onMouseLeave={() => setWarningHover(false)}
							>
                                {incapableSizes.length > 0 &&
									<img
										src={"icons/warning.svg"}
										alt={"warning"}/>
                                }
                                {isWarningHover &&
									<Warning incapableSizes={incapableSizes}/>
                                }
							</div>
						</div>
						<span>{(params as ImageParams).name}</span>
					</>
                }
            </div>
            <div>
                <Dropdown options={["Top", "Center", "Bottom"]} icon={`icons/vertical-snap-${params.centerPosition ? "inactive": "active"}.svg`}
                          selectedOption={state.verticalSnap} selectOption={(v) => {
                    state.verticalSnap = v as Vertical
                    state.centerPosition = null;
                }}
                          title={"Align cropping option vertically"}/>
                <Switch classname={styles.switch} value={state.fitNCrop} setValue={(v) => state.fitNCrop = v}
                        text={"Fit & Crop"}
                        title={"Resize image to the borders and then crop"}/>
            </div>
            <div>
                <Dropdown options={["Left", "Center", "Right"]} icon={`icons/horizontal-snap-${params.centerPosition ? "inactive": "active"}.svg`}
                          selectedOption={state.horizontalSnap}
                          selectOption={(v) => {
                              state.horizontalSnap = v as Horizontal;
                              state.centerPosition = null;
                          }}
                          title={"Align cropping option horizontally"}/>
            </div>
            <div className={styles.buttonContainer}>
                {"image" in params &&
					<div className={csx(styles.button, {[styles.active]: !!params.centerPosition})} title={"Set custom center"} onClick={() => setSetCenter(true)}
					>
                        {/*{params.centerPosition? params.centerPosition.x + " " + params.centerPosition.y: "Set Center"}*/}
						Set Center
					</div>
                }
            </div>
            <div className={styles.buttonContainer}>
                {"image" in params &&
					<TrashButton onClick={handleRemove} title={"Remove image from list"}/>
                }
            </div>
            {"image" in params &&
				<Modal isOpen={isSetCenter} setOpen={setSetCenter}>
					<SetCenterModal
						params={(params as ImageParams)}
						onOk={(centerPosition) => state.centerPosition = centerPosition}/>
				</Modal>
            }
        </div>
    );
};

export default ImageItem;