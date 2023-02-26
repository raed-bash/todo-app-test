import { useLocation, Link } from "react-router-dom";
export default function LinkA(props) {
  const location = useLocation();
  const active = props.to === location.pathname ? " active" : "";
  return (
    <>
      <Link
        className={props.className + active}
        children={props.children}
        to={props.to}
      ></Link>
    </>
  );
}
