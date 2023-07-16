import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  console.log("Error Page");

  return (
    <div>
      <h1>
        Ooops! {error?.data?.message || "Something went wrong on the server"}
      </h1>
      <p>The following error code was thrown: {error?.status || 500}</p>
      <Link to="/">Continue browsing</Link>
    </div>
  );
}

export default ErrorPage;
