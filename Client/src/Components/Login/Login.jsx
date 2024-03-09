import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to store any errors
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for the request
    const response = await login(email, password);
    // const user = await User;

    if (response === true) {
      navigate("/");
    } else setError(response);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border p-4 rounded-xl bg-cyan-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            login to your UNIQ`S Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          {error && (
            <span className="text-red-500 font-bold text-sm block mb-4">
              {error}
            </span>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <NavLink
                to="/Login/Update"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                Chang your password?
              </NavLink>
            </div>

            {/* <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div> */}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              login
            </button>
          </div>
          <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
            Don`t have an account?{" "}
            <NavLink
              to="/signup"
              className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
            >
              {" "}
              Register
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
