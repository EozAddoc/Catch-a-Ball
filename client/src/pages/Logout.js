import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL+'/logout')
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/');
                } else {
                    alert("error logging out")
                }
            }).catch(err => {
                console.log(err);
            })
    }, [navigate]);
}

export default Logout;