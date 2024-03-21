import Form from "../components/Form";
import React from "react";
import withDarkMode from "../components/withDarkMode";

function ResetPassword({ darkMode, toggleTheme }) {
 
  return (
    < >
    <Form text="Reset Password" imgSrc="register_img.jpg" imgAlt ="regImg" logoAlt="reset password logo" logoSrc="resetPW.png"/>
    </>
  );
  
}

export default ResetPassword;
