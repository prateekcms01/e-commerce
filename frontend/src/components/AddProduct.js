import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const auth = localStorage.getItem("user");
  const userId = JSON.parse(auth)._id;

  const handleAddProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    setError(false);
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");

    const data = await fetch("http://localhost:8000/product-add", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let result = await data.json();
    console.log(result);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddProduct();
    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        className="inputbox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter Name"
      />
      {error && !name && (
        <span className="invalid-input">Enter valid Name</span>
      )}

      <input
        type="text"
        className="inputbox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter Price"
      />
      {error && !price && (
        <span className="invalid-input">Enter valid Price</span>
      )}

      <input
        type="text"
        className="inputbox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter Category"
      />
      {error && !category && (
        <span className="invalid-input">Enter valid Category</span>
      )}

      <input
        type="text"
        className="inputbox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter Company"
      />
      {error && !company && (
        <span className="invalid-input">Enter valid Company</span>
      )}

      <button className="appbutton" type="button" onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
