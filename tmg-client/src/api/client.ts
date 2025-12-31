/**
 * API Client for TMG
 */

interface HelloResponse {
  message: string;
}

export const getHello = async (): Promise<HelloResponse> => {
  const response = await fetch("/api/hello");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
