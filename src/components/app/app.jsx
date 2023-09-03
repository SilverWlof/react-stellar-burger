import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../services/actions/fullCollection";
import { SET_MODAL_VIEW_STATE } from "../../services/actions/modal";

function App() {
  const dispatch = useDispatch();

  const modalControl = useSelector(
    (store) => store.modalState.modalPopupControl,
  );
  const isModalOpened = useSelector((store) => store.modalState.isModalOpened);
  const modalTitle = useSelector((store) => store.modalState.modalPopupTitle);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  function closeModal(node) {
    dispatch({
      type: SET_MODAL_VIEW_STATE,
      isOpened: false,
    });
  }

  const handleCloseModal = (node) => closeModal(node);

  return (
    <div className={styles.app}>
      {isModalOpened && (
        <Modal title={modalTitle} closeFunc={handleCloseModal}>
          {modalControl}
        </Modal>
      )}
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.burgerBlock}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </main>
    </div>
  );
}

export default App;
