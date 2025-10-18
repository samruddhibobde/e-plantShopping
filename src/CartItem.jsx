import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  // 🧮 Calculate subtotal for each item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1)); // remove '$' and convert to number
    return (price * item.quantity).toFixed(2);
  };

  // 🧾 Calculate overall total for all items
  const calculateTotalAmount = () => {
    return items
      .reduce((total, item) => {
        const price = parseFloat(item.cost.substring(1));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // ➕ Increase item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
  };

  // ➖ Decrease item quantity (and remove if reaches 0)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ❌ Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 🛍 Continue shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // 💳 Future checkout
  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container" style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item, index) => (
            <div
              key={index}
              className="cart-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <div style={{ flex: 2 }}>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>Price: {item.cost}</p>
              </div>

              <div style={{ flex: 1, textAlign: "center" }}>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>

              <div style={{ flex: 1, textAlign: "right" }}>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "20px", fontWeight: "bold" }}>
            <p>Total Amount: ${calculateTotalAmount()}</p>
          </div>

          <div style={{ marginTop: "20px" }}>
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button
              onClick={handleCheckoutShopping}
              style={{ marginLeft: "10px" }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
