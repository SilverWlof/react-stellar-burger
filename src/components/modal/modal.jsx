import styles from "./modal.module.css";
import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modals");
const Modal = (props) => {

    const containerRef = useRef(null);

    const { title, closeFunc, children } = props;

    function Close() {
        if (closeFunc)
            closeFunc();
    }

    useEffect(() => {
        function handleOverlay(eventArgs) {
            if ((eventArgs.target === containerRef.current))
                Close();
        }

        function onKeyDown(eventArgs) {
            if (eventArgs.key === 'Escape')
                Close();
        }

        document.addEventListener('click', handleOverlay)
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('click', handleOverlay, false)
            document.removeEventListener('keydown', onKeyDown, false);
        }
    }, [closeFunc])




    return (ReactDOM.createPortal(

        <div className={styles.Modal} ref={containerRef}>
            <ModalBody title={title} closeClickHandler={Close}>
                {children}
            </ModalBody>
        </div>, modalRoot
    ))
}




const ModalBody = (props) => {

    const { title, closeClickHandler, children } = props;
    return (
        <div className={styles.ModalBody}>
            <div className={styles.ModalBodyContent}>
                <div className={styles.ModalBodyHeader}>
                    <p className="text text_type_main-large">{title}</p>
                    <button className={styles.CloseButton} type="button" onClick={closeClickHandler}>
                        <CloseIcon type="primary" />
                    </button>
                </div>

                <div className={styles.ModalBodyBody}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;

ModalBody.propTypes = {
    title: PropTypes.string,
    closeClickHandler: PropTypes.func,
    children: PropTypes.node
}
Modal.propTypes = {
    title: PropTypes.string,
    closeFunc: PropTypes.func,
    children: PropTypes.node
}