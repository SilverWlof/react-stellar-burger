import React from 'react';

import styles from "./BurgerConstructor.module.css";
import { useState } from "react";

import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'


const BurgerElement = (props) => {
  return(
    <div className={styles.burgerIngredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.data.name}
        price={props.data.price}
        thumbnail={props.data.image_mobile}
      />
    </div>
)}


export default function BurgerConstructor ({allIngridients, selectedIngridients, bunId}){
  let topBun;
  let botBun;
  let price = 0;

  selectedIngridients.sort((a, b) => a.pos > b.pos ? 1 : -1);

  const bunData = allIngridients.filter((element) => element._id === bunId)[0];

  if (bunData) {
    price += bunData.price * 2;
    topBun =
       <div className={styles.burgerIngredient}>
        <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunData.name} (низ)`}
            price={bunData.price}
            thumbnail={bunData.image_mobile}
        />
      </div>;
    botBun = 
      <div className={styles.burgerIngredient}>
        <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunData.name} (низ)`}
            price={bunData.price}
            thumbnail={bunData.image_mobile}
        />
      </div>;
  }
  const selectedData = [];

  

  for (let i = 0; i < selectedIngridients.length; i++) {
      let foundElement = allIngridients.filter((element) => element._id === selectedIngridients[i]._id)[0];
      if (foundElement) {
          price += foundElement.price
          selectedData.push({ pos: i, data: foundElement });
      }
  }
  console.log(selectedData)

    return(
      <section className={`${styles.order} pt-25 pl-4 pb-5`}>
        <section className={`${styles.ingredientsList} custom-scroll pr-2`}> 
          {topBun}
          <div className={`${styles.ingredients}`}>
            {selectedData.map((element)=>(<BurgerElement key={element.pos} data={element.data}/>))}
          </div>
          {botBun}
        </section>
        <section className={`${styles.price} pr-2 mt-5`}>
          <p className="text text_type_digits-medium mr-10">{price}
          <CurrencyIcon type="primary" /></p>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </section>
      </section>
      
    )
}
