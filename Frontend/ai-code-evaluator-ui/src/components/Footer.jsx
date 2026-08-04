import React from 'react';
import { BsCodeSlash } from 'react-icons/bs';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-3 bg-dark text-white border-top border-secondary border-opacity-25">
      <div className="container text-center">
        <p className="mb-1 text-muted small d-flex align-items-center justify-content-center gap-2">
          <BsCodeSlash className="text-primary" />
          <span>AI Code Evaluator &copy; {currentYear}. All Rights Reserved.</span>
        </p>
        <span className="text-secondary opacity-75 extra-small">
          Powered by Gemini Vision API for Logic Verification
        </span>
      </div>
    </footer>
  );
};

export default Footer;
