import Form from "../components/Form";

function LoginPage() {
  return (
    <div className="flex min-h-screen  bg-custom-pokeB">
      <div className="w-2/5 h-30 flex mx-0 relative">
        <img
          src="login_img.jpg"
          alt="loginImg"
          className="opacity-50 w-full h-auto "
        />
      </div>
      <div className="  m-5 flex flex-col justify-center items-center">
     
<div
  class="container max-w-md mx-auto xl:max-w-3xl  flex bg-white rounded-lg shadow overflow-hidden"
>

  <div class="w-full  p-8">
    <form method="post" action="#" onSubmit="return false">
      <h1 class=" text-2xl font-bold">Sign in to your account</h1>
      <div>
        <span class="text-gray-600 text-sm">
          Don't have an account?
        </span>
        <span class="text-gray-700 text-sm font-semibold">
          Sign up
        </span>
      </div>
      <div class="mb-4 mt-6">
        <label
          class="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
          id="email"
          type="text"
          placeholder="Your email address"
        />
      </div>
      <div class="mb-6 mt-6">
        <label
          class="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          class="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
          id="password"
          type="password"
          placeholder="Your password"
        />
        <a
          class="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
          href="/forgot"
        >
          Forgot Password?
        </a>
      </div>
      <div class="flex w-full mt-8">
        <button
          class="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
          type="button"
        >
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
          
       
      </div>
    </div>
  ); 
}

export default LoginPage;
