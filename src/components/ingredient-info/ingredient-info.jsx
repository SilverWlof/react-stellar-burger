import styles from "./ingredient-info.module.css";
import React from "react";
import ingredientPropType from "../../utils/prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import loadingImg from "../../images/loading.gif";

const IngredientDetails = (props) => {
  const { id } = useParams();
  const selectedIngredient = useSelector(
    (store) => store.fullIngredients.collection,
  ).filter((element) => element._id === id)[0];

  const isLoaded = useSelector((store) => store.fullIngredients.isLoaded);
  return (
    <>
      {isLoaded && (
        <section className={styles.InfoBlock}>
          <img
            className={styles.InfoImage}
            src={selectedIngredient.image_large}
            alt={selectedIngredient.name}
          />
          <section className={styles.InfoDetails}>
            <p className="text text_type_main-medium">
              {selectedIngredient.name}
            </p>
            <div className={styles.InfoDetailsGrid}>
              <div className={styles.DataItem}>
                <p className="text text_color_inactive text_type_main-small">
                  Калории,ккал
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {selectedIngredient.calories}
                </p>
              </div>
              <div className={styles.DataItem}>
                <p className="text text_color_inactive text_type_main-small">
                  Белки, г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {selectedIngredient.proteins}
                </p>
              </div>
              <div className={styles.DataItem}>
                <p className="text text_color_inactive text_type_main-small">
                  Жиры, г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {selectedIngredient.fat}
                </p>
              </div>
              <div className={styles.DataItem}>
                <p className="text text_color_inactive text_type_main-small">
                  Углеводы, г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {selectedIngredient.carbohydrates}
                </p>
              </div>
            </div>
          </section>
        </section>
      )}
      {!isLoaded && (
        <img src={loadingImg} alt="Order Done" className={styles.preloadImg} />
      )}
    </>
  );
};
export default IngredientDetails;

IngredientDetails.propTypes = {
  ingredientData: ingredientPropType,
};
