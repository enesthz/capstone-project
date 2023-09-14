import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyToken from '../helpers/verifyToken';

function PrivateRoute({ children }) {
  const [isTokenVerified, setTokenVerified] = useState(false);
  let navigate = useNavigate();
  useEffect(function verification() {
    verifyToken(localStorage.getItem('token'))
      .then((isValid) => {
        if (isValid === true) {
          setTokenVerified(true);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate('/welcome');
      });
  }, []);

  return <>{isTokenVerified && children}</>;
}

export default PrivateRoute;
