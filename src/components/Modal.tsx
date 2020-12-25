import React, { FC } from "react";
import "../styles/components/modal.css";

interface TModalProps {
    active: number|string;
    onClose: any;
    id: number|string;
}

const Modal: FC<TModalProps> = ({ children, active = false, onClose, id }) => {
    if (id !== active) return null;

    return (
        <div className="modal-container">
            <div className="modal-content">
                <div className="modal-close" onClick={onClose}>
                    &times;
                </div>
                <div className="modal-contentContainer">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
