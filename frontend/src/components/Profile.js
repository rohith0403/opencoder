import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge } from 'react-bootstrap';
import "./CSS/General.css";


const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container text-white" style={{
      marginTop:"-16px"
    }}>
      <div className="filter" style={{ 
      zIndex:-99999,
      backgroundImage: `url("/background.jpg")`,
      width : "100%",
      marginLeft:"-120px",
      height : "95%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      position:"absolute",
      // -webkit-filter: blur(10px);
      // filter: blur(10px);
      }}>
      </div>
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header >
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <Link
              to={"/profileedit/" + currentUser.id}
              className="badge badge-warning"
            >
            <Badge bg="warning" text="dark">
              Edit
            </Badge>{' '}
            </Link>
    </div>
  );
};

export default Profile;
