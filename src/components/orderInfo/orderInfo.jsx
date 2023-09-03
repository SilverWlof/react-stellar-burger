import styles from "./orderInfo.module.css";
import React from "react";
import doneImg from '../../images/done.svg'



function OrderInfo(props) {
    const defaultOrderId = 123;
    const orderId = false? props.id.data: defaultOrderId ;
    return (
        <section className={styles.OrderInfoBlock}>
            <p className="text text_type_digits-large">{orderId}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={doneImg} alt="Order Done" className={styles.DoneImg} />
            <div className={styles.Comment}>
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            </div>
        </section>
    );
}
export default OrderInfo;