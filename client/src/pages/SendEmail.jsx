import Form from "../components/Form";
import withDarkMode from "../components/withDarkMode";

function SendEmail({ darkMode, toggleTheme }) {
  return (
    <>
      <Form text="Send Email" imgAlt="pokemon battle landscape" imgSrc="login_img.jpg" logoAlt="loginLogo" logoSrc="resetPW.png"></Form>
    </>
  );
}

export default SendEmail;
