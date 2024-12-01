import React from "react";

const Profile = () => {
  const auth = localStorage.getItem("user");
  const Name = JSON.parse(auth).name;
  return <h1 className="profile-style"> Welcome {Name}</h1>;
};

export default Profile;
