import React from 'react';

import styles from "./app.module.css";
import { data } from "../../utils/data";
import { useState } from "react";

import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';

const SelectedIngridients = [{ _id: data[1]._id , pos: 2 }, { _id: data[5]._id, pos: 3 }, { _id: data[6]._id, pos: 1 },
{ _id: data[7]._id, pos: 6 }, { _id: data[4]._id, pos: 4 }, { _id: data[8]._id, pos: 5 }]
let BunId = data[0]._id;


export default function App() {

  return (
  <>
    <AppHeader/>
    <main className={styles.main}>
      <BurgerIngredients ingredients={data}/>
      <BurgerConstructor allIngridients={data} selectedIngridients={SelectedIngridients} bunId={BunId} />
    </main>
  </>
  );
}