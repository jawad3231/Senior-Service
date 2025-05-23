import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router";

function Products() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((response) => {
                console.log(response.data)
                setData(response.data)
            })
            .catch((error) => { "404" })
    }, [])

    return (

        <>
            <div className="" style={{ background: "#06907e", textAlign:"-webkit-center" }}>

                <h2 className="p-4 m-0" style={{ background: "#06907e", color: "white" }}>
                    Products
                </h2>
                <div className="row" style={{justifyContent:"space-evenly",marginRight:"80px",marginLeft:"80px"}}>
                    {data.map((product) => (
                        <div key={product.id} className="col-lg-3 mb-3">
                            <div className="card" style={{ width: "18rem" }}>
                                <img  height={ "200px"} src={product.image} className="card-img-top p-3" alt="Product" />
                                <div className="card-body">
                                    <h5 className="card-title" style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{product.title}</h5>
                                    {/* <p className="card-text">{product.description.slice(0, 80)}...</p> ✅ Shortened description */}
                                    <Link to={`/product-detail/${product.id}`} className="btn btn-primary">
                                        View Product Detail
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Outlet />
        </>
    )
}
export default Products;