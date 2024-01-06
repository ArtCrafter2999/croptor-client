import React, {useContext} from 'react';
import {CategorySize, PresetSize} from "../../reducer/reducer";
import SizeItem from "./SizeItem/SizeItem";
import {AppContext} from "../../App";

type Props = {
    icon: string;
    list: CategorySize[]
}

const SizeList = ({icon, list}: Props) => {
    const {selectedPreset, dispatch} = useContext(AppContext)

    function handleClick(value: boolean, size: PresetSize) {
        if (value) {
            dispatch({action:"addSizeToPreset", value: size})
        } else {
            dispatch({action:"removeSizeFromPreset", value: size})
        }
    }

    return (
        <>
            {list.map(s =>
                <SizeItem
                    key={s.name ?? "" + s.size.width + "x" + s.size.height}
                    name={s.name}
                    size={s.size}
                    isSelected={!!selectedPreset.sizes.find(ps =>
                        ps.name === s.name &&
                        ps.size.width === s.size.width &&
                        ps.size.height === s.size.height)}
                    onClick={(v) => handleClick(v, {icon: icon, name: s.name, size: s.size})}
                />)}
        </>
    );
};

export default SizeList;