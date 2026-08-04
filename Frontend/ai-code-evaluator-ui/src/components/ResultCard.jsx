import React from 'react';
import { BsCheckCircleFill, BsXCircleFill, BsTrophyFill, BsChatTextFill } from 'react-icons/bs';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { pass, score, feedback } = result;
  const isPass = Boolean(pass);

  return (
    <div className={`card border-0 shadow-lg mt-4 result-card ${isPass ? 'border-start border-success border-5' : 'border-start border-danger border-5'}`}>
      <div className="card-body p-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3 border-bottom pb-3">
          <div className="d-flex align-items-center gap-2">
            {isPass ? (
              <span className="badge bg-success bg-gradient px-3 py-2 fs-6 d-flex align-items-center gap-1 rounded-pill shadow-sm">
                <BsCheckCircleFill /> PASS
              </span>
            ) : (
              <span className="badge bg-danger bg-gradient px-3 py-2 fs-6 d-flex align-items-center gap-1 rounded-pill shadow-sm">
                <BsXCircleFill /> FAIL
              </span>
            )}
            <h5 className="mb-0 ms-2 fw-bold text-dark">Evaluation Result</h5>
          </div>

          <div className="d-flex align-items-center gap-2 bg-light px-3 py-2 rounded-3 border">
            <BsTrophyFill className={isPass ? 'text-warning fs-5' : 'text-secondary fs-5'} />
            <span className="fw-bold text-muted me-1">Score:</span>
            <span className={`fw-bolder fs-5 ${isPass ? 'text-success' : 'text-danger'}`}>
              {score} <span className="fs-6 text-muted">/ 10</span>
            </span>
          </div>
        </div>

        <div className="feedback-section mt-3">
          <div className="d-flex align-items-center gap-2 mb-2 text-primary fw-semibold">
            <BsChatTextFill />
            <span>AI Feedback & Logic Analysis</span>
          </div>
          <div className={`p-3 rounded-3 ${isPass ? 'bg-success-subtle text-success-emphasis border border-success-subtle' : 'bg-danger-subtle text-danger-emphasis border border-danger-subtle'}`}>
            <p className="mb-0 feedback-text" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
              {feedback || 'No detailed feedback provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
