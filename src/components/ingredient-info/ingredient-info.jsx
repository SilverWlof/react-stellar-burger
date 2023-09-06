import styles from "./ingredient-info.module.css";
import React from "react";
import ingredientPropType from "../../utils/prop-types";

const IngredientDetails = (props) => {
  return (
    <section className={styles.InfoBlock}>
      <img
        className={styles.InfoImage}
        src={props.ingredientData.image_large}
        alt={props.ingredientData.name}
      />
      <section className={styles.InfoDetails}>
        <p className="text text_type_main-medium">
          {props.ingredientData.name}
        </p>
        <div className={styles.InfoDetailsGrid}>
          <div className={styles.DataItem}>
            <p className="text text_color_inactive text_type_main-small">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.ingredientData.calories}
            </p>
          </div>
          <div className={styles.DataItem}>
            <p className="text text_color_inactive text_type_main-small">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.ingredientData.proteins}
            </p>
          </div>
          <div className={styles.DataItem}>
            <p className="text text_color_inactive text_type_main-small">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.ingredientData.fat}
            </p>
          </div>
          <div className={styles.DataItem}>
            <p className="text text_color_inactive text_type_main-small">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.ingredientData.carbohydrates}
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};
export default IngredientDetails;

IngredientDetails.propTypes = {
  ingredientData: ingredientPropType,
};
