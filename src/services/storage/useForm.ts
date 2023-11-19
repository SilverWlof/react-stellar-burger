import { ChangeEvent, useState } from "react";

export function useForm(inputValues = {}) {
    const [values, setValues] = useState(inputValues);
    console.log("useForm");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}