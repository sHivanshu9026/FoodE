import React, { useState } from "react";
import { BiCartAlt, BiHome, BiLogOut, BiPackage } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import foodelogo from "../screens/foodelogo.png";
import { useCart } from "./ContextReducer";
import "./Navbar.css";

const Navbar = () => {
  const data = useCart();
  const totalItemCount = data.reduce((total, item) => total + item.qty, 0);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const buttonStyle = {
    backgroundColor: "black",
    color: "#ff7800",
    borderRadius: "10px",
    height: "2.5rem",
    padding: "0.25rem 0.5rem",
  };

  const buttonStyles = {
    backgroundColor: "#ff7800",
    color: "black",
    borderRadius: "10px",
    height: "2.5rem",
    padding: "0.25rem 0.5rem",
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [isHovered, setIsHovered] = useState(false);

  const addUnderline = () => {
    setIsHovered(true);
  };

  const removeUnderline = () => {
    setIsHovered(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: "#ff7800",
        height: "3.8rem",
        justifyContent: "space-between",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand font-weight-bold"
          style={{
            fontSize: "3rem",
            color: "white",
            fontFamily: "Roboto, sans-serif",
          }}
          to="/"
          onClick={scrollToTop}
        >
          <img
            src={foodelogo}
            alt="Logo"
            style={{ height: "3rem", width: "auto" }}
          />
        </Link>
        <div className="navbar-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <button
                  className="btn btn-home"
                  style={{
                    ...buttonStyles,
                  }}
                  onMouseEnter={addUnderline}
                  onMouseLeave={removeUnderline}
                >
                  Home <BiHome/>
                </button>
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item">
                <Link className="nav-link" to="/myOrders">
                  <button
                    className="btn btn-home"
                    style={{
                      ...buttonStyles,
                    }}
                    onMouseEnter={addUnderline}
                    onMouseLeave={removeUnderline}
                  >
                    My Orders <BiPackage />
                  </button>
                </Link>
              </li>
            ) : (
              ""
            )}

            {!localStorage.getItem("authToken") ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <button
                      className="btn btn-login"
                      style={{
                        ...buttonStyle,
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "black";
                        e.target.style.color = "white";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "black";
                        e.target.style.color = "#ff7800";
                      }}
                    >
                      Login
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <button
                      className="btn btn-signup"
                      style={{
                        ...buttonStyle,
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "black";
                        e.target.style.color = "white";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "black";
                        e.target.style.color = "#ff7800";
                      }}
                    >
                      SignUp
                    </button>
                  </Link>
                </li>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <button
                      className="btn btn-home"
                      style={{
                        ...buttonStyles,
                      }}
                      onMouseEnter={addUnderline}
                      onMouseLeave={removeUnderline}
                    >
                      Cart <BiCartAlt />
                      {totalItemCount > 0 && (
                        <span
                          class="position-absolute top-50 start-100 translate-middle badge rounded-pill"
                          style={{ color: "black" }}
                        >
                          {totalItemCount}
                          <span className="visually-hidden">
                            items in the cart
                          </span>
                        </span>
                      )}
                    </button>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link">
                    <button
                      className="btn btn-signup"
                      style={{
                        ...buttonStyle,
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "black";
                        e.target.style.color = "white";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "black";
                        e.target.style.color = "#ff7800";
                      }}
                      onClick={handleLogout}
                    >
                      Logout <BiLogOut/>
                    </button>
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
