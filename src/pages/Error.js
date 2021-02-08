import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>this page does not exist!</h1>
        <Link to="/" className="btn btn-primary">
          go back
        </Link>
      </div>
    </section>
  );
};

export default Error;
