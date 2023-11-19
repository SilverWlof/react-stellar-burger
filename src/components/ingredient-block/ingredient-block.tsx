import React, { FunctionComponent, useMemo } from "react";
import styles from "./ingredient-block.module.css";
import { TIngredientElementProps } from "../ingredient-element/ingredient-element";
import { useSelector } from "../../services/storage/hooks";

type TIngredientBlockProps = {
    Title:string;
    elementType: "bun" | "sauce" | "main";
    wrappedNode: FunctionComponent<TIngredientElementProps>;
};

export const IngredientBlock: FunctionComponent<TIngredientBlockProps & { ref: React.Ref<HTMLDivElement> }> = React.forwardRef((props: TIngredientBlockProps, ref) => {
    const fullIngredientsList = useSelector(
        (store) => store.fullIngredients.collection,
    );
    const WrappedComponent = props.wrappedNode;
    const elements = useMemo(
        () =>
            fullIngredientsList.filter(
                (element) => element.type === props.elementType,
            ),
        [fullIngredientsList, props.elementType],
    );

    return (
        elements && (
            <div className={styles.ingredientBlockWrapper} ref={ref}>
                <p className="text text_type_main-medium">{props.Title}</p>
                <section className={styles.ingredientBlock}>
                    {elements.map((element) => (
                        <WrappedComponent key={element._id} elementData={element} />
                    ))}
                </section>
            </div>
        )
    );
})