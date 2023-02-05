import { configureStore } from "@reduxjs/toolkit";
import { todosSlice } from "../features/todos_slice";
import { usersSlice } from "../features/users_slice";

export default configureStore({
  reducer: { users: usersSlice.reducer, todos: todosSlice.reducer },
});
