import { useAtom } from "jotai";
import { formAtom, authAtom } from "../atoms/authAtom";
import axios from "axios";
import signupImage from '../assets/signup.png'
import facebookIcon from '../assets/facebook-circle-svg.svg'
import googleIcon from '../assets/google-color-svg.svg'
import microsoftIcon from '../assets/microsoft-svg.svg'
import { setAuthToken } from "../services/axiosInstance";
import { getUserInfoFromToken } from "../utils/jwtUtils"; 
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [form, setForm] = useAtom(formAtom);
  const [, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post(
      "http://courseplatform.runasp.net/api/Account/register",
      {
        ...form,
        userRole: 0,
      }
    );

    if (response.data.success) {
      const token = response.data.data; // backend returns token here

      // 🪄 Add this block:
      setAuthToken(token);
      setAuth(token);

      const info = getUserInfoFromToken(token);
      const userObj = {
        username: info?.unique_name ?? form.userName ?? null,
        email: info?.email ?? form.email ?? null,
      };
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("token", token);

      alert("Registered & logged in!");
      navigate('/');  
    }
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <div className="flex min-h-[70vh] bg-white">
      {/* Left image */}
      <div className="hidden md:flex w-3/7 bg-gray-100 items-center justify-center">
        <img
  src={signupImage}
  alt="Sign up"
  className="w-full h-full object-cover"
/>

      </div>

      {/* Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
  <h2 className="text-2xl font-bold mb-14 text-center">Create Your Account</h2>

  {/* First + Last Name side by side */}
  <div className="flex gap-4">
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      value={form.firstName}
      onChange={handleChange}
      className="w-1/2 border border-gray-300 p-3 mb-6 rounded"
      required
    />
    <input
      type="text"
      name="lastName"
      placeholder="Last Name"
      value={form.lastName}
      onChange={handleChange}
      className="w-1/2 border border-gray-300 p-3 mb-6 rounded"
      required
    />
  </div>

  {/* Username + Email */}
  {["userName", "email"].map((field) => (
    <input
      key={field}
      type={field === "email" ? "email" : "text"}
      name={field}
      placeholder={field.replace(/([A-Z])/g, " $1")}
      value={form[field]}
      onChange={handleChange}
      className="w-full border border-gray-300 p-3 mb-6 rounded"
      required
    />
  ))}

  {/* Password + Confirm Password side by side */}
  <div className="flex gap-4">
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      className="w-1/2 border border-gray-300 p-3 mb-6 rounded"
      required
    />
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={form.confirmPassword}
      onChange={handleChange}
      className="w-1/2 border border-gray-300 p-3 mb-6 rounded"
      required
    />
  </div>

  {/* Submit button */}
  <button
    type="submit"
    className="flex items-center justify-start bg-black text-white px-6 py-3 rounded hover:bg-gray-800 mt-4"
  >
    Create Account
    <i className="ri-arrow-right-line ml-2"></i>
  </button>

  {/* Separator */}
  <div className="flex items-center my-6">
    <hr className="flex-grow border-gray-300" />
    <span className="px-2 text-gray-500">sign up with</span>
    <hr className="flex-grow border-gray-300" />
  </div>

  {/* Social buttons */}
  <div className="flex justify-between">
    <button type="button" className="flex items-center border px-4 py-2 rounded hover:bg-gray-50">
      <img src={facebookIcon} alt="fb" className="w-5 h-5 mr-2" /> Facebook
    </button>
    <button type="button" className="flex items-center border px-4 py-2 rounded hover:bg-gray-50">
      <img src={googleIcon} alt="google" className="w-5 h-5 mr-2" /> Google
    </button>
    <button type="button" className="flex items-center border px-4 py-2 rounded hover:bg-gray-50">
      <img src={microsoftIcon} alt="ms" className="w-5 h-5 mr-2" /> Microsoft
    </button>
  </div>
</form>


      </div>
    </div>
  );
}

export default SignUp;
