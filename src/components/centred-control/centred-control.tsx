import { FunctionComponent } from "react";
import styles from "./centred-control.module.css";

export const CentredControl: FunctionComponent = ({ children, ...props }) => {
    return (
        <div className={styles.Container}>{children}</div>
    );
}