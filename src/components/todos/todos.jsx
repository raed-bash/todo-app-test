import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  checkTodosAsync,
  loadTodosAsync,
  SelectTodos,
} from "../../features/todos_slice";
import ErrorMessage from "../../status/alert_error";
import Modal from "../../status/modal";

export default function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector(SelectTodos);
  const [errorMessage, setErrorMessage] = useState(null);
  const [todoForDelete, setTodoForDelete] = useState({});

  useEffect(() => {
    dispatch(loadTodosAsync());
  }, [dispatch]);

  const handleCheck = (e, u) => {
    u = { ...u, status: e.target.checked ? "completed" : "pending" };
    dispatch(
      checkTodosAsync(
        u,
        () => {},
        (error) => {
          setErrorMessage(error.message);
        }
      )
    );
  };
  const CheckTodo = ({ status, title }) => {
    if (status === "pending") {
      return title;
    } else if (status === "completed") {
      return <del>{title}</del>;
    }
  };
  return (
    <>
      <h1 className="mt-5">Todos</h1>
      <Modal va={todoForDelete} setErrorMessage={setErrorMessage} />
      <ErrorMessage errorMessage={errorMessage} />
      <Link
        to={"/create-edit-todo"}
        className="btn btn-primary mb-4 float-right"
      >
        <i className="bi bi-plus-lg"></i>
        {"   "} Create Todo
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>

            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {todos &&
            todos.length > 0 &&
            todos.map((u) => (
              <tr key={u.id}>
                <td>
                  <CheckTodo title={u.title} status={u.status} />
                </td>
                <td>{u.due_on.slice(0, 10)}</td>
                <td>{u.status}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={u.status === "completed" ? true : false}
                    onChange={(e) => handleCheck(e, u)}
                  />
                </td>

                <td>
                  <Link to={`/create-edit-todo/${u.id}`}>
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                </td>
                <td>
                  <Link
                    to={""}
                    onClick={() => setTodoForDelete(u)}
                    data-toggle="modal"
                    data-target="#Modal"
                  >
                    <i className="bi bi-trash"></i>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
