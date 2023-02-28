import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const todoServer = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer afce9696716f9f6b7cbf714aca5f76038ac968c5a6a463157e58f225ffe468a9",
  },
});
export const todosSlice = createSlice({
  name: "todos",
  initialState: { value: [] },
  reducers: {
    loadTodos: (state, action) => {
      state.value = action.payload;
    },
    createTodos: (state, action) => {
      state.value.push(action.payload);
    },
    deleteTodos: (state, action) => {
      state.value = state.value.filter((n) => n.id !== action.payload);
    },
    editTodos: (state, action) => {
      const todoIndex = state.value.findIndex(
        (n) => n.id === action.payload.id
      );
      state.value[todoIndex] = action.payload;
    },
    checkTodo: (state, action) => {
      const todoIndex = state.value.findIndex(
        (n) => n.id === action.payload.id
      );
      state.value[todoIndex] = action.payload;
    }, 
  },
});
export const loadTodosAsync = (userId, success, fail) => (dispatch) => {
  todoServer
    .get(`/users/${userId}/todos`)
    .then((res) => {
      dispatch(loadTodos(res.data));
      success();
    })
    .catch((error) => {
      fail(error);
    });
};
export const deleteTodosAsync = (todoId, success, fail) => (dispatch) => {
  todoServer
    .delete(`/todos/${todoId}`)
    .then((res) => {
      dispatch(deleteTodos(todoId));
      success();
    })
    .catch((error) => {
      fail(error);
    });
};
export const setTodosEditAsync = (todoId, success, fail) => (dispatch) => {
  todoServer
    .get(`/todos/${todoId}`)
    .then((res) => {
      res.data = { ...res.data, due_on: res.data.due_on.slice(0, 10) };
      success(res.data);
    })
    .catch((error) => {
      fail(error);
    });
};
export const createTodosAsync = (todo, success, fail) => (dispatch) => {
  todoServer
    .post(`/todos`, todo)
    .then((res) => {
      dispatch(createTodos(res.data));
      success();
    })
    .catch((error) => {
      fail(error);
    });
};
export const editTodosAsync = (todo, success, fail) => (dispatch) => {
  todoServer
    .patch(`/todos/${todo.id}`, todo)
    .then(() => {
      success();
      dispatch(editTodos());
    })
    .catch((error) => fail(error));
};
export const checkTodosAsync = (todo, success, fail) => (dispatch) => {
  todoServer
    .patch(`/todos/${todo.id}`, todo)
    .then((res) => {
      dispatch(checkTodo(todo));
    })
    .catch((error) => {
      fail(error);
    });
};
const { loadTodos, deleteTodos, createTodos, editTodos, checkTodo } =
  todosSlice.actions;
export const SelectTodos = (state) => state.todos.value;

export default todosSlice.reducer;
