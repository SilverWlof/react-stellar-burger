import styles from "./burger-constructor.module.css";
import React, { FunctionComponent, useEffect } from "react";
import { useDrop } from "react-dnd";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ScrollingContainer } from "../scrolling-container/scrolling-container";
import { useNavigate } from "react-router-dom";
import { getData, updatePositionAction } from "../../services/actions/selectedCollection";
import {
    ORDER_MODAL_TYPE,
  setModalContentAction,
  setModalViewStateAction,
} from "../../services/actions/modal";
import { BurgerElement } from "../burger-element/burger-element";
import { useDispatch, useSelector } from "../../services/storage/hooks";
import { TDragItemType, TSelectedIngredientPropType } from "../../services/custom-types/custom-types";

export const BurgerConstructor: FunctionComponent = ({ ...props }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [canOrder, setCanOrder] = React.useState(false);
    const [orderModal, setOrderModal] = React.useState({
        form: null,
        isCreated: false,
    });
    const isDragging = useSelector((store) => store.utils.isDragged);
    const selectedIngredientsList: Array<TSelectedIngredientPropType> = useSelector(
        (store) => store.selectedIngredients.collection,
    );

    const bunData = useSelector((store) => store.selectedIngredients.bunData);
    const isRequesting = useSelector((store) => store.selectedIngredients.makingRequest);
    const totalPrice = useSelector(
        (store) => store.selectedIngredients.totalPrice,
    );

    useEffect(() => {
        if (bunData && !isRequesting /*|| selectedIngredientsList.length > 0*/) {
            setCanOrder(true);
        } else {
            setCanOrder(false);
        }

    }, [selectedIngredientsList, bunData, isRequesting]);
    const [, drop] = useDrop({
        accept: "test",
        collect: (monitor) => ({}),
        drop(item: TDragItemType) {
            dispatch(item.actionType(item.dragItem),)
            dispatch(updatePositionAction(item.dragItem),)
        },
    });

    function createOrder() {
        if (localStorage.getItem("accessToken")) {
            const bunId: string = bunData ? bunData._id : "";
            const orderDetails: Array<string> = [
                bunId,
                ...selectedIngredientsList.map((x) => x.item._id),
                bunId
            ];
            dispatch(getData(orderDetails, openModal));
        }
        else {

            navigate(`/login`);
        }
    }

    function openModal(data:number) {
        dispatch(setModalContentAction(ORDER_MODAL_TYPE, data));
        dispatch(setModalViewStateAction(true));
    }
    return (
        <div className={styles.constructorContainer} ref={drop}>
            {orderModal.isCreated && orderModal.form}
            {bunData && (
                <div className={styles.BunElement}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bunData.name} (низ)`}
                        price={bunData.price}
                        thumbnail={bunData.image_mobile}
                    />
                </div>
            )}
            <div
                className={`${styles.ingredientsScroll} ${isDragging ? styles.draggingBorder : ""
                    }`}
            >
                <ScrollingContainer>
                    {selectedIngredientsList.map((elementData) => (
                        <BurgerElement key={elementData.item.uniqueId} elementModel={elementData} />
                    ))}
                </ScrollingContainer>
            </div>
            {bunData && (
                <div className={styles.BunElement}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bunData.name} (низ)`}
                        price={bunData.price}
                        thumbnail={bunData.image_mobile}
                    />
                </div>
            )}
            <div className={styles.constructorFinalBlock}>
                <div className={styles.constructorPriceBlock}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={createOrder}
                    disabled={!canOrder}
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}