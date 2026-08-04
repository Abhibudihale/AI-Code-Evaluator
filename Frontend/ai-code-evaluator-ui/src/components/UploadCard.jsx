import React, { useState, useRef } from 'react';
import { BsCloudUpload, BsFileEarmarkImage, BsLightningChargeFill, BsTrash, BsCheckCircle } from 'react-icons/bs';
import { evaluateSolution } from '../services/evaluationService';

const PROBLEMS = [
  { id: 1, title: '1 - Two Sum' },
  { id: 167, title: '167 - Two Sum II' },
  { id: 121, title: '121 - Best Time to Buy and Sell Stock' },
  { id: 704, title: '704 - Binary Search' }
];

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const UploadCard = ({ onStartEvaluation, onSuccess, onError, isLoading }) => {
  const [problemId, setProblemId] = useState('167');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (selectedFile) => {
    setValidationError('');
    if (!selectedFile) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    // Image validation: Only allow image/jpeg, image/png, image/jpg
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setValidationError('Invalid file format. Please upload a JPG, JPEG, or PNG image.');
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setValidationError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!problemId) {
      setValidationError('Please select a LeetCode problem.');
      return;
    }
    if (!file) {
      setValidationError('Please upload a handwritten solution image before evaluating.');
      return;
    }

    setValidationError('');
    onStartEvaluation();

    try {
      const data = await evaluateSolution(Number(problemId), file);
      onSuccess(data);
    } catch (err) {
      console.error('Evaluation API Error:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to evaluate solution. Make sure backend is running on http://localhost:7071.';
      onError(errorMessage);
    }
  };

  return (
    <div className="card shadow-sm border-0 upload-card">
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          {/* 1. Problem Selection Dropdown */}
          <div className="mb-4">
            <label htmlFor="problemSelect" className="form-label fw-bold text-dark">
              1. Problem Selection
            </label>
            <select
              id="problemSelect"
              className="form-select form-select-lg shadow-sm"
              value={problemId}
              onChange={(e) => setProblemId(e.target.value)}
              disabled={isLoading}
            >
              {PROBLEMS.map((prob) => (
                <option key={prob.id} value={prob.id}>
                  {prob.title}
                </option>
              ))}
            </select>
            <div className="form-text text-muted">
              Select the LeetCode problem ID matching your code solution.
            </div>
          </div>

          {/* 2. Image Upload */}
          <div className="mb-4">
            <label className="form-label fw-bold text-dark d-block">
              2. Image Upload
            </label>

            <div
              className={`dropzone-area text-center p-4 border-2 rounded-3 ${
                isDragOver ? 'border-primary bg-primary-subtle' : 'border-secondary-subtle bg-light'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="fileUpload"
                ref={fileInputRef}
                className="d-none"
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleInputChange}
                disabled={isLoading}
              />

              {!file ? (
                <label htmlFor="fileUpload" className="w-100 cursor-pointer mb-0">
                  <BsCloudUpload className="display-4 text-primary mb-2" />
                  <h6 className="fw-bold mb-1">Click to upload or drag & drop solution image</h6>
                  <p className="text-muted small mb-0">Supported formats: JPG, JPEG, PNG</p>
                </label>
              ) : (
                <div className="selected-file-preview d-flex flex-column align-items-center">
                  {previewUrl && (
                    <div className="mb-3">
                      <img
                        src={previewUrl}
                        alt="Handwritten solution preview"
                        className="img-thumbnail rounded shadow-sm"
                        style={{ maxHeight: '180px', objectFit: 'contain' }}
                      />
                    </div>
                  )}

                  <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded border shadow-sm">
                    <BsFileEarmarkImage className="text-primary fs-5" />
                    <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: '250px' }}>
                      {file.name}
                    </span>
                    <span className="badge bg-secondary opacity-75">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                    {!isLoading && (
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={handleRemoveFile}
                        title="Remove file"
                      >
                        <BsTrash />
                      </button>
                    )}
                  </div>
                  <small className="text-success mt-2 d-flex align-items-center gap-1 fw-medium">
                    <BsCheckCircle /> Selected Image: {file.name}
                  </small>
                </div>
              )}
            </div>

            {validationError && (
              <div className="text-danger small mt-2 fw-semibold">
                {validationError}
              </div>
            )}
          </div>

          {/* 3. Evaluate Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-lg shadow-sm d-flex align-items-center justify-content-center gap-2 py-3 fw-bold"
              disabled={isLoading || !file}
            >
              <BsLightningChargeFill />
              {isLoading ? 'Evaluating Solution...' : 'Evaluate Solution'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadCard;
