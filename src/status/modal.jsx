import { useDispatch } from "react-redux";
import { deleteTodosAsync } from "../features/todos_slice";
import { deleteUsersAsync } from "../features/users_slice";

export default function Modal({ va, setErrorMessage }) {
  const dispatch = useDispatch();
  const checkIsUserOrTodo = () => {
    if(va.name){
      dispatch(
        deleteUsersAsync(
          va.id,
          () => {},
          (error) => {
            setErrorMessage(error.message);
          }
        )
      );

    }else{
      dispatch(
        deleteTodosAsync(
          va.id,
          () => {},
          (error) => {
            setErrorMessage(error.message);
          }
        )
      );
    }
   
  };
  return va.id ? (
    <div
      className="modal fade"
      id="Modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalLabel">
              Delete {va.name ? "User" : "Todo"}
            </h5>
          </div>
          <div className="modal-body">
            Are You sure Deleted {va.name ? "User" : "Todo"}?:
            {va.name ? va.name : va.title}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              onClick={checkIsUserOrTodo}
              data-dismiss="modal"
              className="btn btn-danger"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
