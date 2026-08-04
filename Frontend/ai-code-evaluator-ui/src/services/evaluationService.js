import axios from 'axios';

const API_BASE_URL = 'http://localhost:7071';

/**
 * Sends handwritten solution image and problemId to Spring Boot backend API.
 * Endpoint: POST http://localhost:7071/ocr/evaluate?problemId={problemId}
 * 
 * @param {number|string} problemId - LeetCode problem ID
 * @param {File} file - Selected handwritten code image file
 * @returns {Promise<{pass: boolean, score: number, feedback: string}>}
 */
export const evaluateSolution = async (problemId, file) => {
  console.log(`[evaluationService] Dispatching POST request to ${API_BASE_URL}/ocr/evaluate`, {
    problemId,
    fileName: file?.name,
    fileSize: file?.size,
    fileType: file?.type,
  });

  const formData = new FormData();
  formData.append('file', file);
  formData.append('problemId', problemId);

  // IMPORTANT: Do NOT manually set 'Content-Type': 'multipart/form-data' header.
  // Axios automatically sets the header with proper boundary when given FormData.
  const response = await axios.post(`${API_BASE_URL}/ocr/evaluate`, formData, {
    params: {
      problemId: problemId,
    },
  });

  console.log('[evaluationService] API call succeeded! Response payload:', response.data);
  return response.data;
};

export default {
  evaluateSolution,
};
