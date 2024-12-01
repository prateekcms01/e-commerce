const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const user = require("./db/user");
const Product = require("./db/product");
app.use(express.json());
app.use(cors());
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

app.post("/register", async (req, res) => {
  let data = new user(req.body);
  let result = await data.save();
  // Deleting password from local storage
  result = result.toObject();
  delete result.password;
  if (data) {
    jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp.send("Somthing went wrong");
      } else {
        res.send({ data, auth: token });
      }
    });
  }
  // if (data) {
  //   res.send(data);
  // }
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    // this line is checking that two input should be there email and password
    let data = await user.findOne(req.body).select("-password");
    if (data) {
      jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send("Somthing went wrong");
        } else {
          res.send({ data, auth: token });
        }
      });
    }
    // if (data) {
    //   res.send(data);
    // }
    else {
      res.send({ result: "user not find" });
    }
  } else {
    res.send({ result: "user not find" });
  }
});

app.post("/product-add", async (req, res) => {
  let data = new Product(req.body);
  let result = await data.save();
  res.send(result);
});

app.get("/product", async (req, res) => {
  let data = await Product.find();
  if (data.length > 0) {
    res.send(data);
  } else {
    res.send({ result: "No Product found" });
  }
});

app.delete("/product/:id", async (req, res) => {
  let data = await Product.deleteOne({ _id: req.params.id });
  res.send(data);
});

app.get("/product/:id", async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });

  if (result) {
    res.send(result);
  } else {
    res.send({ result: "Not Found" });
  }
});

app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

app.listen(8000);
