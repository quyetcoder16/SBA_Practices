import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const PublicFooter = () => {
  return (
    <footer className="bg-white pt-5 border-top">
      <Container>
        <Row className="mb-4">
          {/* Logo & Social */}
          <Col md={4} className="mb-4">
            <h4 className="fw-bold">
              E-learning <span className="text-primary">●</span>
            </h4>
            <div className="d-flex gap-3 mt-3 text-dark">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
            </div>
          </Col>

          {/* Links */}
          <Col md={2} className="mb-4">
            <h6 className="fw-bold mb-3">Links</h6>
            <ul className="list-unstyled text-muted">
              <li>Home</li>
              <li>Courses</li>
              <li>Mentor</li>
              <li>Group</li>
              <li>Testimonial</li>
              <li>Docs</li>
            </ul>
          </Col>

          {/* Other */}
          <Col md={2} className="mb-4">
            <h6 className="fw-bold mb-3">Other</h6>
            <ul className="list-unstyled text-muted">
              <li>About Us</li>
              <li>Our Team</li>
              <li>Career</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={4} className="mb-4">
            <ul className="list-unstyled text-muted">
              <li className="d-flex align-items-start mb-3">
                <FaMapMarkerAlt className="me-2 mt-1 text-primary" />
                Hola Park
              </li>
              <li className="d-flex align-items-center mb-3">
                <FaPhoneAlt className="me-2 text-primary" />
                +84 988 888 888
              </li>
              <li className="d-flex align-items-center">
                <FaEnvelope className="me-2 text-primary" />
                info@gmail.com
              </li>
            </ul>
          </Col>
        </Row>

        {/* Bottom */}
        <Row className="border-top pt-3 text-muted small align-items-center">
          <Col md={4}>
            ©2025 Agency. All Rights Reserved by Training Team
          </Col>
          <Col md={4} className="text-center">
            Privacy policy &nbsp; | &nbsp; Terms & conditions
          </Col>
          <Col md={4} className="text-end">
            Distributed by Training Team
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default PublicFooter;
