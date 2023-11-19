import { FunctionComponent } from "react";
import styles from "./scrolling-container.module.css";

type TScrollingContainerProps = {
    className?:string;
};

export const ScrollingContainer: FunctionComponent<TScrollingContainerProps> = ({ className, children, ...props }) => {
    let fullClassName = "";
    if (className) {
        fullClassName = `${styles.scrollingContainer} ${styles[className]}`;
    } else {
        fullClassName = `${styles.scrollingContainer}`;
    }
    return (
        <div className={styles.scrollWrapper}>
            <ul className={`${fullClassName} custom-scroll`}>{children}</ul>
        </div>
    );
}