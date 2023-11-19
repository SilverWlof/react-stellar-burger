import styles from "./order-ingridient.module.css";
import React, { FunctionComponent } from "react";

type TOrderIngridientProps = {
    ingridientImg?: string;
    iconText?: string|null;
    className?: string;
    hasNoGap?:boolean;
};

export const OrderIngridient: FunctionComponent<TOrderIngridientProps> = ({ ingridientImg, iconText, className, hasNoGap, ...props }) => {
    let fullClassName = "";
    if (className) {
        fullClassName = `${styles.element} ${styles[className]}`;
    } else {
        fullClassName = `${styles.element}`;
    }
    if (!hasNoGap) {
        fullClassName = `${fullClassName} ${styles.needGap}`;
    }
    return (
        <div className={fullClassName}>
            <img src={ingridientImg} className={styles.img} alt="miniature" />
            {iconText && (
                <div className={styles.coverText}>
                    <p className="text text_type_main-small">{iconText}</p>
                </div>
            )}
        </div>
    );
}