import styles from "./BurgerConstructor.module.css";
import React from "react";
import { Button, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import ScrollingContainer from "../scroll/scroll";
import PropTypes from "prop-types";
import ingridientPropType from "../../utils/prop-types";
import OrderInfo from "../orderInfo/orderInfo";

const BurgerConstructor = (props) => {
    const { fullIngridients, selectedIngridients, bunId, handleOpenModal, createOrderFunc } = props
    let topBun;
    let botBun;
    let price = 0;
    selectedIngridients.sort((a, b) => a.pos > b.pos ? 1 : -1);
    const bunData = fullIngridients.filter((element) => element._id === bunId)[0];

    if (bunData) {
        price += bunData.price * 2;
        topBun = <div className={styles.BunElement}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bunData.name} (низ)`}
                price={bunData.price}
                thumbnail={bunData.image_mobile}
            /></div>;
        botBun = <div className={styles.BunElement}>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bunData.name} (низ)`}
                price={bunData.price}
                thumbnail={bunData.image_mobile}
            />
        </div>;
    }



    const selectedData = [];
    for (let i = 0; i < selectedIngridients.length; i++) {
        var foundElement = fullIngridients.filter((element) => element._id === selectedIngridients[i]._id)[0];
        if (foundElement) {
            price += foundElement.price
            selectedData.push({ pos: i, data: foundElement });
        }
    }
    return (
        <div className={styles.constructorContainer}>
            {topBun}
            <div className={styles.ingridientsScroll}>
                <ScrollingContainer>
                    {selectedData.map((elementData) => (<BurgerElement key={elementData.pos} data={elementData.data} />))}
                </ScrollingContainer>
            </div>
            {botBun}
            <div className={styles.constructorFinalBlock}>
                <div className={styles.constructorPriceBlock}>
                    <p className="text text_type_digits-medium">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large"
                    onClick={() => {
                        createOrderFunc().then((res) => {
                            handleOpenModal(< OrderInfo id={res} />, "");
                        })
                    }}>
                Оформить заказ
                </Button>
            </div>
        </div>
    );
}

const BurgerElement = (props) => {
    return (
        <div className={styles.BurgerElement}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={props.data.name}
                price={props.data.price}
                thumbnail={props.data.image_mobile}
            />
        </div>
    );
}

export default BurgerConstructor;

const IngridientElementPropTypes = PropTypes.shape({
    item: ingridientPropType,
    count: PropTypes.number.isRequired,
}).isRequired;

BurgerConstructor.propTypes = {
    handleOpenModal: PropTypes.func.isRequired,
    createOrderFunc: PropTypes.func.isRequired
};
<<<<<<< HEAD
=======
BurgerElement.propTypes = {
    data: IngridientElementPropTypes
};
>>>>>>> e8ee26bc69291762b7f777b36dd9678ee9afb8b3
