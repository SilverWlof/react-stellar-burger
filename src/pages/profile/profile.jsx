import styles from "./profile.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { logout } from "../../services/actions/auth.js";

export function ProfilePage() {
  const dispatch = useDispatch();

    const profilePath = "/profile";
    const profileOrdersPath = "/profile/orders";

  const location = useLocation();
  const isActive = (linkPath) => {
    if (linkPath === location.pathname) {
      return true;
    }

    return false;
  };

    let botOffer = "";
    if (location.pathname === profilePath) {
        botOffer = "изменить свои персональные данные"
    } else if (location.pathname === profileOrdersPath) {
        botOffer = "просмотреть свою историю заказов"
    }

  const handleLogoutClick = (evt) => {
    dispatch(logout());
  };
  return (
    <div className={styles.profile}>
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <div
            className={styles.fieldsColumn + " " + styles.navColumn + " mr-15"}
          >
            <div className={styles.navGrid}>
              <NavLink
                              to={profilePath }
                className={
                  "text text_type_main-medium " +
                    (!isActive(profilePath) ? styles.clearLink : styles.activeLink)
                }
              >
                Профиль
              </NavLink>
                          <NavLink
                              to={profileOrdersPath }
                className={
                  "text text_type_main-medium " +
                    (!isActive(profileOrdersPath)
                    ? styles.clearLink
                    : styles.activeLink)
                }
              >
                История заказов
              </NavLink>
              <Link
                onClick={handleLogoutClick}
                className={"text text_type_main-medium " + styles.clearLink}
              >
                Выход
              </Link>
            </div>
            <p
              className={
                "text text_type_main-default text_color_inactive mt-20 p-0 " +
                styles.emptyPadding
              }
            >
              В этом разделе вы можете
            </p>
            <p
              className={
                "text text_type_main-default text_color_inactive p-0 " +
                styles.emptyPadding
              }
            >
              {botOffer}
            </p>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
