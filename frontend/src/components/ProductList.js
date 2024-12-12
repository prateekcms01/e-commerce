import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let data = await fetch("http://localhost:8000/product", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let result = await data.json();
    setProducts(result);
  };
  console.log("Products:", products);

  const deleteProduct = async (id) => {
    const data = await fetch(`http://localhost:8000/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const result = await data.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      const data = await fetch(`http://localhost:8000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const result = await data.json();
      setProducts(result);
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List </h1>
      <input
        type="text"
        className="search-item"
        placeholder="search for item"
        onChange={searchHandle}
      />
      <ul>
        <li>S.NO</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>
              <button
                className="del-btn"
                onClick={() => deleteProduct(item._id)}
              >
                Delete
              </button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>Product Not Found</h1>
      )}
    </div>
  );
};

export default ProductList;
