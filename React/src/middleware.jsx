import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getSession = async () => {
    const { data } = await axios.get("http://localhost:3000/auth/getsession", {
      withCredentials: true,
    });
    console.log(data)
    data.error ? setIsLoggedIn(false) : setIsLoggedIn(true);
  };

  useEffect(() => { 
    void getSession();
  }, []);

  return <>{isLoggedIn != true ? <Navigate to="" replace /> : children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
