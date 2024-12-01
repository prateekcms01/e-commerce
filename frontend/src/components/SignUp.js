import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    setName("");
    setEmail("");
    setPassword("");

    console.log(name, email, password);
    let result = await fetch("http://localhost:8000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);

    if (result) {
      navigate("/");
    }
    localStorage.setItem("user", JSON.stringify(result.data));
    localStorage.setItem("token", JSON.stringify(result.auth));
  };

  return (
    <div className="register">
      <h3>Register</h3>
      <input
        type="text"
        className="inputbox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        type="email"
        className="inputbox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter E-mail"
      />
      <input
        type="password"
        className="inputbox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button className="appbutton" type="button" onClick={collectData}>
        SignUp
      </button>
    </div>
  );
};
export default SignUp;
