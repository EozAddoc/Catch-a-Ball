import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

// Function to set the token in headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
    const clearAuthToken = () => {
        localStorage.removeItem('token');

        // You may also want to clear the token from the axios headers
        setAuthToken(null);
      };

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL+'/logout')
            .then(res => {
                if (res.data.Status === "Success") {
                  clearAuthToken()
                  localStorage.clear();
                    navigate('/');
                } else {
                    alert("error logging out")
                }
            }).catch(err => {
                console.error(err);
            })
    }, [navigate]);
}

export default Logout;