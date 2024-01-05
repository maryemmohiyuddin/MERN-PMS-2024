import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      // Fetch session data from the server
      const { data } = await axios.get("http://localhost:3000/auth/getsession", {
        withCredentials: true,
      });
      console.log("Session data:", data);

      // Check if the user is logged in based on the session data
      if (data.error) {
        // Clear the session cookie if the user is not logged in
        Cookies.remove("session");
        navigate("/");
      } else {
        // Set the session cookie if the user is logged in
        Cookies.set("session", "loggedIn");
      }
    } catch (error) {
      console.error("Error checking session:", error);
      // Clear the session cookie in case of an error
      Cookies.remove("session");
      navigate("/");
    }
  };

  useEffect(() => {
    void checkSession();
  }, []);

  useEffect(() => {
    // Redirect to the login page if the session cookie is not set
    if (!Cookies.get("session")) {
      navigate("/");
    }
  }, [navigate]);

  // Render the instructor layout if the session cookie is set
  return <>{Cookies.get("session") ? children : null}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
