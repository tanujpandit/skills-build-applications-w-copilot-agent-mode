/**
 * API Configuration and Helper Functions
 * 
 * VITE_CODESPACE_NAME must be defined in your environment (e.g., in .env.local)
 * Example: VITE_CODESPACE_NAME=my-codespace
 * 
 * The API base URL will be:
 * https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME is not defined. ' +
      'Please define it in your .env.local file. ' +
      'Example: VITE_CODESPACE_NAME=my-codespace'
    );
    return null;
  }
  
  return `https://${codespaceName}-8000.app.github.dev/api`;
};

const handleApiResponse = (data) => {
  // Handle both paginated responses and array responses
  if (data && typeof data === 'object') {
    // Check if it's a paginated response
    if (data.results && Array.isArray(data.results)) {
      return data.results;
    }
    // If it's already an array, return it
    if (Array.isArray(data)) {
      return data;
    }
  }
  return Array.isArray(data) ? data : [data];
};

export const fetchData = async (endpoint) => {
  const baseUrl = getApiBaseUrl();
  
  if (!baseUrl) {
    throw new Error(
      'Cannot fetch data: VITE_CODESPACE_NAME is not configured. ' +
      'Please add VITE_CODESPACE_NAME to your .env.local file.'
    );
  }
  
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return handleApiResponse(data);
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

export const postData = async (endpoint, payload) => {
  const baseUrl = getApiBaseUrl();
  
  if (!baseUrl) {
    throw new Error(
      'Cannot post data: VITE_CODESPACE_NAME is not configured. ' +
      'Please add VITE_CODESPACE_NAME to your .env.local file.'
    );
  }
  
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return handleApiResponse(data);
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
};

export const updateData = async (endpoint, payload) => {
  const baseUrl = getApiBaseUrl();
  
  if (!baseUrl) {
    throw new Error(
      'Cannot update data: VITE_CODESPACE_NAME is not configured. ' +
      'Please add VITE_CODESPACE_NAME to your .env.local file.'
    );
  }
  
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return handleApiResponse(data);
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  const baseUrl = getApiBaseUrl();
  
  if (!baseUrl) {
    throw new Error(
      'Cannot delete data: VITE_CODESPACE_NAME is not configured. ' +
      'Please add VITE_CODESPACE_NAME to your .env.local file.'
    );
  }
  
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return handleApiResponse(data);
  } catch (error) {
    console.error(`Error deleting ${endpoint}:`, error);
    throw error;
  }
};
