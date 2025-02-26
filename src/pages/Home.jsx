import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="dhiwise-navigation">
      <h1>Homepage</h1>
      <p className="headline">
        This project was generated By{" "}
        <a href="https://www.dhiwise.com">Dhiwise</a>. Quickly use below links
        to navigate through all pages.
      </p>
      <ul>
        <li>
          <Link to="/">LoginPageLight</Link>
        </li>
        <li>
          <Link to="/familyhomelight">FamilyHomeLight</Link>
        </li>
        <li>
          <Link to="/light">Light</Link>
        </li>
        <li>
          <Link to="/frontpagelight">FrontpageLight</Link>
        </li>
        <li>
          <Link to="/signuppagelight">SignupPageLight</Link>
        </li>
        <li>
          <Link to="/silverclublight">SilverclubLight</Link>
        </li>
        <li>
          <Link to ="/Chartlight">ChartLight</Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
