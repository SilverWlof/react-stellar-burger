import styles from "./modalOverlay.module.css";
import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

const ModalOverlay = (props) => {
    
    const { title, closeClickHandler, children } = props;
    return (
        <div className={styles.ModalOverlay}>
            <div className={styles.ModalOverlayContent}>
                <div className={styles.ModalOverlayHeader}>
                    <p className="text text_type_main-large">{title}</p>
                    <button className={styles.CloseButton} type="button" onClick={closeClickHandler}>
                        <CloseIcon type="primary" />
                    </button>
                </div>

                <div className={styles.ModalOverlayBody}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
    title: PropTypes.string.isRequired,
    closeClickHandler: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}