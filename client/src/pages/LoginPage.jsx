import Form from "../components/Form";

function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
    <div className="md:w-1/2 relative bg-custom-pokeB hidden md:block">
      <img
        src="login_img.jpg"
        alt="logImg"
        className="opacity-50 w-full h-full object-cover"
      />
    </div>
    <div className="md:w-1/2 bg-custom-pokeB flex flex-col">
      <div className="md:h-1/4">
        <div className="m-5 flex items-center justify-center">
          <img src="login.png" alt="LoginImage" />
        </div>
      </div>
      <div className="md:h-3/4 bg-custom-pokeB">
        <Form />
      </div>
    </div>
  </div>
  ); 
}

export default LoginPage;
