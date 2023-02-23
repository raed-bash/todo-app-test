import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import CreateOrEditTodo from "./components/todos/create_edit_todo";
import Todos from "./components/todos/todos";
import CreateOrEditUser from "./components/users/create_edit_user";
import Users from "./components/users/users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="users" element={<Users />}></Route>
          <Route path="todos" element={<Todos />}></Route>
          <Route path="create-edit-user" element={<CreateOrEditUser />}></Route>
          <Route
            path="create-edit-user/:id"
            element={<CreateOrEditUser />}
          ></Route>
          <Route path="create-edit-todo" element={<CreateOrEditTodo />}></Route>
          <Route
            path="create-edit-todo/:id"
            element={<CreateOrEditTodo />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
