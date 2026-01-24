import { AuthStatesContext } from "@/app/provider/AuthProvider";
import { useCartState } from "@/app/provider/CartProvider";
import React, { useContext } from "react";
import { Badge, Nav, NavDropdown } from "react-bootstrap";
import { Cart4 } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";

const PublicHeader = () => {
  const { stats } = useCartState();
  const { userContext } = useContext(AuthStatesContext);
  const navLinkCutom = ({ isActive }) => "nav-link " + (isActive ? "border-bottom border-black text-info" : " text-gray")

  return (
    <div className="container py-2">
      <nav className="navbar navbar-expand-lg bg-white">
        {/* Logo */}
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          E-learning
          <span
            className="ms-1 rounded-circle"
            style={{
              width: 6,
              height: 6,
              backgroundColor: "#6f4ef6",
              display: "inline-block",
            }}
          ></span>
        </a>

        {/* Button toggle mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item">
              <NavLink to="/" end className={navLinkCutom}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/courses" className={navLinkCutom}>
                Courses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/mentor" className={navLinkCutom}>
                Mentor
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/group" className={navLinkCutom}>
                Group
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/testimonial" className={navLinkCutom}>
                Testimonial
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/docs" className={navLinkCutom}>
                Docs
              </NavLink>
            </li>
          </ul>

          {/* Buttons */}
          <div className="d-flex align-items-center gap-3">

            {/* --- CART ICON START --- */}
            <Link to="/cart" className="position-relative text-dark me-2 d-flex align-items-center text-decoration-none">
              <Cart4 size={22} />
              {stats.count > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle border border-light"
                  style={{ fontSize: '0.65rem' }}
                >
                  {stats.count}
                </Badge>
              )}
            </Link>
            {/* --- CART ICON END --- */}

            {/* Auth Buttons Logic */}
            {!userContext ? (
              <div className="d-flex gap-2">
                <Link
                  className="btn text-white px-4"
                  style={{ backgroundColor: "#6f4ef6" }}
                  to="/login"
                >
                  Sign In
                </Link>

                <button
                  className="btn px-4"
                  style={{
                    backgroundColor: "#ede9fe",
                    color: "#6f4ef6",
                  }}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <Nav>
                <NavDropdown
                  title={
                    <span className="fw-bold text-dark">{userContext.name}</span>
                  }
                  id="nav-dropdown"
                  align="end" // Căn lề phải menu dropdown
                >
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/my-courses">My Courses</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="text-danger">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PublicHeader;
