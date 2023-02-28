import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userServer = axios.create({
  baseURL: "https://gorest.co.in/public/v2/users",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer afce9696716f9f6b7cbf714aca5f76038ac968c5a6a463157e58f225ffe468a9",
  },
});
export const usersSlice = createSlice({
  name: "users",
  initialState: { value: [], loaded: false, waitLoading: false },
  reducers: {
    loadUsers: (state, action) => {
      state.value = action.payload;
      state.loaded = true;
      state.waitLoading = true;
    },
    createUsers: (state, action) => {
      state.value.push(action.payload);
    },
    deleteUsers: (state, action) => {
      state.value = state.value.filter((n) => n.id !== action.payload);
    },
    editUsers: (state, action) => {
      const userIndex = state.value.findIndex(
        (n) => n.id === action.payload.id
      ); 
      state.value[userIndex] = action.payload;
    },
    checkUser: (state, action) => {
      const todoIndex = state.value.findIndex(
        (n) => n.id === action.payload.id
      );
      state.value[todoIndex] = action.payload;
    },
    falseLoaded: (state) => {
      state.loaded = false;
    },
  },
});
export const loadUsersAsync = (success, fail) => (dispatch) => {
  userServer
    .get("/")
    .then((res) => {
      dispatch(loadUsers(res.data));
      success();
    })
    .catch((error) => {
      fail(error);
    });
};
export const deleteUsersAsync = (userId, success, fail) => (dispatch) => {
  userServer
    .delete(`${userId}`)
    .then((res) => {
      dispatch(deleteUsers(userId));
      success();
    })
    .catch((error) => {
      fail(error);
    });
};
export const setUsersEditAsync = (userId, success, fail) => (dispatch) => {
  userServer
    .get(`/${userId}`)
    .then((res) => {
      success(res.data);
    })
    .catch((error) => {
      fail(error);
    });
};
export const createUserAsync = (user, success, fail) => (dispatch) => {
  userServer
    .post(`/`, user)
    .then((res) => {
      dispatch(createUsers(res.data));
      success(res.data);
    })
    .catch((error) => {
      fail(error);
    });
};
export const editUserAsync = (user, success, fail) => (dispatch) => {
  userServer
    .patch(`/${user.id}`, user)
    .then(() => {
      success();
      dispatch(editUsers(user));
    })
    .catch((error) => fail(error));
};
export const checkUsersAsync = (user, success, fail) => (dispatch) => {
  userServer
    .patch(`/${user.id}`, user)
    .then((res) => {
      dispatch(checkUser(user));
    })
    .catch((error) => {
      fail(error);
    });
};
export const loddd = () => (dispatch) => {
  dispatch(falseLoaded());
};
const {
  loadUsers,
  deleteUsers,
  createUsers,
  editUsers,
  checkUser,
  falseLoaded,
} = usersSlice.actions;
export const SelectUsers = (state) => state.users.value;
export const SelectLoaded = (state) => state.users.loaded;
export const SelectWaitLoading = (state) => state.users.waitLoading;

export default usersSlice.reducer;
