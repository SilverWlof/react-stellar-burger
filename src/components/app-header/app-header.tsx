import React, { FunctionComponent } from "react";
import styles from "./app-header.module.css";
import { Link } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader: FunctionComponent = ({ ...props }) => {
    return (
        <header className={styles.appHeader}>
            <main className={styles.appHeaderMain}>
                <nav className={styles.appHeaderGrid}>
                    <div className={styles.appHeaderItemBlock}>
                        <Link className={styles.appHeaderItem} to="/">
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default text_color_inactive">
                                Конструктор
                            </p>
                        </Link>
                        <Link to="/feed" className={styles.appHeaderItem}>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive">
                                Лента заказов
                            </p>
                        </Link>
                    </div>
                    <Link to="/" className={styles.appHeaderItem}>
                        <Logo />
                    </Link>
                    <Link className={styles.reversedItem} to="/profile">
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">
                            Личный кабинет
                        </p>
                    </Link>
                </nav>
            </main>
        </header>
    );
}