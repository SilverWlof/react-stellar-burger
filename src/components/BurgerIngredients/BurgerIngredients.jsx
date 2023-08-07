import styles from "./burgerIngredients.module.css";
import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ScrollingContainer from "../scroll/scroll";
import ingridientBlock from "../ingridientBlock/ingridientBlock";
import IngridientElement from "../ingridientElement/ingridientElement";
import PropTypes from "prop-types";
import ingridientPropType from "../../utils/prop-types";

function BurgerIngredients(props) {
    const { ingridients, handleOpenModal } = props;

    const [current, setCurrent] = React.useState('one');

    const BunBlock = ingridientBlock({ Title: "Булки", elementType: "bun", data: ingridients, clickHandler: handleOpenModal, wrappedNode:IngridientElement });
    const SauceBlock = ingridientBlock({ Title: "Соусы", elementType: "sauce", data: ingridients, clickHandler: handleOpenModal, wrappedNode: IngridientElement });
    const FillingBlock = ingridientBlock({ Title: "Начинки", elementType: "main", data: ingridients, clickHandler: handleOpenModal, wrappedNode: IngridientElement });


    return (
        <div className={`${styles.BurgerIngredients}`}>
            <p className="text text_type_main-large  mb-5 mt-5">Соберите бургер</p>
            <section className={styles.tabSection}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки
                </Tab>
            </section>
            <div className={styles.ingridientsScroll}>
                <ScrollingContainer>
                    {BunBlock}
                    {SauceBlock}
                    {FillingBlock }
                </ScrollingContainer>
            </div>
        </div>
    );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
    ingridients: PropTypes.arrayOf(ingridientPropType).isRequired,
    handleOpenModal: PropTypes.func.isRequired
};
