import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";

function usePopup<T extends HTMLElement = HTMLDivElement>()
    : [boolean, Dispatch<SetStateAction<boolean>>, MutableRefObject<T | undefined>] {
    const [isOpen, setOpen] = useState<boolean>(false);
    const ref = useRef<T>();

    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (isOpen && ref.current && !ref.current.contains(e.target as any)) {
                setOpen(false);
            }
        }

        window.addEventListener("click", onClick);
        return () => window.removeEventListener("click", onClick);
    }, [ref.current, isOpen]);

    return [isOpen, setOpen, ref];
}

export default usePopup;