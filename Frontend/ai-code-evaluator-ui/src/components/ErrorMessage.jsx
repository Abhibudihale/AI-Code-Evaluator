import React from 'react';
import { BsExclamationTriangleFill } from 'react-icons/bs';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-3 my-3 shadow-sm border-danger border-opacity-25" role="alert">
      <BsExclamationTriangleFill className="fs-4 flex-shrink-0 text-danger" />
      <div className="flex-grow-1">
        <strong className="d-block">Evaluation Error</strong>
        <span className="small">{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      )}
    </div>
  );
};

export default ErrorMessage;
