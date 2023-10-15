import styles from "./profile_order__id.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { webApi } from "../../../../utils/Api/AppApi.js";
import React, { useEffect, useState } from "react";
import loadingImg from "../../../../images/loading.gif";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollingContainer from "../../../../components/scrolling-container/scrolling-container";
import { OrderFullIngridient } from "../../../../components/order-full-ingridient/order-full-ingridient";

export const ProfileOrdersIdControl = (props) => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState();
  const [orderState, setOrderState] = useState();
  const [orderDate, setOrderDate] = useState();
  const [price, setPrice] = useState();
  const [ingredientsList, setIngredientsList] = useState();

  const fullIngredientList = useSelector(
    (store) => store.fullIngredients.collection,
  );

  useEffect(() => {
      webApi.getOrderById(id).then((res) => setOrderData(res.orders[0]))
          .catch((e) => {
              setOrderData(null);
              console.error("Failed to get order.");
              console.error(e);
          });
  }, [id]);
  useEffect(() => {
    if (orderData) {
      if (orderData.status) {
        setOrderState("Выполнен");
      } else {
        setOrderState("В процессе");
      }
      const cretionDate = new Date(orderData.createdAt);
      const dateParceOptions = {
        hourCycle: "h24",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      };
      setOrderDate(cretionDate.toLocaleDateString("ru-RU", dateParceOptions));
      if (fullIngredientList) {
        CreateIngridientsControls(orderData.ingredients);
      }
    }
  }, [orderData, fullIngredientList]);

  function CreateIngridientsControls(orderElements) {
    const dictionary = new Map();
    let result = [];
    let resultingPrice = 0;
    for (let i = 0; i < orderElements.length; i++) {
      if (dictionary.has(orderElements[i])) {
        const newAmount = dictionary.get(orderElements[i]).count + 1;
        dictionary.set(orderElements[i], {
          ...dictionary.get(orderElements[i]),
          count: newAmount,
        });
      } else {
        const ingrData = fullIngredientList.filter(
          (element) => element._id === orderElements[i],
        )[0];
        if (ingrData) {
          const newPrice = ingrData.price;
          const newTitle = ingrData.name;
          const newImg = ingrData.image_mobile;
            const newCount = 1;
            const newId = orderElements[i];
          dictionary.set(orderElements[i], {
            price: newPrice,
            title: newTitle,
            img: newImg,
              count: newCount,
            id:newId
          });
          resultingPrice += newPrice;
        }
      }
    }
    setPrice(resultingPrice);
    for (let data of dictionary.values()) {
      result = [
        ...result,
        <OrderFullIngridient
            key={data.id}
          imgSrc={data.img}
          title={data.title}
          priceText={`${data.count}x${data.price}`}
        />,
      ];
    }
    setIngredientsList(result);
  }

  return (
    <>
      {!orderData && (
        <img src={loadingImg} alt="Order Done" className={styles.preloadImg} />
      )}
      {orderData && (
        <section className={styles.profileOrderId}>
          <div className={`${styles.center} ${styles.bm10}`}>
            <p
              className={`text text_type_digits-default`}
            >{`#${orderData.number}`}</p>
          </div>
          <p className={`text text_type_main-medium ${styles.bm3}`}>
            {orderData.name}
          </p>
          <p
            className={`text text_type_main-default ${styles.cyanTextColor} ${styles.bm15}`}
          >
            {orderState}
          </p>
          <p className={`text text_type_main-medium ${styles.bm6}`}>Состав:</p>
          <div className={`${styles.scrollBlock} ${styles.bm10}`}>
            <ScrollingContainer className="gap4">
              {ingredientsList}
            </ScrollingContainer>
          </div>
          <div className={styles.BotData}>
            <p className="text text_type_main-default text_color_inactive">
              {orderDate}
            </p>
            <div className={styles.PriceBlock}>
              <p className="text text_type_digits-default">{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
