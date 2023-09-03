import styles from "./burger-constructor.module.css";
import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollingContainer from "../scrolling-container/scrolling-container";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_MODAL_CONTENT,
  SET_MODAL_VIEW_STATE,
  ORDER_MODAL_TYPE,
} from "../../services/actions/modal";
import { getData } from "../../services/actions/selectedCollection";

import { BurgerElement } from "../burger-element/burger-element";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [canOrder, setCanOrder] = React.useState(false);
  const isDragging = useSelector((store) => store.utils.isDragged);
  const selectedIngredientsList = useSelector(
    (store) => store.selectedIngredients.collection,
  );
  const bunData = useSelector((store) => store.selectedIngredients.bunData);
  const totalPrice = useSelector(
    (store) => store.selectedIngredients.totalPrice,
  );

  useEffect(() => {
    if (bunData || selectedIngredientsList.length > 0) {
      setCanOrder(true);
    } else {
      setCanOrder(false);
    }
  }, [selectedIngredientsList, bunData]);
  const [, drop] = useDrop({
    accept: "test",
    collect: (monitor) => ({}),
    drop(item) {
      dispatch({
        type: item.actionType,
        data: item.elementData,
      });
    },
  });

  function createOrder() {
    const orderDetails = [
      bunData._id,
      ...selectedIngredientsList.map((x) => x.data._id),
      bunData._id,
    ];
    dispatch(getData(orderDetails, openModal));
  }

  function openModal(data) {
    dispatch({
      type: SET_MODAL_CONTENT,
      popupType: ORDER_MODAL_TYPE,
      data: data,
      Title: "",
    });
    dispatch({
      type: SET_MODAL_VIEW_STATE,
      isOpened: true,
    });
  }
  return (
    <div className={styles.constructorContainer} ref={drop}>
      {bunData && (
        <div className={styles.BunElement}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunData.name} (низ)`}
            price={bunData.price}
            thumbnail={bunData.image_mobile}
          />
        </div>
      )}
      <div
        className={`${styles.ingredientsScroll} ${
          isDragging ? styles.draggingBorder : ""
        }`}
      >
        <ScrollingContainer>
          {selectedIngredientsList.map((elementData) => (
            <BurgerElement key={uuidv4()} elementModel={elementData} />
          ))}
        </ScrollingContainer>
      </div>
      {bunData && (
        <div className={styles.BunElement}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunData.name} (низ)`}
            price={bunData.price}
            thumbnail={bunData.image_mobile}
          />
        </div>
      )}
      <div className={styles.constructorFinalBlock}>
        <div className={styles.constructorPriceBlock}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={createOrder}
          disabled={!canOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
