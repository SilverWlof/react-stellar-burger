import styles from "./order-ingridient-list.module.css";
import React, { FunctionComponent } from "react";

export const OrderIngridientsList: FunctionComponent = ({ ...props }) => {
    return <ul className={styles.list}>{props.children}</ul>;
}