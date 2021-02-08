import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const navbarRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    // console.log(linksHeight);
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
      navbarRef.current.style.borderBottom = `none`;
    } else {
      linksContainerRef.current.style.height = "0px";
      navbarRef.current.style.borderBottom = `2px solid var(--primaryColor)`;
    }
  }, [showLinks]);

  const checkSize = () => {
    // console.log(window.innerWidth);
    if (window.innerWidth > 799) {
      setShowLinks(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="cocktail db logo" className="logo"></img>
        </Link>
        <button className="nav-toggle" onClick={() => setShowLinks(!showLinks)}>
          <FaBars />
        </button>
      </div>
      <div
        className={
          showLinks ? "nav-links-container nav-expand" : "nav-links-container"
        }
        ref={linksContainerRef}
      >
        <ul className="nav-links" ref={linksRef}>
          <li>
            <Link to="/" onClick={() => setShowLinks(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setShowLinks(false)}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
