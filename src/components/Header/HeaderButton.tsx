import React from 'react';
import styles from "./Header.module.scss"

type Props = {
    text: string
    color: string;
    onClick?: () => void;
    [x: string]: any;
}

const HeaderButton = ({text, color, onClick, ...rest}: Props) => {
    const style: React.CSSProperties = {}
    // @ts-ignore
    style['--color'] = color;
    return (
        <div className={styles.button} style={style} onClick={onClick} {...rest}>
            {text}
        </div>
    );
};

export default HeaderButton;