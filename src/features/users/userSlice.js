import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  studentDetails: null,
  totalPage: 0,
  totalUserCount: 0,
  userActionFlag: false,
  allModalStatus: {
    addUserModalStatus: false,
    editUserModalStatus: false,
    addMarkModalStatus: false,
    viewUserModalStatus: false,
    deleteUserModalStatus: false,
    bulkDeleteUserModalStatus: false,
  },
  paginationMetaData: {
    currentPage: 1,
    pageSize: 5,
  },
  searchValue: "",
  userDataLoader: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userList = action.payload;
    },
    setUserDetails: (state, action) => {
      state.studentDetails = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setTotalUserCount: (state, action) => {
      state.totalUserCount = action.payload;
    },
    setUserActionFlag: (state, action) => {
      state.userActionFlag = action.payload;
    },
    setModalStatus: (state, action) => {
      Object.entries(state.allModalStatus).forEach(
        ([key, _]) => (state.allModalStatus[key] = false)
      );
      state.userActionFlag = true;
      state.allModalStatus[action.payload.key] = action.payload.value;
    },
    setPaginationMetaData: (state, action) => {
      state.paginationMetaData[action.payload.key] = action.payload.value;
    },
    ResetPaginationMetaData: (state) => {
      state.paginationMetaData = {
        currentPage: 1,
        pageSize: 5,
      };
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    setLoaderStatus: (state, action) => {
      state.loaderStatus = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    toggleUserDataLoader: (state, action) => {
      state.userDataLoader = action.payload;
    },
    resetFilterValue: (state) => {
      state.searchValue = "";
    },
  },
});

export const {
  addUser,
  setTotalPage,
  setModalStatus,
  setTotalUserCount,
  setUserActionFlag,
  setPaginationMetaData,
  setSearchValue,
  toggleUserDataLoader,
  resetFilterValue,

  ResetPaginationMetaData,
  setUserDetails,
} = userSlice.actions;
export default userSlice.reducer;
