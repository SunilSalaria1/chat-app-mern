import { ErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
    const error = useRouteError() as ErrorResponse;
    console.error(error);
    return <div>{error.data}</div>;
  }