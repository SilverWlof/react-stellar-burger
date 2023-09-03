import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef } from "react";
import styles from "./burger-element.module.css";
import ingredientPropType from "../../utils/prop-types";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  REMOVE_SELECTED_ITEM,
  SET_INSERT_POSITION,
  UPDATE_POSITION,
} from "../../services/actions/selectedCollection";

export const BurgerElement = (props) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [{ isDrag }, drag] = useDrag({
    type: "test",
    item: {
      elementData: {
        oldPos: props.elementModel.pos,
        data: props.elementModel.data,
      },
      actionType: UPDATE_POSITION,
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ isHover }, drop] = useDrop({
    accept: "test",
    collect(monitor) {
      return {
        isHover: monitor.isOver(),
      };
    },
  });

  useEffect(() => {
    if (isHover) {
      dispatch({
        type: SET_INSERT_POSITION,
        newPos: props.elementModel.pos,
      });
    }
  }, [isHover]);

  drag(drop(ref));
  ///
  function RemoveHandler() {
    dispatch({
      type: REMOVE_SELECTED_ITEM,
      pos: props.elementModel.pos,
    });
  }
  return (
    !isDrag && (
      <div className={styles.BurgerElement} ref={ref}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={props.elementModel.data.name}
          price={props.elementModel.data.price}
          thumbnail={props.elementModel.data.image_mobile}
          handleClose={RemoveHandler}
        />
      </div>
    )
  );
};

BurgerElement.propTypes = {
  data: ingredientPropType,
};
