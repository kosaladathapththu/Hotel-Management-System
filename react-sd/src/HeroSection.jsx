import React from "react";
import { useNavigate } from "react-router-dom"; // 🌐 For navigation
import heroImage from "./assets/hero.jpg"; // 🖼️ Hero background image

const HeroSection = () => {
  const navigate = useNavigate(); // 🔁 initialize navigation

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="hero-overlay">
        <h1>Altura Grand</h1>
        <h2>Elegance Comfort Escape</h2>
        <p>Stay in Style. Rest in Luxury.</p>

        <div>
          <button id="signInBtn" onClick={() => navigate("/login")}>
            Sign In
          </button>

          <button onClick={() => navigate("/register")}>
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
