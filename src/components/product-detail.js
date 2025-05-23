import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => console.error("Error fetching product:", error));
    }, [id]);

    useEffect(() => {
        if (product?.category) {
            fetchSimilarProducts(product.category);
        }
    }, [product]);

    const fetchSimilarProducts = (category) => {
        axios.get(`https://fakestoreapi.com/products/category/${category}`)
            .then((response) => {
                setSimilarProducts(response.data.filter(p => p.id !== Number(id)));
            })
            .catch((error) => console.error("Error fetching similar products:", error));
    };

    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        // alert("Product added to cart!");
        navigate("/cart");
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-md-5">
                    <img src={product.image} alt={product.title} className="img-fluid" />
                </div>
                <div className="col-md-7">
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <h4>${product.price}</h4>
                    <button className="btn btn-success" onClick={addToCart}>Add to Cart</button>
                </div>
            </div>

            {/* Similar Products Section */}
            <h3 className="mt-5">Similar Products</h3>
            <div className="row">
                {similarProducts.map((item) => (
                    <div key={item.id} className="col-md-3">
                        <div className="card mb-3">
                            <img height={"200px"} src={item.image} className="card-img-top p-3" alt={item.title} />
                            <div className="card-body">
                                <h6 className="card-title">{item.title.substring(0, 30)}...</h6>
                                <p className="card-text">${item.price}</p>
                                <Link to={`/product-detail/${item.id}`} className="btn btn-primary btn-sm">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductDetails;
