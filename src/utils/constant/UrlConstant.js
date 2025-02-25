const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}api/v1/`;
const MARK = "mark";

export const API_URLS = {
  Mark: {
    CREATE: `${API_BASE_URL}${MARK}/create_mark`,
    UPDATE: `${API_BASE_URL}${MARK}/update_mark`,
    DELETE: `${API_BASE_URL}${MARK}/delete_mark`,
    GET_BY_ID: (id) => `${API_BASE_URL}${MARK}/get_mark/${id}`,
    // GET_ALL: `${API_BASE_URL}${MARK}/get_all_students`,
    // SEARCH: `${API_BASE_URL}${MARK}/search_student_details`,
    // FILTER: `${API_BASE_URL}${MARK}/filter_student_data`,
    // PAGINATION_DATA: `${API_BASE_URL}${MARK}/get_student_data`,
  },
};

export default API_URLS;
