import styles from "./profile-edit-form.module.css";
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser } from "../../services/actions/auth";
import { useDispatch, useSelector } from "../../services/storage/hooks";
import { TUserDataType } from "../../services/custom-types/custom-types";

export const ProfileEditForm: FunctionComponent = ({ ...props }) => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.user);
    //const { values, handleChange, setValues } = useForm({});
    const [value, setValue] = useState({
        email: user?.email ? user.email : "",
        password: user?.password ? user.password : "",
        name: user?.name ? user.name : "",
        needSave: false,
    });

    const onPassChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = { ...value, password: e.target.value };
        setValue({ ...newValue, needSave: checkValues(newValue) });
    };
    const onMailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = { ...value, email: e.target.value };
        setValue({ ...newValue, needSave: checkValues(newValue) });
    };
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = { ...value, name: e.target.value };
        setValue({ ...newValue, needSave: checkValues(newValue) });
    };
    const checkValues = (newValue: TUserDataType & { needSave: boolean }) => {
        if (
            user?.email !== newValue.email ||
            (user.password && user.password !== newValue.password) ||
            (!user.password && newValue.password) ||
            user.name !== newValue.name
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmitButtonClick = () => {
        dispatch(
            updateUser({
                email: value.email,
                password: value.password ? value.password : "",
                name: value.name,
            }),
        );

        setValue({ ...value, needSave: false });
    };

    const handleCancelButtonClick = () => {
        const newValue = {
            email: user?.email ? user.email : "",
            password: user?.password ? user.password : "",
            name: user?.name ? user.name : "",
            needSave: false,
        };
        setValue(newValue);
    };

    return (
        <form className={styles.navGrid + " " + styles.bigGap}>
            <Input
                icon="EditIcon"
                placeholder="Имя"
                value={value.name}
                onChange={onNameChange}
            ></Input>
            <Input
                icon="EditIcon"
                placeholder="Логин"
                value={value.email}
                onChange={onMailChange}
            ></Input>
            <PasswordInput
                icon="EditIcon"
                value={value.password}
                onChange={onPassChange}
                placeholder="Пароль"
            ></PasswordInput>
            {value.needSave && (
                <div>
                    <Button
                        htmlType="button"
                        extraClass="mt-6"
                        onClick={handleSubmitButtonClick}
                    >
                        Сохранить
                    </Button>
                    <Button
                        htmlType="button"
                        extraClass="mt-6"
                        onClick={handleCancelButtonClick}
                    >
                        Отменить
                    </Button>
                </div>
            )}
        </form>
    );
}