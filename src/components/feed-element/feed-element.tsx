import styles from "./feed-element.module.css";
import React, { FunctionComponent } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderIngridientsList } from "../order-ingridient-list/order-ingridient-list";
import { OrderIngridient } from "../order-ingridient/order-ingridient";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "../../services/storage/hooks";
import { TIngredientPropType, TOrderPropType } from "../../services/custom-types/custom-types";

type TFeedElementProps = {
    orderData: TOrderPropType;
    linkBase:string;
};

export const FeedElement: FunctionComponent<TFeedElementProps> = ({ orderData, linkBase,...props }) => {
    const ingredients = orderData.ingredients;
    const cretionDate = new Date(orderData.createdAt);
    const dateParceOptions: Intl.DateTimeFormatOptions = {
        hourCycle: "h24",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    };
    const parsedDateTime = cretionDate.toLocaleDateString(
        "ru-RU",
        dateParceOptions
    );
    let ingridientsIcons: Array<JSX.Element> = [];
    let price = 0;

    const location = useLocation();
    const fullIngredientsList = useSelector(
        (store) => store.fullIngredients.collection,
    );

    if (ingredients) {
        let result: Array<JSX.Element> = [];
        let resultPrice = 0;
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i]) {
                let text = null;
                if (i === 5 && ingredients.length > 6) {
                    text = "+" + (ingredients.length - 6);
                }
                const fullIngredient = fullIngredientsList.filter(
                    (element) => element._id === ingredients[i],
                )[0];
                resultPrice += fullIngredient.price;
                if (i < 6) {
                    result = [
                        ...result,
                        <OrderIngridient
                            className={`z${5 - i}`}
                            ingridientImg={fullIngredient.image_mobile}
                            iconText={text}
                            key={i}
                        />,
                    ];
                }
            }
        }
        price = resultPrice;
        ingridientsIcons = result;
    }

    return (
        <li className={styles.FeedElement}>
            <Link
                to={`${linkBase}/${orderData.number}`}
                className={styles.OrderContent}
                state={{ background: location }}
            >
                <div className={styles.InfoBlock}>
                    <p className="text text_type_digits-default">{orderData.number}</p>
                    <p className="text text_type_main-default text_color_inactive">
                        {parsedDateTime}
                    </p>
                </div>
                <p className="text text_type_main-medium">{orderData.name}</p>
                <div className={styles.OrderDetails}>
                    <OrderIngridientsList>{ingridientsIcons}</OrderIngridientsList>
                    <div className={styles.PriceBlock}>
                        <p className="text text_type_digits-default">{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link>
        </li>
    );
}