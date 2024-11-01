export async function useFetch(endpoint: string, options = {}) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const response = await fetch(`${baseURL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options
  });

  // Check if the response is successful
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'An error occurred');
  }

  // Return the JSON data
  return await response.json();
}
