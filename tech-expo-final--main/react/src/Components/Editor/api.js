import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constant.js";

// ✅ For Vite users, use import.meta.env instead of process.env
const API_BASE_URL =
  import.meta.env.VITE_PISTON_API_URL || "https://emkc.org/api/v2/piston";

// Create axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10-second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Execute code using the Piston API
 * @param {string} language - Programming language name
 * @param {string} sourceCode - Source code to execute
 * @returns {Promise<object>} - API response
 */
export const executeCode = async (language, sourceCode) => {
  try {
    // 🧩 Input validation
    if (!language || !sourceCode) {
      throw new Error("Language and source code are required");
    }

    if (!LANGUAGE_VERSIONS[language]) {
      throw new Error(`Unsupported language: ${language}`);
    }

    // 🧠 Send execution request
    const response = await API.post("/execute", {
      language,
      version: LANGUAGE_VERSIONS[language],
      files: [{ content: sourceCode }],
    });

    return response.data;
  } catch (error) {
    // 🚨 Enhanced error handling
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout — code execution took too long");
    }

    if (error.response) {
      // API returned an error
      throw new Error(
        `API Error: ${error.response.data?.message || error.response.statusText}`
      );
    }

    if (error.request) {
      // No response received
      throw new Error("Network error — unable to reach code execution service");
    }

    // Other unexpected errors
    throw error;
  }
};

        
