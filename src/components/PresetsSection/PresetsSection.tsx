import React, {useContext, useState} from 'react';
import styles from "./PresetsSection.module.scss"
import TopPart from "./TopPart/TopPart";
import SizeItem from "./SizeItem/SizeItem";
import {AppContext, UserContext} from "../../App";
import {PresetSize} from "../../models/Sizes";

type Props = {
    setError: (message: string) => void;
}
const PresetsSection = ({setError}: Props) => {
    const {presets, presetIds, selectedPreset, dispatch, api} = useContext(AppContext)
    const {user} = useContext(UserContext)
    const [index, setIndex] = useState<number>(0);

    // console.log(index, presets, presetIds, selectedPreset)

    function handleRemoveSize(s: PresetSize) {
        dispatch({action: "removeSizeFromPreset", value: {name: s.name, size: s}});
    }

    function handleSave() {
        // if (!user || user.plan === "Free")
        //     setError("To save presets please upgrade to PRO PLAN");
        // else
            api?.presets.savePreset(selectedPreset);
    }

    function handlePrev() {
        console.log("handlePrev")
        if (index > 0) {
            if (presets[index - 1]) {
                dispatch({action: "selectPreset", value: index - 1})
            } else {
                api?.presets.getPreset(presetIds[index - 1]).then(preset => {
                    dispatch({action: "handlePresetLoaded", value: {preset, index: index - 1}})
                    dispatch({action: "selectPreset", value: index - 1})
                })
            }
            setIndex(prev => prev - 1);
        }
    }

    function handleNext() {
        console.log("handleNext")
        if (index < presets.length - 1) {
            dispatch({action: "selectPreset", value: index + 1});
        } else if (index < presetIds.length - 1) {
            api?.presets.getPreset(presetIds[index + 1]).then(preset => {
                dispatch({action: "handlePresetLoaded", value: {preset, index: index + 1}})
                dispatch({action: "selectPreset", value: index + 1})
            })
        } else {
            dispatch({action: "createPreset"})
        }
        setIndex(prev => prev + 1);
    }

    function handleChangeName(title: string) {
        dispatch({action: "changePresetTitle", value: {title, index}});
    }

    function handleRemovePreset() {
        if(selectedPreset.id && api){
            api.presets.removePreset(selectedPreset.id)
                .then(() => dispatch({action: "removePreset", value: index}));
        }
        else dispatch({action: "removePreset", value: index});

        if (index === presets.length - 1 && index > 0) {
            setIndex(prev => prev - 1);
        }
    }

    return (
        <div className={styles.section}>
            <TopPart name={selectedPreset.name}
                     onSave={handleSave}
                     onPrev={handlePrev}
                     onNext={handleNext}
                     onRemove={handleRemovePreset}
                     onChangeName={handleChangeName}
            />
            <div>
                {selectedPreset.sizes.map(s =>
                    <SizeItem key={s.name ?? "" + s.width + "x" + s.height}
                              presetSize={s}
                              onRemove={() => handleRemoveSize(s)}/>)}

                {/*<SizeItem size={{width: 1280, height: 720}} icon={"icons/custom-size.svg"}/>*/}
                {/*<SizeItem size={{width: 1920, height: 1080}} icon={"icons/custom-size.svg"}/>*/}
                {/*<SizeItem size={{width: 777, height: 888}} icon={"icons/custom-size.svg"}/>*/}
                {/*<SizeItem name={"Header"} size={{width: 1500, height: 1500}} icon={"testIcons/twitter.svg"}/>*/}
                {/*<SizeItem name={"Small Thumbnail"} size={{width: 55, height: 55}} icon={"testIcons/pinterest.svg"}/>*/}
                {/*<SizeItem name={"Video Thumbnail"} size={{width: 1280, height: 720}} icon={"testIcons/youtube.svg"}/>*/}
                {/*<SizeItem name={"Profile"} size={{width: 110, height: 110}} icon={"testIcons/instagram.svg"}/>*/}
                {/*<SizeItem name={"Pin"} size={{width: 800, height: 1200}} icon={"testIcons/pinterest.svg"}/>*/}
                {/*<SizeItem name={"Image Ad"} size={{width: 1080, height: 1920}} icon={"testIcons/pinterest.svg"}/>*/}
            </div>
        </div>
    );
};

export default PresetsSection;