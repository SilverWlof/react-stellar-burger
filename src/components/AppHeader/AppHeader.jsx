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


render(){
  return (
    <header className={`${styles.header} mr-10 ml-10 mt-10`}>
      <nav className={`${styles.headerLink} pt-4 pb-4`}>
        <div style={{display:'flex', flexDirection:'row', justifySelf:"start"}} className="pt-4 pb-4"> 
          <a className={`${styles.links} mr-2`}>
            <BurgerIcon type="primary"/>
            <p className="ml-2 text text_type_main-default">Конструктор</p>
          </a>
          <a className={styles.links}>
            <ListIcon type="secondary" />
            <p className="ml-2 text text_type_main-default text_color_inactive">Лента заказов</p>
          </a>
        </div>

        <Logo/> 

        <div style={{display:'flex', flexDirection:'row', justifySelf:"end"}} className="pt-4 pb-4">
          <a className={styles.links}>
            <ProfileIcon type="secondary"/>
            <p className="ml-2 text text_type_main-default text_color_inactive">Личный кабинет</p>
          </a>
        </div>
      </nav>
    </header>
  );
}
}

