import React, { useState } from "react";
import { BiCartAlt, BiTrashAlt } from 'react-icons/bi';
import { useDispatchCart} from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  const [qty, setQty] = useState(1);
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  // let data=useCart();

  const handleAddToCart = async () => {
    const totalPrice = qty * props.foodItem.price;
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      qty: qty,
      img: props.foodItem.img,
      totalPrice: totalPrice,
      price: props.foodItem.price
    });
    setQty(1);
    setShowQuantityControls(false);
    console.log("Item added to cart");

  };
  const handleDeleteFromCart = async () => {
    await dispatch({ type: "REMOVE", id: props.foodItem._id });
    console.log("Item removed from cart");
  };

  const handleAddClick = () => {
    setShowQuantityControls(true);
  };

  const handleIncrement = () => {
    if (qty < 10) {
      setQty(qty + 1);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    } else {
      setShowQuantityControls(false);
    }
  };

  return (
    <div style={{ marginLeft: "3.3rem", marginBottom: "2rem" }}>
      <div id="card" className="card m-10 p-10" style={{ width: "16rem", maxHeight: "400px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "10rem" }} />
        <div className="card-body">
          <h5 className="card-title mb-1" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{props.foodItem.name}</span>
            <span style={{
              fontSize: "0.8rem",
              border: "1px solid #ff7800",
              color: "#ff7800",
              padding: "3px",
              borderRadius: "5px"
            }}>
              &#8377; {props.foodItem.price}/-
            </span>
          </h5>
          <p className="card-text" style={{ color: "#ff7800", fontSize: "0.7rem" }}>{props.foodItem.description}</p>
          <div className="container w-100" style={{ display: "flex", justifyContent: "center" }}>
            {showQuantityControls ? (
              <div className="input-group m-2" style={{ width: "10rem", fontSize: "0.8rem" }}>
                <button className="input-group-text" onClick={handleDecrement} style={{ backgroundColor: "#ff7800", color: "#ffffff", borderColor: "#ff7800" }}>
                  -
                </button>
                <span className="form-control" style={{ display: "flex", justifyContent: "center", borderColor: "#ff7800", color: "#ff7800" }}>
                  {qty}
                </span>
                <button className="input-group-text" onClick={handleIncrement} style={{ backgroundColor: "#ff7800", color: "#ffffff", borderColor: "#ff7800" }}>
                  +
                </button>
              </div>
            ) : (
              <button className="btn" onClick={handleAddClick} style={{ borderColor: "#ff7800", margin: "8px", width: "10rem", backgroundColor: "#ff7800", color: "#ffffff" }}>
                Quantity
              </button>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button className="btn" onClick={handleAddToCart} style={{ borderColor: "#ff7800", margin: "8px", width: "7rem", backgroundColor: "#ff7800", color: "#ffffff", fontSize: "0.8rem" }}>
              Add to Cart <BiCartAlt />
            </button>
            <button className="btn" onClick={handleDeleteFromCart} style={{ borderColor: "#ff7800", margin: "8px", width: "2rem", backgroundColor: "#ff7800", color: "#ffffff", fontSize: "0.8rem", padding: "6px" }}>
              <BiTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
