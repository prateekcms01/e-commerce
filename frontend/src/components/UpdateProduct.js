import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  //    Prefilling the fields
  const getProduct = async () => {
    console.log(params.id);
    let data = await fetch(`http://localhost:8000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let result = await data.json();

    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const handleUpdateProduct = async () => {
    let data = await fetch(`http://localhost:8000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let result = await data.json();
    console.log(result);
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
    navigate("/");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUpdateProduct();
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        className="inputbox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter Name"
      />
      <input
        type="text"
        className="inputbox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter Price"
      />
      <input
        type="text"
        className="inputbox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter Category"
      />
      <input
        type="text"
        className="inputbox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter Company"
      />
      <button className="appbutton" type="button" onClick={handleUpdateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
