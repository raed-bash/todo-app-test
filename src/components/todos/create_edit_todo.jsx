import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTodosAsync,
  editTodosAsync,
  setTodosEditAsync,
} from "../../features/todos_slice";
import ErrorMessage from "../../status/alert_error";

export default function CreateOrEditTodo() {
    
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(
        setTodosEditAsync(
          id,
          (data) => {
            setTodo(data);
          },
          (error) => {
            setErrorMessage(error.message);
          }
        )
      );
    }
  }, [id, dispatch]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value; 
    setTodo({ ...todo, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(
        editTodosAsync(
          todo,
          () => {
            navigate(-1);
          },
          (error) => {
            setErrorMessage(error.message);
          }
        )
      );
    } else {
      dispatch(
        createTodosAsync(
          todo,
          () => {
            navigate(-1);
          },
          (error) => {
            setErrorMessage(error.message);
          }
        )
      );
    }
  };
  return (
    <div className="mt-5">
      <h2 className="mb-5">{id ? "Edit Todo" : "Create Todo"}</h2>
      <ErrorMessage errorMessage={errorMessage} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="Todo">Todo Name</label>
          <input
            className="form-control "
            id="Todo"
            name="title"
            placeholder="Enter New Todo"
            value={todo.title || ""}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="due_on">Due on</label>
          <input
            type="date"
            className="form-control"
            id="due_on"
            name="due_on"
            onChange={(e) => handleChange(e)}
            value={todo.due_on || ""}
            required
          />
        </div>
        <button
          type="submit"
          className={`btn btn-${id ? "warning" : "success"}`}
        >
          {id ? "Edit" : "Create"}
        </button>
        <button
          type="button"
          className="btn btn-outline-primary ml-3"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </form>
    </div>
  );
}
