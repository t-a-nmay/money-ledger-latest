import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePicSelector from "../../components/Inputs/ProfilePicSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const {updateUser} =useContext(UserContext);
  const navigate = useNavigate();

  //for handling signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    //signup api call
    try {
      //upload image if present
      if (profilePic) {
        const imgUploadRes=await uploadImage(profilePic);
        profileImageUrl=imgUploadRes.imageUrl || "";
      }
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl
      })
      const { token, user }=response.data;
      if(token){
        localStorage.setItem('token',token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong, Please try again");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-cs text-slate-700 mt-[5px] mb-6">
          Join today by entering your details below
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePicSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              Value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              Label="Full Name"
              placeHolder="John"
              inputType="text"
            />

            <Input
              Value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              Label="Email Address"
              placeHolder="john@example.com"
              inputType="text"
            />

            <div className="col-span-2">
              <Input
                Value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                Label="Password"
                placeHolder="Minimum 8 characters"
                inputType="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Sign Up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
