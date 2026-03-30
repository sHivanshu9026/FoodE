import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { BiShow, BiHide, BiUser, BiUserPlus, BiEnvelope, BiMap, BiLock, BiLogIn, BiUserCheck } from "react-icons/bi";
import Navbar from '../components/Navbar';
import signupbg from './signupbg.jpeg';
import Footer from '../components/Footer';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (!showPassword) {
      setTimeout(() => {
        setShowPassword(false);
      }, 1500);
    }
  };

let name,value;

  const handleInput = (event) => {
    console.log(event);
    name=event.target.name;
    value=event.target.value;
    setCredentials({ ...credentials, [name]:value });
  };


  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, password, location } = credentials;
    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        location,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      alert("Enter valid credentials");
    }
  };


  return (
    <div>
        <div><Navbar/></div>
        <div style={{backgroundImage:`url(${signupbg})`, backgroundSize: 'cover',backgroundPosition: 'center',height: '100vh',width: '100vw', display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{maxWidth:"30rem", backgroundColor:"white", color:"white", marginTop:"3.5rem", borderRadius:"25px", boxShadow:"10px 10px 20px 0px black"}}>
            <h2 style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", marginTop:"20px"  }}><BiUserCheck /> Signup</h2>
            <form method="POST" style={{maxWidth:"30rem", backgroundColor:"ffffff", color:"white", padding:"1.5rem"}}>
                <div className="form-group mb-3">
                  <label htmlFor="name" style={{ color: "black" }}>
                  <BiUser /> Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter username"
                    name="name"
                    value={credentials.name}
                    onChange={handleInput}
                    style={{ backgroundColor: "white", color: "black" }}
                  />
                </div>
                <div className="form-group mb-3">
                  <label
                    htmlFor="email"
                    style={{ color: "black" }}
                  >
                    <BiEnvelope /> Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInput}
                    style={{ backgroundColor: "white", color: "black" }}
                  />
                </div>
                <div className="form-group mb-3">
                  <label
                    htmlFor="password"
                    style={{ color: "black" }}
                  >
                    <BiLock /> Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInput}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <BiHide /> : <BiShow />}
                    </button>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label
                    htmlFor="location"
                    style={{ color: "black" }}
                  >
                    <BiMap /> Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    placeholder="location"
                    name="location"
                    value={credentials.location}
                    onChange={handleInput}
                    style={{ backgroundColor: "white", color: "black" }}
                  />
                </div>
                <Button
                  className="btn my-2 my-sm-0"
                  variant="primary"
                  type="submit"
                  name="signup"
                  id="signup"
                  onClick={PostData}
                  style={{
                    backgroundColor: "#ff7800",
                    width: "100%",
                    color: "#000000",
                    borderColor: "#ff7800",
                  }}
                >
                  <BiUserPlus /> Signup
                </Button>
                <p className="mt-2" style={{ color: "black" }}>
                  By creating an account, I accept the{" "}
                  <Link
                    to="/terms"
                    style={{ textDecoration: "none", color: "#ff7800" }}
                  >
                    Terms & Conditions
                  </Link>
                  &nbsp; &amp; &nbsp;
                  <Link
                    to="/privacy"
                    style={{ textDecoration: "none", color: "#ff7800" }}
                  >
                    Privacy Policy.
                  </Link>
                </p>
                <p style={{ color: "black", marginTop:"10px"}}>
              Already have an account?
              <Button
                  className="btn my-2 my-sm-0"
                  variant="primary"
                  type="submit"
                  style={{
                    backgroundColor: "#ff7800",
                    width: "100%",
                    color: "#000000",
                    borderColor: "#ff7800",
                  }}
                >
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                   <BiLogIn /> Login
                  </Link>
                </Button>
            </p>
              </form></div></div>
        
      <div><Footer/></div>
    </div>
  );
};

export default Signup;
