import styles from "./order-full-ingridient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderIngridient } from "../order-ingridient/order-ingridient";
import { FunctionComponent } from "react";

export type TOrderFullIngridientProps = {
    imgSrc: string;
    title: string;
    priceText: string;
};
export const OrderFullIngridient: FunctionComponent<TOrderFullIngridientProps> = ({ imgSrc, title, priceText, ...props }) => {
    return (
        <li className={styles.main}>
            <div className={styles.row}>
                <div>
                    <OrderIngridient ingridientImg={imgSrc} hasNoGap={true} />
                </div>
                <div className={styles.titleBlock}>
                    <p className="text text_type_main-medium">{title}</p>
                    <div />
                </div>
            </div>
            <div className={styles.PriceBlock}>
                <p className="text text_type_digits-default">{priceText}</p>
                <CurrencyIcon type="primary" />
            </div>
        </li>
    );
}