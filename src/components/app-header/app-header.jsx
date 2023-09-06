import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <nav className={styles.appHeaderContent}>
        <div className={styles.appHeaderItemBlock}>
          <a className={styles.appHeaderItem} href="#">
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default text_color_inactive">
              Конструктор
            </p>
          </a>
          <a className={styles.appHeaderItem} href="#">
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">
              Лента заказов
            </p>
          </a>
        </div>
        <Logo className={styles.logo} />
        <a className={styles.reversedItem} href="#">
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">
            Личный кабинет
          </p>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;
