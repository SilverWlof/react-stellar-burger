import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/auth.js";

export function LoginPage() {
  const [value, setValue] = React.useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const onPassChange = (e) => {
    setValue({ ...value, password: e.target.value });
  };
  const onLogChange = (e) => {
    setValue({ ...value, email: e.target.value });
  };

  const handleLoginButtonClick = (evt) => {
    evt.preventDefault();
    dispatch(login(value.email, value.password));
  };

  return (
    <div className={styles.login}>
      <main className={styles.main}>
        <form className={styles.loginForm} onSubmit={handleLoginButtonClick}>
          <p
            className={
              "text text_type_main-medium " +
              styles.emptyPadding +
              " " +
              styles.emptyMargin
            }
          >
            Вход
          </p>
          <EmailInput
            placeholder="Email"
            value={value.email}
            onChange={onLogChange}
            extraClass="pt-6"
          />
          <PasswordInput
            name="Пароль"
            value={value.password}
            onChange={onPassChange}
            extraClass="pt-6"
          />
          <Button extraClass={"mt-6 "} htmlType="submit">
            Войти
          </Button>
          <p
            className={
              "text text_type_main-default text_color_inactive pt-20 " +
              styles.emptyMargin
            }
          >
            Вы — новый пользователь?
            <Link className={styles.clearLink} to="/register">
              Зарегистрироваться
            </Link>
          </p>
          <p
            className={
              "text text_type_main-default text_color_inactive pt-4 " +
              styles.emptyMargin
            }
          >
            Забыли пароль?
            <Link className={styles.clearLink} to="/forgot-password">
              Восстановить пароль
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
