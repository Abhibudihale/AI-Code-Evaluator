import React, { useState } from 'react';
import UploadCard from '../components/UploadCard';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartEvaluation = () => {
    setLoading(true);
    setError('');
    setResult(null); // Clear old result when new evaluation starts
  };

  const handleSuccess = (evaluationData) => {
    setLoading(false);
    setResult(evaluationData);
  };

  const handleError = (errorMsg) => {
    setLoading(false);
    setError(errorMsg);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-7">
          {/* Header section */}
          <div className="text-center mb-4">
            <h1 className="fw-bold display-6 text-dark mb-2">
              AI Code Evaluator
            </h1>
            <p className="lead text-muted mx-auto mb-0" style={{ maxWidth: '560px' }}>
              Upload your handwritten LeetCode solution and get AI-powered logic evaluation.
            </p>
          </div>

          {/* Upload Form Card */}
          <UploadCard
            onStartEvaluation={handleStartEvaluation}
            onSuccess={handleSuccess}
            onError={handleError}
            isLoading={loading}
          />

          {/* Reusable Error Display */}
          {error && (
            <ErrorMessage
              message={error}
              onClose={() => setError('')}
            />
          )}

          {/* Reusable Loading Spinner */}
          {loading && (
            <div className="card shadow-sm border-0 mt-4">
              <div className="card-body p-3">
                <LoadingSpinner text="Analyzing your solution using AI..." />
              </div>
            </div>
          )}

          {/* Reusable Result Card */}
          {!loading && result && (
            <ResultCard result={result} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
