import styles from "./ingridientInfo.module.css";
import React from "react";
import PropTypes from "prop-types";
import ingridientPropType from "../../utils/prop-types";


const IngridientDetails = (props) => {
    return (
        <section className={styles.InfoBlock}>
            <img className={styles.InfoImage} src={props.ingridientData.image_large} alt={props.ingridientData.name} />
            <section className={styles.InfoDetails}>
                <p className="text text_type_main-medium">{props.ingridientData.name}</p>
                <div className={styles.InfoDetailsGrid}>
                    <div className={styles.DataItem}>
                        <p className="text text_color_inactive text_type_main-small">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{props.ingridientData.calories}</p>
                    </div>
                    <div className={styles.DataItem}>
                        <p className="text text_color_inactive text_type_main-small">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{props.ingridientData.proteins}</p>
                    </div>
                    <div className={styles.DataItem}>
                        <p className="text text_color_inactive text_type_main-small">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{props.ingridientData.fat}</p>
                    </div>
                    <div className={styles.DataItem}>
                        <p className="text text_color_inactive text_type_main-small">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{props.ingridientData.carbohydrates}</p>
                    </div>
                </div>
            </section>
        </section>
    );
}
export default IngridientDetails;

IngridientDetails.propTypes = {
    ingridientData: ingridientPropType
}