import React from 'react';

import styles from "./BurgerIngredients.module.css";
import { data } from "../../utils/data";
import { useState } from "react";

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";



const TabList = () => {
  const [current, setCurrent] = React.useState('Булки');
  return(
    <div style={{display:"flex"}} className="mt-5">
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
      </Tab>
      <Tab value="Начинка" active={current === 'Начинка'} onClick={setCurrent}>
          Начинка
      </Tab>
    </div>
  )
}

const Ingredients = (props) => {

  const arr = data.filter((obj)=>{if(obj.type === props.selector){return obj}})
  return(
    <>
      {arr.map((obj)=>{
        return(
          <li className={styles.card}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={obj.image}/>
            <p className='text text_type_digits-default'>{obj.price} <CurrencyIcon type="primary" /></p>
            <p className='text text_type_main-default'>{obj.name}</p>
          </li>
        )
      })}
    </>
  )
}


export default class BurgerIngredients extends React.Component{
render()
{return(

  <div className={`${styles.burgerIngredients} mt-10`}>

    <h2 className="text text_type_main-large">Собери бургер</h2>
    <TabList/>
    <div className={`custom-scroll ${styles.ingredientsList}`}>

      <ul className={styles.list}>
        <li className={`text text_type_main-medium ${styles.text}`} id="Булки">Булки</li>
        <Ingredients selector="bun"/>
      </ul>

      <ul className={styles.list}>
        <li className={`text text_type_main-medium ${styles.text}`} id='Соусы'>Соусы</li>
        <Ingredients selector="sauce"/>
      </ul>

      <ul className={styles.list}>
        <li className={`text text_type_main-medium ${styles.text}`}id='Начинка'>Начинка</li>
        <Ingredients selector="main"/>
      </ul>

    </div>
      
  </div>
  );}
}