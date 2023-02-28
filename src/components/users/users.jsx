import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LinkA from "../../addvanced/link_active";
import {
  checkUsersAsync,
  loadUsersAsync,
  loddd,
  SelectLoaded,
  SelectUsers,
  SelectWaitLoading,
} from "../../features/users_slice";
import ErrorMessage from "../../status/alert_error";
import Modal from "../../status/modal";
import "../../styles/rotate.css";
export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector(SelectUsers);
  const waitLoading = useSelector(SelectWaitLoading);
  const [errorMessage, setErrorMessage] = useState(null);
  const [UserForDelete, setUserForDelete] = useState({});
  const loaded = useSelector(SelectLoaded);
  const [rotate, setRotate] = useState(false);
  useEffect(() => {
    if (!loaded) {
      dispatch(
        loadUsersAsync(
          () => {},
          (error) => {
            setErrorMessage(error.message);
          }
        )
      );
    }
  }, [dispatch, loaded]);
  useEffect(() => {
    if (waitLoading) {
      setTimeout(() => {
        setRotate(false);
      }, 3000);
    }
  }, [rotate, waitLoading]);
  const handleCheck = (e, u) => {
    u = { ...u, status: e.target.checked ? "active" : "inactive" };
    dispatch(
      checkUsersAsync(
        u,
        () => {},
        (error) => {
          setErrorMessage(error.message);
        }
      )
    );
  };
  return (
    <>
      <h1 className="mt-5">
        Users{"    "}
        <i
          className={`bi bi-arrow-clockwise h3 text-primary ${
            waitLoading ? (rotate ? "rotate" : "") : "rotate"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setRotate(true);
            dispatch(loddd());
            dispatch(
              loadUsersAsync(
                () => {},
                (error) => {
                  setErrorMessage(error.message);
                }
              )
            );
          }}
        ></i>
      </h1>
      <Modal va={UserForDelete} setErrorMessage={setErrorMessage} />

      <ErrorMessage errorMessage={errorMessage} />

      <LinkA
        to={"/users/create-edit-user"}
        className="btn btn-primary mb-4 float-right"
      >
        <i className="bi bi-plus-lg"></i>
        {"   "} Create User {users.length}
      </LinkA>

      {waitLoading ? (
        users.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Status</th>

                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.gender}</td>
                  <td>{u.status}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={u.status === "active" ? true : false}
                      onChange={(e) => handleCheck(e, u)}
                    />
                  </td>
                  <td>
                    <Link to={`/todos/${u.id}`}>
                      <i className="bi bi-list-task h4"></i>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/users/create-edit-user/${u.id}`}>
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={""}
                      onClick={() => setUserForDelete(u)}
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
          <h2 className="text-center p-5">No Users Available</h2>
        )
      ) : (
        <h2 className="text-center p-5">Waiting for server response...</h2>
      )}
    </>
  );
}
