import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FunctionComponent, useEffect, useRef } from "react";
import styles from "./burger-element.module.css";
import { useDrag, useDrop } from "react-dnd";
import {
    removeSelectedItemAction,
    setInsertPositionAction,
    updatePositionAction
} from "../../services/actions/selectedCollection";
import { useDispatch } from "../../services/storage/hooks";
import { TSelectedIngredientPropType } from "../../services/custom-types/custom-types";

type TBurgerElementProps = {
    elementModel: TSelectedIngredientPropType;
} ;
export const BurgerElement: FunctionComponent<TBurgerElementProps> = ({ elementModel, ...props}) => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [{ isDrag }, drag] = useDrag({
        type: "test",
        item: {
            dragItem: {
                oldPos: elementModel.pos,
                data: elementModel.item,
            },
            actionType: updatePositionAction,
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
            dispatch(setInsertPositionAction(elementModel.pos))
        }
    }, [isHover]);

    drag(drop(ref));

    function RemoveHandler() {
        dispatch(removeSelectedItemAction(elementModel.pos))
    }
    return (
        <>
            {
                !isDrag && (
                    <div className={styles.BurgerElement} ref={ref}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={elementModel.item.name}
                            price={elementModel.item.price}
                            thumbnail={elementModel.item.image_mobile}
                            handleClose={RemoveHandler}
                        />
                    </div>
                )
            }
        </>
    );
}