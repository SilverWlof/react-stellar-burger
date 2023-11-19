import styles from "./order-info.module.css";
import React, { FunctionComponent } from "react";
import doneImg from "../../images/done.svg";

export type TOrderInfoProps = {
    id: string | number;
};

export const OrderInfo: FunctionComponent<TOrderInfoProps> = ({ id,...props }) => {
    return (
        <section className={styles.OrderInfoBlock}>
            <p className="text text_type_digits-large">{id}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={doneImg} alt="Order Done" className={styles.DoneImg} />
            <div className={styles.Comment}>
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </section>
    );
}