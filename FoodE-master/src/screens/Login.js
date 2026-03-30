import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { BiShow, BiHide, BiEnvelope, BiLock, BiLogIn, BiLogInCircle, BiUserPlus } from "react-icons/bi";
import Navbar from '../components/Navbar';
import loginbg from './loginbg.jpeg';
import Footer from '../components/Footer';


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (!showPassword) {
      setTimeout(() => {
        setShowPassword(false);
      }, 1500);
    }
  };

  let name, value;

  const handleInput = (event) => {
    name = event.target.name;
    value = event.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Invalid credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{backgroundImage:`url(${loginbg})`, backgroundSize: 'cover',backgroundPosition: 'center',height: '100vh',width: '100vw', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ boxShadow:"10px 10px 20px 0px black",justifyContent: "center", alignItems: "center", width: "30rem", backgroundColor: "white", color: "white", marginTop: "4rem", borderRadius: "25px" }}>
        <h2 style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", marginTop:"20px"  }}><BiLogInCircle /> Login</h2>
          <form method="POST" style={{ width: "30rem", backgroundColor: "ffffff", color: "white", padding: "1.5rem" }}>
            <div className="form-group mb-4">
              <label htmlFor="email" style={{ color: "black" }}>
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
            <div className="form-group mb-4">
              <label htmlFor="password" style={{ color: "black" }}>
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
            <Button
              className="btn my-2 my-sm-0"
              variant="primary"
              type="submit"
              name="login"
              id="login"
              onClick={PostData}
              style={{
                backgroundColor: "#ff7800",
                width: "100%",
                color: "#000000",
                borderColor: "#ff7800",
              }}
            >
              <BiLogIn /> Login
            </Button>
            <p className="mt-2" style={{ color: "black" }}>
                  By logging in, I accept the{" "}
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
            <p style={{ color: "black", marginTop:"30px"}}>
              Don't have an account? 
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
                    to="/register"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                   <BiUserPlus /> Signup
                  </Link>
                </Button>
            </p>
          </form>
        </div>
      </div>
      <div><Footer/></div>
    </div>
  );
};

export default Login;

