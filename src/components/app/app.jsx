import React from 'react';

import styles from "./app.module.css";
import { data } from "../../utils/data";
import { useState } from "react";

import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';


export default function App() {


  return (
  <>
    <AppHeader/>
    <div style={{display:"flex", flexDirection:"row"}}>
      <BurgerIngredients/>
    </div>
  </>
  );
}