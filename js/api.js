// api.js - Shared API configuration and functions

// Configuration
const getApiBaseUrl = () => {
    // In production (Vercel), use the environment variable
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return window.BACKEND_URL || 'https://your-backend.onrender.com';
    }
    // In development, use localhost
    return 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

// API Functions
const api = {
    async getInfo() {
        const response = await fetch(`${API_BASE_URL}/api/info/`);
        if (!response.ok) throw new Error('Failed to fetch info');
        return response.json();
    },
    
    async analyze(formData) {
        const response = await fetch(`${API_BASE_URL}/api/analyze/`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Analysis failed');
        }
        return response.json();
    },
    
    async getHistory() {
        const response = await fetch(`${API_BASE_URL}/api/history/`);
        if (!response.ok) throw new Error('Failed to fetch history');
        return response.json();
    },
    
    async getAnalysis(id) {
        const response = await fetch(`${API_BASE_URL}/api/analysis/${id}/`);
        if (!response.ok) throw new Error('Analysis not found');
        return response.json();
    },
    
    async deleteAnalysis(id) {
        const response = await fetch(`${API_BASE_URL}/api/delete/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) throw new Error('Failed to delete analysis');
        return response.json();
    }
};

// Export for use in other files
window.api = api;
window.API_BASE_URL = API_BASE_URL;