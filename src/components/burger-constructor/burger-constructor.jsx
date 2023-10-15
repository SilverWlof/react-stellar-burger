import styles from "./burger-constructor.module.css";
import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollingContainer from "../scrolling-container/scrolling-container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getData } from "../../services/actions/selectedCollection";
import {
  SET_MODAL_CONTENT,
  SET_MODAL_VIEW_STATE,
  ORDER_MODAL_TYPE,
} from "../../services/actions/modal";
import { BurgerElement } from "../burger-element/burger-element";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [canOrder, setCanOrder] = React.useState(false);
  const [orderModal, setOrderModal] = React.useState({
    form: null,
    isCreated: false,
  });
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
        dispatch(item.actionType(item.elementData),)
    },
  });

    function createOrder() {
        if (localStorage.getItem("accessToken")) {
            const orderDetails = [
                bunData._id,
                ...selectedIngredientsList.map((x) => x.data._id),
                bunData._id,
            ];
            dispatch(getData(orderDetails, openModal));
        }
        else {

            navigate(`/login`);
        }
  }

  function openModal(data) {
    dispatch({
      type: SET_MODAL_CONTENT,
      popupType: ORDER_MODAL_TYPE,
      data: data,
    });
    dispatch({
      type: SET_MODAL_VIEW_STATE,
      isOpened: true,
    });
  }
  return (
    <div className={styles.constructorContainer} ref={drop}>
      {orderModal.isCreated && orderModal.form}
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
              <BurgerElement key={elementData.data.uniqueId} elementModel={elementData} />
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
