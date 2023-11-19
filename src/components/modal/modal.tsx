import styles from "./modal.module.css";
import React, { FunctionComponent, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modals")!;
type TModalProps = {
    title?:string|null;
    closeFunc:()=>void;
};

export const Modal: FunctionComponent<TModalProps> = ({ title, closeFunc, children, ...props }) => {
    const containerRef = useRef(null);

    function Close() {
        if (closeFunc) closeFunc();
    }

    useEffect(() => {
        function handleOverlay(eventArgs: MouseEvent) {
            if (eventArgs.target === containerRef.current) Close();
        }

        function onKeyDown(eventArgs: KeyboardEvent) {
            if (eventArgs.key === "Escape") Close();
        }

        document.addEventListener("click", handleOverlay);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("click", handleOverlay, false);
            document.removeEventListener("keydown", onKeyDown, false);
        };
    }, [closeFunc]);

    return ReactDOM.createPortal(
        <div className={styles.Modal} ref={containerRef}>
            <ModalBody title={title} closeClickHandler={Close}>
                {children}
            </ModalBody>
        </div>,
        modalRoot
    );
}

type TModalBodyProps = {
    title?:string|null;
    closeClickHandler: () => void;
};

export const ModalBody: FunctionComponent<TModalBodyProps> = ({ title, closeClickHandler, children, ...props }) => {
    return (
        <div className={styles.ModalBody}>
            <div className={styles.ModalBodyContent}>
                <div className={styles.ModalBodyHeader}>
                    <p className="text text_type_main-large">{title}</p>
                    <button
                        className={styles.CloseButton}
                        type="button"
                        onClick={closeClickHandler}
                    >
                        <CloseIcon type="primary" />
                    </button>
                </div>

                <div className={styles.ModalBodyBody}>{children}</div>
            </div>
        </div>
    );
}