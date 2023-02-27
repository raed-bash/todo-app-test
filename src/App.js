import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
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
          <Route index element={<Home />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="todos/:id" element={<Todos />}></Route>
          <Route
            path="users/create-edit-user"
            element={<CreateOrEditUser />}
          ></Route>
          <Route
            path="/users/create-edit-user/:id"
            element={<CreateOrEditUser />}
          ></Route>
          <Route
            path="create-edit-todo/:userId"
            element={<CreateOrEditTodo />}
          ></Route>
          <Route
            path="create-edit-todo/todo/:id"
            element={<CreateOrEditTodo />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
