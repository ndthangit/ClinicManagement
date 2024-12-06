import React from 'react';
import './ConfirmBox.css';

const ConfirmBox = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="button-group">
                    <button className="confirm-btn" onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBox;
