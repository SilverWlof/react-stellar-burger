import React, { FunctionComponent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./ingredient-element.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import { v4 as uuidv4 } from "uuid";
import { setDragStyleTypeAction } from "../../services/actions/utils";
import { useDispatch, useSelector } from "../../services/storage/hooks";
import { insertSelectedIngredientAction, setSelectedBunAction } from "../../services/actions/selectedCollection";
import { TIngredientPropType, TSelectedIngredientPropType } from "../../services/custom-types/custom-types";

export type TIngredientElementProps = {
    elementData: TIngredientPropType;
};

export const IngredientElement: FunctionComponent<TIngredientElementProps> = ({ elementData,...props }) => {
    const dispatch = useDispatch();

    const location = useLocation();

    const insertType = elementData.type === "bun" ? setSelectedBunAction : insertSelectedIngredientAction;
    const [{ isDrag }, drag] = useDrag({
        type: "test",
        item: {
            dragItem: {
                oldPos: null,
                data: {
                    ...elementData,
                    uniqueId: uuidv4()
                }
                },
            actionType: insertType
        },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    useEffect(() => {
        dispatch(setDragStyleTypeAction(isDrag))
    }, [dispatch, isDrag]);
    const selectedIngredientsList = useSelector(
        (store) => store.selectedIngredients.collection,
    );
    const bunData = useSelector((store) => store.selectedIngredients.bunData);

    const [count, setCount] = useState<number|null>(0);
    useEffect(() => {
        let newCounter = selectedIngredientsList.filter(
            (x) => x?.item._id === elementData._id,
        )?.length;

        if (bunData) {
            if (bunData._id === elementData._id) {
                newCounter += 2;
            }
        }

        setCount(newCounter !== 0 ? newCounter : null);
    }, [elementData._id, selectedIngredientsList, bunData]);

    return (
        <Link
            key={elementData._id}
            to={`/ingredients/${elementData._id}`}
            state={{ background: location }}
            className={styles.link + " " + styles.clearLink}
        >
            <li className={styles.ingredientElement} ref={drag}>
                <img src={elementData.image} alt={elementData.name} />
                <div className={styles.ingredientPriceBlock}>
                    <p className="text text_type_main-medium">
                        {elementData.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-small">{elementData.name}</p>
                {count && <Counter count={count} size="default" extraClass="m-1" />}
            </li>
        </Link>
    );
}