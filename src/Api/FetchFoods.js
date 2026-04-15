const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://food-pulse-server.vercel.app';

export const FetchFoods = (accessToken) => {
    return fetch(`${API_BASE_URL}/foods/my-foods`, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
    .then(res => res.json())
}

export default FetchFoods;