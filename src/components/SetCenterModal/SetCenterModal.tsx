import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from "./SetCenterModal.module.scss"
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import {ImageParams, Position, Size} from "../../reducer/reducer";
import {ModalContext} from "../Modal/Modal";
import HeaderButton from "../Header/HeaderButton";
import {AppContext} from "../../App";
import header from "../Header/Header";

type Props = {
    params: ImageParams;
    onOk?: (p: Position) => void;
}

const SetCenterModal = ({params, onOk}: Props) => {
    const {sizesDictionary} = useContext(AppContext)
    const {closeModal} = useContext(ModalContext)
    const [position, setPosition] = useState<Position>();
    const [displayedSize, setDisplayedSize] = useState<Size>();
    const [selectedPos, setSelectedPos] = useState<Position | null>(params.centerPosition);
    const [isMouseDown, setMouseDown] = useState<boolean>(false);
    const imageRef = useRef<HTMLImageElement>();

    const originalSize = sizesDictionary[params.name]

    useEffect(() => {
        if (!displayedSize || position) return;
        setPosition({x: displayedSize.width / 2, y: displayedSize.height / 2});
    }, [displayedSize]);

    useEffect(() => {
        function updateDisplayedSize() {
            if (!originalSize) return;
            let width: number;
            let height: number;
            if (originalSize.width > originalSize.height) {
                width = document.documentElement.clientWidth * 0.70;
                height = originalSize.height * (width / originalSize.width);
            } else {
                height = document.documentElement.clientHeight * 0.95;
                width = originalSize.width * (height / originalSize.height);
            }
            setDisplayedSize({width, height});
            setPosition({x: 0, y: height/2});
        }

        updateDisplayedSize()

        window.addEventListener("resize", updateDisplayedSize);
        return () => window.removeEventListener("resize", updateDisplayedSize);
    }, [originalSize]);

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
				<>
					<Draggable
						defaultClassName={styles.draggable}
						defaultClassNameDragging={styles.drag}
						bounds={{
                            top: 0,
                            left: -displayedSize.width / 2,
                            right: displayedSize.width / 2,
                            bottom: displayedSize.height
                        }}
						onDrag={(_, p) => setPosition(p)}
						position={position}
					>
						<div className={styles.draggableDiv}>
							<img src={"icons/draggable-target.svg"}/>
						</div>
					</Draggable>
					<img style={displayedSize} src={params.image} onMouseDown={handleMouseDown}
						 onMouseUp={handleMouseUp}
						 ref={imageRef as any}/>
				</>
            }
            <HeaderButton color={"#00dede"} onClick={handleOk}>
                Ok
            </HeaderButton>
        </div>
    );
};

export default SetCenterModal;