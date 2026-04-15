// Centralized API base URL configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// API endpoint helpers
export const API_ENDPOINTS = {
  // Foods
  getMyFoods: () => `${API_BASE_URL}/foods/my-foods`,
  getFoodById: (id) => `${API_BASE_URL}/foods/${id}`,
  getExpiredFoods: () => `${API_BASE_URL}/foods/expired-foods`,
  getExpiringFoods: () => `${API_BASE_URL}/foods/expiring-soon`,
  getFoodsByCategory: (category) => `${API_BASE_URL}/foods/category?category=${category}`,
  searchFoods: (search) => `${API_BASE_URL}/foods/search?search=${search}`,
  createFood: () => `${API_BASE_URL}/foods`,
  updateFood: (id) => `${API_BASE_URL}/foods/${id}`,
  deleteFood: (id) => `${API_BASE_URL}/foods/${id}`,

  // Auth
  register: () => `${API_BASE_URL}/auth/register`,
  login: () => `${API_BASE_URL}/auth/login`,

  // Notes
  getAllNotes: () => `${API_BASE_URL}/notes`,
  getNotesByFood: (foodId) => `${API_BASE_URL}/notes/${foodId}`,
  createNote: () => `${API_BASE_URL}/notes`,
};
