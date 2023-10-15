import styles from "./register.module.css";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../../services/actions/auth.js";

export function RegisterPage() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const onPassChange = (e) => {
    setValue({ ...value, password: e.target.value });
  };
  const onMailChange = (e) => {
    setValue({ ...value, email: e.target.value });
  };
  const onNameChange = (e) => {
    setValue({ ...value, name: e.target.value });
  };
  const handleRegisterButtonClick = (evt) => {
    evt.preventDefault();
    dispatch(registerUser(value.email, value.password, value.name));
  };

  return (
    <div className={styles.register}>
      <main className={styles.main}>
        <form
          className={styles.registerForm}
          onSubmit={handleRegisterButtonClick}
        >
          <p
            className={
              "text text_type_main-medium " +
              styles.emptyPadding +
              " " +
              styles.emptyMargin
            }
          >
            Регистрация
          </p>
          <Input
            placeholder="Имя"
            value={value.name}
            onChange={onNameChange}
            extraClass="pt-6"
          />
          <EmailInput
            placeholder="E-mail"
            value={value.email}
            onChange={onMailChange}
            extraClass="pt-6"
          />
          <PasswordInput
            name="Пароль"
            value={value.password}
            onChange={onPassChange}
            extraClass="pt-6"
          />
          <Button htmlType="submit" extraClass="mt-6">
            Зарегистрироваться
          </Button>
          <p
            className={
              "text text_type_main-default text_color_inactive pt-20 " +
              styles.emptyMargin
            }
          >
            Уже зарегестрированы?
            <Link className={styles.clearLink} to="/login">
              Войти
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
