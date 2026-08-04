import React from 'react';
import { BsCpu } from 'react-icons/bs';

const LoadingSpinner = ({ text = 'Analyzing your solution using AI...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-4 py-4 text-center">
      <div className="position-relative mb-3">
        <div className="spinner-border text-primary" style={{ width: '3.5rem', height: '3.5rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <BsCpu className="position-absolute top-50 start-50 translate-middle text-primary fs-4 animated-pulse" />
      </div>
      <h6 className="fw-semibold text-primary mb-1">{text}</h6>
      <small className="text-muted">Please wait while Gemini Vision inspects your code logic.</small>
    </div>
  );
};

export default LoadingSpinner;
