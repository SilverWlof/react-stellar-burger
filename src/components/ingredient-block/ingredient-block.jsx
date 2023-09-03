import React, { useMemo } from "react";
import styles from "./ingredient-block.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const IngredientBlock = React.forwardRef((props, ref) => {
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
});

export default IngredientBlock;

IngredientBlock.propTypes = {
  elementType: PropTypes.string,
  wrappedNode: PropTypes.func,
};
