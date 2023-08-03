import React from 'react';
import styles from "./ingridientElement.module.css";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import ingridientPropType from "../../utils/prop-types";

function IngridientElement(props) {
    const elementData = props.elementData;
    const count = props.count;

    const image = (
        <img
            src={elementData.image}
            alt={elementData.name}
        />
    );

    return (
        <li className={styles.ingridientElement} onClick={props.onClick}>
            {image}
            <div className={styles.ingridientPriceBlock}>
                <p className="text text_type_main-medium">{props.elementData.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small" >{props.elementData.name}</p>
            {count && <Counter count={0} size="default" extraClass="m-1" />}
            
        </li>
    );
};
export default IngridientElement;


const IngridientElementPropTypes = PropTypes.shape({
    item: ingridientPropType,
    count: PropTypes.number,
});

IngridientElement.propTypes = {
    data: IngridientElementPropTypes
};