import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("Loaded Cart:", storedCart); // Debugging
        setCart(storedCart);
    }, []);

    if (!cart.length) {
        return <h3 className="text-center mt-5">🛒 Your Cart is Empty!</h3>;
    }

    const increaseQuantity = (id) => {
        const updatedCart = cart.map(item => 
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => 
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <div className="container mt-4">
            <h2>Your Cart</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.image} alt={item.title} width="50" />
                                {item.title.substring(0, 20)}...
                            </td>
                            <td>${item.price}</td>
                            <td>
                                <button className="btn btn-sm btn-secondary" onClick={() => decreaseQuantity(item.id)}>-</button>
                                <span className="mx-2">{item.quantity}</span>
                                <button className="btn btn-sm btn-secondary" onClick={() => increaseQuantity(item.id)}>+</button>
                            </td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
        </div>
    );
}

export default Cart;
