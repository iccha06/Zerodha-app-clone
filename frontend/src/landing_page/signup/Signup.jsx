import React from "react";

function Signup() {
  const handleSignup = () => {
    // Dashboard URL (development)
    window.location.href = `${import.meta.env.VITE_DASHBOARD_URL}/`;
  };

  return (
    <div
      className="container text-center"
      style={{ minHeight: "70vh", paddingTop: "100px" }}
    >
      <h1>Create Your Zerodha Account</h1>

      <p className="text-muted mt-3">
        Open your account and start investing in stocks with Saroga.
      </p>

      <button
        className="btn btn-primary btn-lg mt-4"
        onClick={handleSignup}
      >
        Continue to Signup
      </button>
    </div>
  );
}

export default Signup;