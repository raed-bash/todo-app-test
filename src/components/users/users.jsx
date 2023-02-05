import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadUsersAsync, SelectUsers } from "../../features/users_slice";
import ErrorMessage from "../../status/alert_error";
import Modal from "../../status/modal";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector(SelectUsers);
  const [errorMessage, setErrorMessage] = useState(null);
  const [UserForDelete, setUserForDelete] = useState({});

  useEffect(() => {
    dispatch(
      loadUsersAsync(
        () => {},
        (error) => {
          setErrorMessage(error.message);
        }
      )
    );
  }, [dispatch]);
  return (
    <>
      <h1 className="mt-5">Users</h1>
      <Modal va={UserForDelete} setErrorMessage={setErrorMessage} />
      <ErrorMessage errorMessage={errorMessage} />
      <Link
        to={"/create-edit-user"}
        className="btn btn-primary mb-4 float-right"
      >
        <i className="bi bi-plus-lg"></i>
        {"   "} Create User
      </Link>
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
          {users &&
            users.length > 0 &&
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.gender}</td>
                <td>{u.status}</td>

                <td>
                  <Link to={`/create-edit-user/${u.id}`}>
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
    </>
  );
}
