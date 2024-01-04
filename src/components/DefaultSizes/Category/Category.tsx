import React, {ReactNode, useState} from 'react';
import styles from "./Category.module.scss"

type Props = {
    icon: string,
    name: string,
    alwaysOpened?: boolean
    children?: ReactNode;
}
const Category = ({alwaysOpened = false, icon, name, children}: Props) => {
    const [isOpened, setOpened] = useState<boolean>(alwaysOpened);

    return (
        <div className={styles.category}>
            <div className={styles.row} onClick={() => !alwaysOpened && setOpened(prev => !prev)}>
                <img src={icon} alt={name}/>
                <span>{name}</span>
            </div>
            {isOpened &&
				<div className={styles.sizes}>
                    {children}
				</div>
            }
        </div>
    );
};


export default Category;