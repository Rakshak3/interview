import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";

// Define the backend URL
const URL = process.env.REACT_APP_BACKEND_URL + "/api/login";

// Login component
const Login = (props) => {
  // State variables to hold user email and password
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook for navigation
  const { isLoggedIn, setIsLoggedIn, setName, setEmail } = props; // Props destructuring

  // Effect hook to check if the user is already logged in
  useEffect(() => {
    // Check if the user email is stored in localStorage
    const storedUseremail = localStorage.getItem("useremail");

    // If user email is found, set it in the state and navigate to login page
    if (storedUseremail != null) {
      setUseremail(storedUseremail);
      navigate("/login");
    }
  }, [isLoggedIn, navigate]); // Dependency array

  // Function to handle login form submission
  const handleLogin = async (ev) => {
    ev.preventDefault(); // Prevent default form submission behavior

    // Store user email in localStorage
    // Create form data object with email and password
    const email = ev.target.email.value;
    const formData = { email: email, password: password };

    try {
      // Send a POST request to the login API endpoint
      const res = await axios.post(URL, formData);
      const data = res.data; // Extract data from the response

      // If login is successful, update state and navigate to terms condition page
      if (data.success === true) {
        toast.success(data.message);
        setIsLoggedIn(true);
        setEmail(email);
        setName(data.name);
        // localStorage.setItem('name', name);
        localStorage.setItem("useremail", useremail);
        const name = data.name;
        localStorage.setItem("name", name);
        const phone = data.phone;
        localStorage.setItem("phone", phone);
        navigate("/termscondition");
      } else {
        // If login fails, display error message
        toast.error(data.message);
      }
    } catch (error) {
      // Handle errors
      console.error("Error logging in:", error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
  };

  // JSX rendering
  return (
    <div className="w-full flex justify-center my-4 login-page">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Login to your account
        </h5>
        <form
          className="w-full flex max-w-md flex-col gap-4"
          onSubmit={handleLogin} // Call handleLogin function on form submit
        >
          <div>
            <div className="mb-2 block">
              <label htmlFor="email" className="text-sm font-medium required">
                Email
              </label>
            </div>
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Please enter your email here"
            >
              <input
                id="email"
                type="email"
                placeholder="Useremail"
                value={useremail}
                onChange={(e) => setUseremail(e.target.value)} // Update useremail state on input change
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-2 block">
            <label htmlFor="password" className="text-sm font-medium required">
              Password
            </label>
          </div>
          <div
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Please enter your password here"
          >
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
          >
            Submit
          </button>
          <p className="text-center text-sm text-gray-500">
            Not yet registered?{" "}
            <Link
              to={"/register"}
              className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
            >
              Register Here
            </Link>
            
          </p>
          {/* <div className="text-sm">
              <Link
                href="/forgotPassword"
                className="font-semibold text-purple-600 hover:text-purple-500"
              >
                Forgot password?
              </Link>
            </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
