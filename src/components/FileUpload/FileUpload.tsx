import React, {useContext, useEffect, useRef, useState} from 'react';
import csx from "classnames";
import styles from "./FileUpload.module.scss";
import addStyles from "../../App.module.scss";

const MAX_FILE_SIZE_MB = 100;

const checkFileSize = (files: FileList | File[]) => {
    for (let i = 0; i < files.length; i++) {
        const fileSizeMB = files[i].size / (1024 * 1024); // Convert file size to megabytes
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            return false; // File size exceeds the limit
        }
    }
    return true; // All files are within the size limit
};


type Props = {
    // children: ReactNode;
    onFilesDropped: (files: File[]) => void;
}
const FileUpload = ({onFilesDropped}: Props) => {
    const [active, setActive] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (event: { preventDefault: () => void, shiftKey: boolean }) => {
        event.preventDefault();
        setIsDragOver(true);
        // console.log("set true handle");
    };


    const handleDrop = (event: { preventDefault: () => void, dataTransfer: DataTransfer | null, shiftKey: boolean }) => {
        event.preventDefault();
        const files = event.dataTransfer?.files

        if (files) {
            onFilesDropped((Array.from(files)));
        }
        setActive(false);
        setIsDragOver(false);
    };
    const handleDragLeave = (event?: { preventDefault: () => void }) => {
        event?.preventDefault();
        setIsDragOver(false);
        setActive(false);
        // console.log("set false handle");
    };

    useEffect(() => {
        function ctrlV(e: ClipboardEvent) {
            const items = e.clipboardData?.items;

            if (items) {
                const files: File[] = [];

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];

                    if (item.kind === 'file') {
                        const file = item.getAsFile();
                        if (file) {
                            files.push(file);
                        }
                    }
                }

                if (files.length > 0) {
                    e.preventDefault();
                    onFilesDropped(files);
                }
            }
        }

        function onDragOver(e: DragEvent) {
            if (e.dataTransfer && Array.from(e.dataTransfer.types).includes('Files'))
                setActive(true);
        }

        document.addEventListener("dragover", onDragOver);
        document.addEventListener("paste", ctrlV);
        return () => {
            document.removeEventListener("dragover", onDragOver);
            document.removeEventListener("paste", ctrlV);
        }
    }, [])

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            className={csx(addStyles.backdrop, {[addStyles.active]: active, [addStyles.show]: isDragOver})}
            style={{zIndex: "990"}}
        >
            {isDragOver &&
				<div className={styles.modalWindow}>
					<h1>Upload Files</h1>
				</div>
            }
        </div>
    );
};
export default FileUpload;