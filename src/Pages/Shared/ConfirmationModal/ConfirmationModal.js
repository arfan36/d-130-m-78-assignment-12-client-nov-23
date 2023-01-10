import React from 'react';

const ConfirmationModal = ({ title, message, successAction, successButtonName, modalData, closeModal }) => {
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <label htmlFor="confirmation-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">
                        {title}
                    </h3>
                    <p className="font-bold">
                        {message}
                    </p>

                    <div className='modal-action'>
                        <button onClick={closeModal} className="btn btn-outline">Cancel</button>
                        <label onClick={() => successAction(modalData)} className='btn btn-primary' htmlFor='confirmation-modal'>{successButtonName}</label>
                    </div>
                </label>
            </label>
        </div>
    );
};

export default ConfirmationModal;