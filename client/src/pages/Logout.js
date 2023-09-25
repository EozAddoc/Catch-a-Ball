import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:1117/logout')
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/');
                } else {
                    alert("error logging out")
                }
            }).catch(err => {
                console.log(err);
            })
    }, []);
}

export default Logout;