import styles from "./modal.module.css";
import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import ModalOverlay from "../modalOverlay/modalOverlay";

const modalRoot = document.getElementById("modals");
const ModalBody = (props) => {

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

        <div className={styles.ModalBody} ref={containerRef}>
            <ModalOverlay title={title} closeClickHandler={Close}>
                {children}
            </ModalOverlay>
        </div>, modalRoot
    ))
}

ModalBody.propTypes = {
  title: PropTypes.string.isRequired,
  closeFunc: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default ModalBody;