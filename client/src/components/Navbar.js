import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from  '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const navigate=useNavigate();
  const links = [
    {
      id: 1,
      url: "/longin",
      text: "login"
    },
    {
      id: 2,
      url: "/register",
      text: "SignUp"
    },
  ];

  const user = localStorage.getItem("token");

  const handleLogout = () => {
		localStorage.removeItem("token");
    navigate('/')
	};
  
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <h3>GalleryGlimpse</h3>
          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        {showLinks===true?(
          <div className="links-container show-container">
            <ul className="links">
              {links.map((link) => {
                const { id, url, text } = link;
                return (
                  <li key={id}>
                    <a to={url}>{text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        ):(
            <div className="btn-auth">
              {user == null ? (
              <>
                <Link to="/login">
                  <button className="btn-ln">Login</button>
                </Link>
              </>
            ) : (
              <button className="btn-ln" onClick={handleLogout}>Logout</button>
            )}
            </div>
        )}
      </div>
    </nav>
  );
}
