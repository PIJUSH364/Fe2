const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}api/v1/`;
const USER = "student";

export const API_URLS = {
  USER: {
    CREATE: `${API_BASE_URL}${USER}/create_student`,
    UPDATE: `${API_BASE_URL}${USER}/update_student`,
    DELETE: `${API_BASE_URL}${USER}/delete_student`,
    GET_BY_ID: (id) => `${API_BASE_URL}${USER}/get_student/${id}`,
    GET_ALL: `${API_BASE_URL}${USER}/get_all_students`,
    SEARCH: `${API_BASE_URL}${USER}/search_student_details`,
    FILTER: `${API_BASE_URL}${USER}/filter_student_data`,
    PAGINATION_DATA: `${API_BASE_URL}${USER}/get_student_data`,
  },
};

export default API_URLS;
