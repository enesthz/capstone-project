import { useRouteError } from 'react-router-dom';

import React from 'react';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <p>An Error has been occured</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
