import React, {ReactNode, useContext, useState} from 'react';
import styles from "./CategoryItem.module.scss"
import {AppContext} from "../../../App";
import csx from "classnames";
import TrashButton from "../../TrashButton/TrashButton";
import {Category} from "../../../reducer/reducer";

type Props = {
    icon: string,
    name: string,
    alwaysOpened?: boolean
    children?: ReactNode;
    onAdd?: () => void;
    onEdit?: () => void;
    onRemove?: () => void;
}
const CategoryItem = ({alwaysOpened = false, icon, name, children, onAdd, onRemove, onEdit}: Props) => {
    const [isOpened, setOpened] = useState<boolean>(alwaysOpened);
    const [isItemHover, setItemHover] = useState<boolean>(false);
    const [isEditHover, setEditHover] = useState<boolean>(false);
    const [isAddHover, setAddHover] = useState<boolean>(false);

    function handleClick() {
        !alwaysOpened && setOpened(prev => !prev)
    }

    return (
        <div className={styles.category}>
            <div className={csx(styles.row, {[styles.alwaysOpened]: alwaysOpened})}
                 onMouseEnter={() => setItemHover(true)}
                 onMouseLeave={() => setItemHover(false)}
            >
                <img onClick={handleClick} src={icon}/>
                <span onClick={handleClick}>{name}</span>
                {isItemHover &&
                    <>
                        {onAdd &&
							<div className={styles.button} onClick={onAdd}>
								<img src={`icons/add-${isAddHover ? "hover" : "active"}.svg`} alt={"add"}
									 onMouseEnter={() => setAddHover(true)}
									 onMouseLeave={() => setAddHover(false)}/>
							</div>
                        }
                        {onEdit &&
							<div className={styles.button} onClick={onEdit}>
								<img src={`icons/edit-${isEditHover ? "hover" : "active"}.svg`} alt={"add"}
									 onMouseEnter={() => setEditHover(true)}
									 onMouseLeave={() => setEditHover(false)}/>
							</div>
                        }
                        {onRemove &&
							<div className={styles.button} onClick={onAdd}>
								<TrashButton/>
							</div>
                        }
                    </>
                }
            </div>
            {isOpened &&
				<div className={styles.sizes}>
                    {children}
				</div>
            }
        </div>
    );
};


export default CategoryItem;