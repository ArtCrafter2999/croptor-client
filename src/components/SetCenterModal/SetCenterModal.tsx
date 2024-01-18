import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from "./SetCenterModal.module.scss"
import Draggable from 'react-draggable';
import {Position} from "../../reducer/reducer";
import {ModalContext} from "../Modal/Modal";
import HeaderButton from "../Header/HeaderButton";
import {AppContext} from "../../App";
import {Size} from "../../models/Sizes";
import {ImageParams} from "../../models/Params";

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

    console.log(selectedPos)

    useEffect(() => {
        if (!displayedSize || position) return;
        setPosition({x: displayedSize.width / 2, y: displayedSize.height / 2});
    }, [displayedSize]);

    useEffect(() => {
        function updateDisplayedSize() {
            if (!originalSize) return;
            let width: number;
            let height: number;
            if (originalSize.width > originalSize.height * 2) {
                width = document.documentElement.clientWidth * 0.50;
                height = originalSize.height * (width / originalSize.width);
            } else {
                height = document.documentElement.clientHeight * 0.70;
                width = originalSize.width * (height / originalSize.height);
            }
            setDisplayedSize({width, height});
            setPosition({x: width / 2, y: 0});
        }

        updateDisplayedSize()

        window.addEventListener("resize", updateDisplayedSize);
        return () => window.removeEventListener("resize", updateDisplayedSize);
    }, [originalSize]);

    useEffect(() => {
        if (!originalSize || !displayedSize || !position) return;

        const originalX = (position.x / displayedSize.width) * originalSize.width;
        const originalY = ((position.y + displayedSize.height / 2 - 10) / displayedSize.height) * originalSize.height;

        setSelectedPos({x: Math.floor(originalX), y: Math.floor(originalY)});
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
            onOk({x: selectedPos.x, y:selectedPos.y});
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
                            top: -displayedSize.height / 2 + 10,
                            left: 0,
                            right: displayedSize.width,
                            bottom: displayedSize.height /2 + 10
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
            <div className={styles.row}>
                <span onClick={handleOk}>
                    Ok
                </span>
            </div>
        </div>
    );
};

export default SetCenterModal;