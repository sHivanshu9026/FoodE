import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BiError, BiCartAlt, BiTrashAlt, BiCheckCircle} from "react-icons/bi";
import cartbg from "./cartbg.jpeg";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import Navbar from "../components/Navbar";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [successMessage, setSuccessMessage] = useState();

  if (data.length === 0 && !successMessage) {
    return (
        <div
          style={{
            backgroundImage: `url(${cartbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Navbar />
          </div>
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "1rem",
              marginTop: "7rem",
              margin: "5rem",
              borderRadius: "10px",
            }}
          >
            <h1 style={{ marginBottom: "1rem" }}>
                  My Cart <BiCartAlt />
                </h1>
            <div
              className="alert"
              role="alert"
              style={{
                backgroundColor: "#ff7800",
                color: "black",
                marginTop: "1rem",
                marginLeft: "1.4rem",
                marginRight: "1.4rem",
                textAlign: "center",
                padding: "1rem",
                paddingBottom: "10px",
                paddingTop:"8px",
                fontSize:"2rem"
              }}
            >
{" "}
          <span style={{ color: "black" }}>
            <BiError />
          </span>
           Your Food-E Cart is empty
              
            </div>
          </div>
        </div>
      );
  }

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    try {
      let response = await fetch("http://localhost:4000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.status === 200) {
        dispatch({ type: "DROP_ALL" });
        setSuccessMessage("Your order has been successfully placed!");
        return;
      }
    } catch (error) {
      console.error("Order error: ", error);
    }
  };

  const renderCartItems = () => {
    return data.map((item) => (
      <Card
        key={item.id}
        style={{
          marginBottom: "1rem",
          borderRadius: "10px",
          backgroundColor: "#464646",
          boxShadow: "",
          width: "40rem",
        }}
      >
        <Card.Body>
          <Row>
            <Col sm={4}>
              <img
                src={item.img}
                alt=""
                style={{ height: "8rem", borderRadius: "10px" }}
              />
            </Col>
            <Col sm={8}>
              <Card.Title>
                <span style={{ fontSize: "1.2rem", color: "#ff7800" }}>
                  {item.name}
                </span>
              </Card.Title>
              <Card.Text>Price: ₹{item.price}</Card.Text>
              <Card.Text>Quantity: {item.qty}</Card.Text>
              <span style={{ fontWeight: "bold" }}>Total: &nbsp;</span>
              <span style={{ fontSize: "1rem", color: "#ff7800" }}>
                ₹{item.totalPrice}
              </span>
              <Button
                size="sm"
                onClick={() => handleDeleteFromCart(item.id)}
                style={{
                  float: "right",
                  backgroundColor: "#ff7800",
                  color: "black",
                  borderColor: "#ff7800",
                }}
              >
                <BiTrashAlt />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ));
  };

  const handleDeleteFromCart = async (itemId) => {
    await dispatch({ type: "REMOVE", id: itemId });
  };

  if (!successMessage) {
    return (
      <div
        style={{
          backgroundImage: `url(${cartbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Navbar />
        </div>
        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "1rem",
            marginTop: "7rem",
            margin: "5rem",
            borderRadius: "10px",
          }}
        >
          <Container>
            <Row>
              <Col>
                <h1 style={{ marginBottom: "1rem" }}>
                  My Cart <BiCartAlt />
                </h1>
                {renderCartItems()}
                <hr />
                <Row>
                  <Col sm={6}>
                    <h4>
                      <span style={{ fontWeight: "bold" }}>Total: &nbsp;</span>

                      <span
                        style={{
                          fontSize: "2rem",
                          color: "#ff7800",
                        }}
                      >
                        ₹{data.reduce((acc, item) => acc + item.totalPrice, 0)}
                        /-
                      </span>
                    </h4>
                  </Col>
                  <Col sm={6} className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      size="lg"
                      style={{
                        backgroundColor: "#ff7800",
                        color: "black",
                        borderColor: "#ff7800",
                      }}
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          {successMessage && (
            <div
              className="alert"
              role="alert"
              style={{
                backgroundColor: "#ff7800",
                color: "black",
                marginTop: "1rem",
                marginLeft: "1.4rem",
                marginRight: "1.4rem",
                textAlign: "center",
                padding: "2px",
                paddingBottom: "10px",
              }}
            >
              <span style={{ fontSize: "2rem", color: "green" }}>
                <BiCheckCircle />
              </span>{" "}
              {successMessage}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundImage: `url(${cartbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Navbar />
        </div>
        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "1rem",
            marginTop: "7rem",
            margin: "5rem",
            borderRadius: "10px",
          }}
        >
            <h1 style={{ marginBottom: "1rem" }}>
                  My Cart <BiCartAlt />
                </h1>
          <div
            className="alert"
            role="alert"
            style={{
              backgroundColor: "#ff7800",
              color: "black",
              marginTop: "1rem",
              marginLeft: "1.4rem",
              marginRight: "1.4rem",
              textAlign: "center",
              padding: "2px",
              paddingBottom: "10px",
            }}
          >
            <span style={{ fontSize: "2rem", color: "green" }}>
              <BiCheckCircle />
            </span>{" "}
            {successMessage}
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;
