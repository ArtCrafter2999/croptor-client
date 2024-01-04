import React from 'react';
import styles from "./Header.module.scss"

type Props = {
    text: string
    color: string;
}

const HeaderButton = ({text, color}: Props) => {
    const style: React.CSSProperties = {}
    // @ts-ignore
    style['--color'] = color;
    return (
        <div className={styles.button} style={style}>
            {text}
        </div>
    );
};

export default HeaderButton;