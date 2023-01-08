import React from 'react';

const ConfirmationModal = ({ modalData, closeModal, successAction }) => {
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <label htmlFor="confirmation-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Are you sure, you want to delete <span className='underline text-2xl text-error'>{modalData.phoneName}</span> ? <br /> It can't be undone.</h3>
                    <div className='modal-action'>
                        <button onClick={closeModal} className="btn btn-outline">Cancel</button>
                        <label onClick={() => successAction(modalData)} className='btn btn-primary' htmlFor='confirmation-modal'>Delete</label>
                    </div>
                </label>
            </label>
        </div>
    );
};

export default ConfirmationModal;