import React, { useState } from "react";
import "./Login.css";
import { SlSocialGoogle } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { ErrorMessage, Field, Formik, Form } from "formik";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";
import axios from "axios";

function Login() {

  const [mode, setMode] = useState({
    username: "",
    password: "",
  })

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      if (result.user) {
        navigate("/Lead");
        const email = result.user.email;
     
  
        try {
          sessionStorage.clear();
          sessionStorage.setItem('email', email);
          console.log(email);
          const theres = await axios.post("http://localhost:3001/login/post/api", {
            userName: result.user.email,
            password: null
          });
  
          console.log("Data posted successfully ", theres.data);
         

        } catch (error) {
          console.error("Error while posting data:", error); // Log the error for debugging
          // Handle the error silently or display a friendly message to the user
        }
      }
    });
  }
  


  // const [isSignUp, setIsSignUp] = useState(false);

  // const toggleSignUpMode = () => {
  //   setIsSignUp(!isSignUp);
  // };

  const navigate = useNavigate();

  const handleClick = async () => {
    sessionStorage.clear();
    sessionStorage.setItem("inputValue",mode.username);
    console.log(mode.username)

    try {
      const isValid = await schema.isValid(mode)
      if (isValid) {
        navigate("/Lead")
        const theres = await axios.post("http://localhost:3001/login/post/api", {
          userName: mode.username,
          password: mode.password
          // Clear input value
        })
        console.log("Data posted successfully ", theres.data)
      
      }
      else {
        console.log("Incorrect credentials")
      }
    } catch (error) {
      console.log("Error while posting", error)
    }
  }



  const schema = yup.object().shape({
    username: yup
      .string().email()
      .required("Username is required"),

    password: yup
      .string()
      .required("Enter the password")
      // .min(8, "Password should be atleast 8 characters")
      // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Please tighten your password")
  })

  const handleInput = (e) => {
    setMode({ ...mode, [e.target.name]: e.target.value })
  }

  let handleSubmit = () => {
    let data = {
      username: mode.username,
      password: mode.password,
    }
    console.log(data)
  }

  return (
    <>
      <Formik
        initialValues={mode}
        validationSchema={schema}
        onSubmit={handleSubmit}

      // onSubmit={(values,{setSubmitting})=>{
      //   console.log(values)
      //   setSubmitting(false)
      // }}
      >
        {({ handleChange, handleSubmit }) => (
          <div className={`container1`}>
            {/* <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}> */}
            <div className="forms-container1">
              <div className="signin-signup">

                <Form action="#" className="sign-in-form"
                  onSubmit={handleSubmit}
                >
                  <h2 className="title">Login</h2>
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <Field
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={mode.username}
                      onChange={(e) => { handleChange(e); handleInput(e) }}
                    />
                    <ErrorMessage name="username" >
                      {msg => <div className="error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <Field
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={mode.password}
                      onChange={(e) => { handleChange(e); handleInput(e) }}
                    />
                    <ErrorMessage name="password" >
                      {msg => <div className="error">{msg}</div>}
                    </ErrorMessage>

                  </div>
                  <input type="submit" value="Login" onClick={handleClick} className="loginbutton" />

                  <p className="social-text">Or Sign in with Google</p>
                  <div className="social-media" onClick={googleLogin}>
                    <a href="#" className="social-icon">
                      <SlSocialGoogle />
                    </a>
                  </div>
                </Form>
              </div>
            </div>

            <div className="panels-container1">
              <div className="panel left-panel">
                <div className="content">
                  <h3>New here ?</h3>
                  <p>
                    Welcome to our platform! If you're new here, we're excited to have you join our community. We're here to support you every step of the way.
                  </p>
                  {/* <button className="btn transparent" onClick={toggleSignUpMode}>
              Sign up
            </button> */}
                </div>
              </div>
            </div>


          </div>
        )}
      </Formik>
    </>


  );
}




export default Login;