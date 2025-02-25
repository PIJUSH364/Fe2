const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}api/v1/`;
const STUDENT = "student";
const MARK = "mark";

export const API_URLS = {
  STUDENT: {
    CREATE: `${API_BASE_URL}${STUDENT}/create_student`,
    UPDATE: `${API_BASE_URL}${STUDENT}/update_student`,
    DELETE: `${API_BASE_URL}${STUDENT}/delete_student`,
    GET_BY_ID: (id) => `${API_BASE_URL}${STUDENT}/get_student/${id}`,
    GET_ALL: `${API_BASE_URL}${STUDENT}/get_all_students`,
    SEARCH: `${API_BASE_URL}${STUDENT}/search_student_details`,
    FILTER: `${API_BASE_URL}${STUDENT}/filter_student_data`,
    PAGINATION_DATA: `${API_BASE_URL}${STUDENT}/get_student_data`,
  },
  Mark: {
    CREATE: `${API_BASE_URL}${MARK}/create_mark`,
    UPDATE: `${API_BASE_URL}${MARK}/update_mark`,
    DELETE: `${API_BASE_URL}${MARK}/delete_mark`,
    GET_BY_ID: (id) => `${API_BASE_URL}${MARK}/get_mark/${id}`,
  },
};

export default API_URLS;
