// import { Link } from "react-router-dom";
import LinkA from "../addvanced/link_active";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <LinkA className="navbar-brand" to={"/"}>
        Todo
      </LinkA>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <LinkA className="nav-item nav-link " to={"/"}>
            Home <span className="sr-only"></span>
          </LinkA>
          <LinkA className="nav-item nav-link" to={"/users"}>
            Users
          </LinkA>
          <LinkA className="nav-item nav-link" to={"/todos"}>
            Todos
          </LinkA>
        </div>
      </div>
    </nav>
  );
}
