import React, {useContext} from 'react';
import SizeItem from "./SizeItem/SizeItem";
import {AppContext} from "../../App";
import {CategorySize, PresetSize} from "../../models/Sizes";

type Props = {
    icon: string;
    list: CategorySize[]
    category: string
    onRemove?: (category: string, s: CategorySize) => void;
}

const SizeList = ({icon, list, onRemove, category}: Props) => {
    const {selectedPreset, dispatch} = useContext(AppContext)

    function handleClick(value: boolean, size: PresetSize) {
        if (value) {
            dispatch({action:"addSizeToPreset", value: size})
        } else {
            dispatch({action:"removeSizeFromPreset", value: {name: size.name, size: size}})
        }
    }

    return (
        <>
            {list.map(s =>
                <SizeItem
                    key={s.name ?? "" + s.width + "x" + s.height}
                    name={s.name}
                    size={s}
                    isSelected={!!selectedPreset.sizes.find(ps =>
                        ps.name === s.name &&
                        ps.width === s.width &&
                        ps.height === s.height)}
                    onClick={(v) => handleClick(v, {...s, icon: icon})}
                    onRemove={onRemove === undefined? undefined: () => onRemove(category, s)}
                />)}
        </>
    );
};

export default SizeList;