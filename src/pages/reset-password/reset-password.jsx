import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendChangePassword } from "../../services/actions/auth.js";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = React.useState({ pass: "", tokenFromMail: "" });
  const onPassChange = (e) => {
    setValue({ ...value, pass: e.target.value });
  };

  const onTokenFromMailChange = (e) => {
    setValue({ ...value, tokenFromMail: e.target.value });
  };

  const handleResetPasswordButtonClick = (evt) => {
    evt.preventDefault();
    dispatch(sendChangePassword(value.pass, value.tokenFromMail));
  };

  if (!localStorage.getItem("forgotPasswordRedirect")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.resetPass}>
      <main className={styles.main}>
        <form
          className={styles.resetPassForm}
          onSubmit={handleResetPasswordButtonClick}
        >
          <p
            className={
              "text text_type_main-medium " +
              styles.emptyPadding +
              " " +
              styles.emptyMargin
            }
          >
            Восстановление пароля
          </p>
          <PasswordInput
            placeholder="Введите новый пароль"
            value={value.pass}
            onChange={onPassChange}
            extraClass="pt-6"
          />
          <Input
            placeholder="Введите код из письма"
            value={value.tokenFromMail}
            onChange={onTokenFromMailChange}
            extraClass="pt-6"
          />
          <Button extraClass="mt-6" htmlType="submit">
            Сохранить
          </Button>
          <p
            className={
              "text text_type_main-default text_color_inactive pt-20 " +
              styles.emptyMargin
            }
          >
            {" "}
            Вспомнили пароль?{" "}
            <Link className={styles.clearLink} to="/list">
              Войти
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
