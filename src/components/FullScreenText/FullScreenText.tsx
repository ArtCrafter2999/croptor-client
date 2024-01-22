import React from 'react';
import styles from "./FullScreenText.module.scss"

type Props = {
    html: string
}

const FullScreenText = ({html}: Props) => {
    return (
        <div className={styles.screen} dangerouslySetInnerHTML={{__html: html}}/>
    );
};

export default FullScreenText;