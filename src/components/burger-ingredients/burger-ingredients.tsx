import styles from "./burger-ingredients.module.css";
import React, { FunctionComponent, useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ScrollingContainer } from "../scrolling-container/scrolling-container";
import { IngredientBlock } from "../ingredient-block/ingredient-block";
import { IngredientElement } from "../ingredient-element/ingredient-element";

export const BurgerIngredients: FunctionComponent = ({...props }) => {
    const [isBunBlockVisible, setBunBlockVisibility] = React.useState(true);
    const [isSouceBlockVisible, setSouceBlockVisibility] = React.useState(false);
    const [isMainBlockVisible, setMainBlockVisibility] = React.useState(false);
    const [current, setCurrent] = React.useState("one");
    const bunBlockRef = useRef<Element | null>(null) as React.MutableRefObject<HTMLDivElement>;
    const souceBlockRef = useRef<Element | null>(null) as React.MutableRefObject<HTMLDivElement>;
    const mainBlockRef = useRef<Element | null>(null) as React.MutableRefObject<HTMLDivElement>;
    const scrollRef = useRef(null);

    const intersectionOptions = {
        root: scrollRef.current,
        rootMargin: "0px",
        threshold: 0.05,
    };

    useEffect(() => {
        if (!bunBlockRef.current) return;
        const bunObserver = new IntersectionObserver(
            (evt) => handleScroll(evt, "one"),
            intersectionOptions,
        );
        const bunObserveElement = bunBlockRef.current;
        bunObserver.observe(bunObserveElement);


        return () => {

            bunObserver.unobserve(bunObserveElement);
        }
    }, [bunBlockRef, scrollRef]);

    useEffect(() => {
        if (!souceBlockRef.current) return;
        const souceObserver = new IntersectionObserver(
            (evt) => handleScroll(evt, "two"),
            intersectionOptions,
        );
        const souceObserveElement = souceBlockRef.current;
        souceObserver.observe(souceObserveElement);


        return () => {
            souceObserver.unobserve(souceObserveElement);
        }
    }, [souceBlockRef, scrollRef]);

    useEffect(() => {
        if (!mainBlockRef.current) return;
        const mainObserver = new IntersectionObserver(
            (evt) => handleScroll(evt, "three"),
            intersectionOptions,
        );
        const mainObserveElement = mainBlockRef.current;
        mainObserver.observe(mainObserveElement);

        return () => {
            mainObserver.unobserve(mainObserveElement);
        }
    }, [mainBlockRef, scrollRef]);
    function handleScroll(evt: IntersectionObserverEntry[] | { isIntersecting: boolean | ((prevState: boolean) => boolean); }[], sourceTab:string) {
        switch (sourceTab) {
            case "one":
                setBunBlockVisibility(evt[0].isIntersecting);
                break;
            case "two":
                setSouceBlockVisibility(evt[0].isIntersecting);
                break;
            case "three":
                setMainBlockVisibility(evt[0].isIntersecting);
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        if (isBunBlockVisible) {
            setCurrent("one");
        } else if (isSouceBlockVisible) {
            setCurrent("two");
        } else {
            setCurrent("three");
        }
    }, [isBunBlockVisible, isSouceBlockVisible, isMainBlockVisible]);

    const handleTabClick = (currentTab: React.SetStateAction<string>) => {
        setCurrent(currentTab);
        if (!bunBlockRef.current || !souceBlockRef.current || !mainBlockRef.current) return;
        switch (currentTab) {
            case "one":
                bunBlockRef.current.scrollIntoView({ behavior: "smooth" });
                break;
            case "two":
                souceBlockRef.current.scrollIntoView({ behavior: "smooth" });
                break;
            case "three":
                mainBlockRef.current.scrollIntoView({ behavior: "smooth" });
                break;
            default:
                break;
        }
    };

    return (
        <div className={`${styles.BurgerIngredients}`}>
            <p className="text text_type_main-large  mb-5 mt-5">Соберите бургер</p>
            <section className={styles.tabSection}>
                <Tab value="one" active={current === "one"} onClick={handleTabClick}>
                    Булки
                </Tab>
                <Tab value="two" active={current === "two"} onClick={handleTabClick}>
                    Соусы
                </Tab>
                <Tab
                    value="three"
                    active={current === "three"}
                    onClick={handleTabClick}
                >
                    Начинки
                </Tab>
            </section>
            <div className={styles.ingredientsScroll} ref={scrollRef}>
                <ScrollingContainer>
                    <IngredientBlock
                        Title="Булки"
                        elementType="bun"
                        wrappedNode={IngredientElement}
                        ref={bunBlockRef}
                    />
                    <IngredientBlock
                        Title="Соусы"
                        elementType="sauce"
                        wrappedNode={IngredientElement}
                        ref={souceBlockRef}
                    />
                    <IngredientBlock
                        Title="Начинки"
                        elementType="main"
                        wrappedNode={IngredientElement}
                        ref={mainBlockRef}
                    />
                </ScrollingContainer>
            </div>
        </div>
    );
}