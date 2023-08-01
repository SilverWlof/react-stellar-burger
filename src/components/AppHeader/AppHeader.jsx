import styles from "./AppHeader.module.css";
import { data } from "../../utils/data";
import React from 'react';
import { useState } from "react";

import {Logo} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";

 

export default class AppHeader extends React.Component {

  activeLink(){

  }

  inActiveLink(){

  }

render(){
  return (
    <header className={styles.header}>

      <div style={{display:'flex', flexDirection:'row'}}> 
        <a className={styles.links}>
          <BurgerIcon type="primary"/>
          <p className="ml-2 text text_type_main-default">Конструктор</p>
        </a>
        <a className={styles.links}>
          <ListIcon type="secondary" />
          <p className="ml-2 text text_type_main-default text_color_inactive">Лента заказов</p>
        </a>
      </div>

      <Logo/> 

      <div style={{display:'flex', flexDirection:'row'}}>
        <a className={styles.links}>
          <ProfileIcon type="secondary"/>
          <p className="ml-2 text text_type_main-default text_color_inactive">Личный кабинет</p>
        </a>
      </div>

    </header>
  );
}
}

