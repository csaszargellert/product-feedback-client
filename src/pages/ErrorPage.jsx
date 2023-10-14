import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  const errorStatus = error?.status || 500;
  const errorMessage =
    error?.data?.error ||
    error?.statusText ||
    error?.data?.message ||
    "Something went wrong on the server";

  return (
    <div>
      <h1>Ooops! {errorMessage}</h1>
      <p>The following error code was thrown: {errorStatus}</p>
      <Link to="/">Continue browsing</Link>
    </div>
  );
}

export default ErrorPage;
