import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"; 
import {
  checkTodosAsync,
  loadTodosAsync,
  SelectTodos,
} from "../../features/todos_slice";
import { setUsersEditAsync } from "../../features/users_slice";
import ErrorMessage from "../../status/alert_error";
import Modal from "../../status/modal";

export default function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector(SelectTodos);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [todoForDelete, setTodoForDelete] = useState({});
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      loadTodosAsync(id, () => {
        setLoading(true);
      })
    );
    dispatch(
      setUsersEditAsync(
        id,
        (data) => {
          setUser(data);
          setLoading(true);
        },
        (error) => {
          setErrorMessage(error.message);
        }
      )
    );
  }, [dispatch, id, setLoading]);

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
      <h1 className="mt-5">
        Todos User: <span className="font-weight-normal">{user.name}</span>
      </h1>
      <Modal va={todoForDelete} setErrorMessage={setErrorMessage} />
      <ErrorMessage errorMessage={errorMessage} />
      <Link
        to={`/create-edit-todo/${id}`}
        className="btn btn-primary mb-4 float-right"
      >
        <i className="bi bi-plus-lg"></i>
        {"   "} Create Todo {todos.length}
      </Link>

      {loading ? (
        todos.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {todos.map((u) => (
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
                    <Link to={`/create-edit-todo/todo/${u.id}`}>
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
        ) : (
          <h2 className="text-center p-5">No Todos Available</h2>
        )
      ) : (
        <h2 className="text-center p-5">Waiting for server response...</h2>
      )}
      <Link to={"/users"} className="btn btn-outline-primary float-right mt-4">
        Back
      </Link>
    </>
  );
}
