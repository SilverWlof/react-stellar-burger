import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styles from "./ingredient-element.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types";
import { useDrag } from "react-dnd";
import {
  SET_MODAL_CONTENT,
  SET_MODAL_VIEW_STATE,
  INGREDIENT_MODAL_TYPE,
} from "../../services/actions/modal";
import {
  INSERT_SELECTED_INGREDIENT,
    SET_SELECTED_BUN,
    addIngridient,
    addBun
} from "../../services/actions/selectedCollection";
import { SET_DRAG_STYLE_TYPE } from "../../services/actions/utils";

function IngredientElement(props) {
  const dispatch = useDispatch();

  const location = useLocation();

  const elementData = props.elementData;
    const insertType =
        props.elementData.type === "bun"
            ? addBun : addIngridient;
      //: INSERT_SELECTED_INGREDIENT;

  const [{ isDrag }, drag] = useDrag({
    type: "test",
    item: { elementData, actionType: insertType },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    dispatch({
      type: SET_DRAG_STYLE_TYPE,
      isDragged: isDrag,
    });
  }, [dispatch, isDrag]);
  const selectedIngredientsList = useSelector(
    (store) => store.selectedIngredients.collection,
  );
  const bunData = useSelector((store) => store.selectedIngredients.bunData);

  const [count, setCount] = useState(0);
  useEffect(() => {
    let newCounter = selectedIngredientsList.filter(
      (x) => x?.data._id === elementData._id,
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
            {props.elementData.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-small">{props.elementData.name}</p>
        {count && <Counter count={count} size="default" extraClass="m-1" />}
      </li>
    </Link>
  );
}
export default IngredientElement;

const IngredientElementPropTypes = PropTypes.shape({
  item: ingredientPropType,
  count: PropTypes.number,
});

IngredientElement.propTypes = {
  data: IngredientElementPropTypes,
};
