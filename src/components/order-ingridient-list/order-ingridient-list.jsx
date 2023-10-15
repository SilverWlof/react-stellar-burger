import styles from "./order-ingridient-list.module.css";
import React, { useEffect, useRef, useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderIngridientsList = (props) => {
  const { orderData } = props;

  return <ul className={styles.list}>{props.children}</ul>;
};
export default OrderIngridientsList;
