import React, { useState, useEffect } from "react";
import {Row, Col, Card } from "react-bootstrap";
import {BiPackage } from "react-icons/bi";
import Navbar from "../components/Navbar";
import cartbg from "./cartbg.jpeg";

const MyOrders = () => {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem('userEmail'));
    await fetch("http://localhost:4000/api/myorderData",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: localStorage.getItem('userEmail')
        })
    }).then(async(res)=>{
        let response=await res.json();
        await setOrderData(response)
    })
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div style={{
        backgroundImage: `url(${cartbg})`,
//   backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  minWidth: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundRepeat: "repeat-y"
      }}>
      <div><Navbar /></div>
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
                  My Orders <BiPackage />
                </h1>
        <div style={{}}>
        {orderData!=={} ? Array(orderData).map(data=>{
        return (
            data.orderData ?
                data.orderData.order_data.slice(0).reverse().map((item)=>{
                    return (
                        item.map((arrayData)=>{
                            return (
                                <div>
                                    {arrayData.Order_date ? <div style={{fontSize:"1rem", marginLeft:"8px", fontWeight:"bold"}}>
                                        {data=arrayData.Order_date}
                                    </div>:
                                        <Card
                                        key={arrayData.id}
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
                                                src={arrayData.img}
                                                alt=""
                                                style={{ height: "8rem", borderRadius: "10px" }}
                                              />
                                            </Col>
                                            <Col sm={8}>
                                              <Card.Title>
                                                <span style={{ fontSize: "1.2rem", color: "#ff7800" }}>
                                                  {arrayData.name}
                                                </span>
                                              </Card.Title>
                                              <Card.Text>Price: ₹{arrayData.price}</Card.Text>
                                              <Card.Text>Quantity: {arrayData.qty}</Card.Text>
                                              <span style={{ fontWeight: "bold" }}>Total: &nbsp;</span>
                                              <span style={{ fontSize: "1rem", color: "#ff7800" }}>
                                                ₹{arrayData.totalPrice}
                                              </span>
                                            </Col>
                                          </Row>
                                        </Card.Body>
                                      </Card>

                                    }

                                </div>
                                
                            )
                        })
                    )
                }):""
        )
    }): ""}

        </div>
      </div>
    </div>
  );
};

export default MyOrders;
