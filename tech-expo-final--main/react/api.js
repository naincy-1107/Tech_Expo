import axios from 'axios'
import { LANGUAGE_VERSIONS } from './constant';

// Use environment variable with fallback
const API = axios.create({
    baseURL: process.env.REACT_APP_PISTON_API_URL || "https://emkc.org/api/v2/piston",
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

export const executeCode = async (language, sourceCode) => {
    try {
        // Input validation
        if (!language || !sourceCode) {
            throw new Error('Language and source code are required');
        }
        
        if (!LANGUAGE_VERSIONS[language]) {
            throw new Error(`Unsupported language: ${language}`);
        }

        const response = await API.post("/execute", {
            "language": language,
            "version": LANGUAGE_VERSIONS[language],
            "files": [
                { "content": sourceCode }
            ]
        });
        
        return response.data;
    } catch (error) {
        // Enhanced error handling
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout - code execution took too long');
        }
        
        if (error.response) {
            // API returned an error response
            throw new Error(`API Error: ${error.response.data?.message || error.response.statusText}`);
        }
        
        if (error.request) {
            // Network error
            throw new Error('Network error - unable to reach code execution service');
        }
        
        // Re-throw validation errors or other errors
        throw error;
    }
};
