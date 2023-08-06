import styles from "./modal.module.css";
import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

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

export default ModalBody;

ModalBody.propTypes = {
    title: PropTypes.string.isRequired,
    closeClickHandler: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}