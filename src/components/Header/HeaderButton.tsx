import React, {ReactNode} from 'react';
import styles from "./Header.module.scss"
import csx from "classnames";

type Props = {
    children: ReactNode
    color: string;
    className?: string;
    onClick?: () => void;
    [x: string]: any;
}

const HeaderButton = ({children, color, onClick, className, ...rest}: Props) => {
    const style: React.CSSProperties = {}
    // @ts-ignore
    style['--color'] = color;
    return (
        <div className={csx(styles.button, className)} style={style} onClick={onClick} {...rest}>
            {children}
        </div>
    );
};

export default HeaderButton;