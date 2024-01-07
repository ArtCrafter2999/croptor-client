import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from "./SetCenterModal.module.scss"
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import {ImageParams, Position, Size} from "../../reducer/reducer";
import {ModalContext} from "../Modal/Modal";
import HeaderButton from "../Header/HeaderButton";

type Props = {
    params: ImageParams;
    onOk?: (p: Position) => void;
}

const SetCenterModal = ({params, onOk}: Props) => {
    const {closeModal} = useContext(ModalContext)
    const [position, setPosition] = useState<Position>();
    const [displayedSize, setDisplayedSize] = useState<Size>();
    const [originalSize, setOriginalSize] = useState<Size>();
    const [selectedPos, setSelectedPos] = useState<Position | null>(params.centerPosition);
    const [isMouseDown, setMouseDown] = useState<boolean>(false);


    const imageRef = useRef<HTMLImageElement>();

    useEffect(() => {
        const img = new Image();
        img.src = params.image;
        img.onload = () =>
            setOriginalSize({width: img.width, height: img.height})
    }, [params]);

    useEffect(() => {
        if (!displayedSize || position) return;
        setPosition({x: displayedSize.width / 2, y: displayedSize.height / 2});
    }, [displayedSize]);

    useEffect(() => {
        if (!imageRef.current) return;
        const imageRect = imageRef.current.getBoundingClientRect();
        setDisplayedSize({width: imageRect.width, height: imageRect.height});
    }, [imageRef.current]);
    useEffect(() => {
        if (!originalSize || !displayedSize || !position) return;

        const originalX = (position.x / displayedSize.width) * originalSize.width;
        const originalY = (position.y / displayedSize.height) * originalSize.height;

        setSelectedPos({x: originalX, y: originalY});
    }, [position]);
    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target !== e.currentTarget) return;
        console.log("mouseDown")
        setMouseDown(true)
    }

    function handleMouseUp(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target !== e.currentTarget || !isMouseDown) return;
        console.log("close");
        setMouseDown(false)
        closeModal();
    }

    function handleOk() {
        if (onOk && selectedPos)
            onOk({x: Math.floor(selectedPos.x), y: Math.floor(selectedPos.y)});
        closeModal();
    }

    return (
        <div className={styles.modal} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            {displayedSize &&
				<Draggable
					defaultClassName={styles.draggable}
					defaultClassNameDragging={styles.drag}
					bounds={{top: 0, left: 0, right: displayedSize?.width, bottom: displayedSize?.height}}
					onDrag={(_, p) => setPosition({x: p.x, y: p.y})}
					position={position}
				>
					<div className={styles.draggableDiv}>
						<img src={"icons/draggable-target.svg"}/>
					</div>
				</Draggable>
            }
            <img src={params.image} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} ref={imageRef as any}/>
            <HeaderButton text={"Ok"} color={"#00dede"} onClick={handleOk}/>
        </div>
    );
};

export default SetCenterModal;