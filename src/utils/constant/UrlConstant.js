const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1/`;
const USER = "user";

export const API_URLS = {
  USER: {
    CREATE: `${API_BASE_URL}${USER}/create_user`,
    UPDATE: `${API_BASE_URL}${USER}/update_user`,
    DELETE: `${API_BASE_URL}${USER}/delete_user`,
    GET_BY_ID: (id) => `${API_BASE_URL}${USER}/get_user/${id}`,
    GET_ALL: `${API_BASE_URL}${USER}/get_all_users`,
    SEARCH: `${API_BASE_URL}${USER}/search_user_details`,
    FILTER: `${API_BASE_URL}${USER}/filter_user_data`,
    PAGINATION_DATA: `${API_BASE_URL}${USER}/get_user_data`,
  },
};

export default API_URLS;
