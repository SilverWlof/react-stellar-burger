import React from 'react';

import styles from "./BurgerIngredients.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import ingridientPropType from "../../utils/prop-types";

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

const Ingredients = (props, count) => {

  const ingredients = props.ingredients.filter((obj)=>{if(obj.type === props.selector){return obj}});
  return(
    <>
      {ingredients.map((obj)=>{
        return(
          <li className={`${styles.card}`} >
            {count && <Counter count={0} size="default" extraClass="m-1" />}
            <img src={obj.image} alt={obj.name}/>
            <p className='text text_type_digits-default'>{obj.price} <CurrencyIcon type="primary" /></p>
            <p className='text text_type_main-default'>{obj.name}</p>
          </li>
        )
      })}
    </>
  )
}



export default class BurgerIngredients extends React.Component{
  constructor(props, ingredients){
    super(props)
    this.ingredients = props.ingredients
  }
render()
{

  return(

  <section className={`${styles.burgerIngredients} pt-10 mr-10`}>
    <h2 className="text text_type_main-large">Собери бургер</h2>
    <TabList/>
    <section className={`custom-scroll ${styles.ingredientsList}`}>

      <ul className={styles.list}>
        <li className={`text text_type_main-medium ${styles.text}`} id="Булки">Булки</li>
        <Ingredients selector="bun" ingredients={this.ingredients}/>
      </ul>

      <ul className={styles.list}>
        <li className={`text text_type_main-medium ${styles.text}`} id='Соусы'>Соусы</li>
        <Ingredients selector="sauce" ingredients={this.ingredients}/>
      </ul>

      <ul className={styles.list}>
        <li className={`text text_type_main-medium ${styles.text}`}id='Начинка'>Начинка</li>
        <Ingredients selector="main" ingredients={this.ingredients}/>
      </ul>

    </section>
      
  </section>
  );}
}

BurgerIngredients.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientPropType)
};