import React, {useState} from 'react';

type Props = {
    [x: string]: any
}
const TrashButton = ({...rest}: Props) => {
    const [isHover, setHover] = useState<boolean>(false);

    return (
        <img src={`icons/trash-${isHover ? "hover" : "active"}.svg`}
             alt={"Delete"}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             {...rest}
        />
    );
};

export default TrashButton;