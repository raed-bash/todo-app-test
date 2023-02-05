export default function ErrorMessage({ errorMessage }) {
  return errorMessage ? (
    <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  ) : (
    <></>
  );
}
