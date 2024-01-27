import React, { useEffect, useState } from 'react';
import styles from "./FullScreenText.module.scss"

type Props = {
    page: string
}

const FullScreenText = ({ page }: Props) => {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        const fetchHtmlContent = async () => {
            try {
                const response = await fetch('/html/' + page + '.html');
                const content = await response.text();
                setHtmlContent(content);
            } catch (error) {
                console.error('Error fetching HTML content', error);
            }
        };

        fetchHtmlContent();
    }, []);

    return (
        <div className={styles.screen} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default FullScreenText;