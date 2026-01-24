import { Container, Row, Col, Form, InputGroup, Button, Badge } from "react-bootstrap";
import { BsSearch, BsCheckCircleFill } from "react-icons/bs";
import mahila from '@/assets/mahila.png'

const HeroSection = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="align-items-center">
          {/* LEFT CONTENT */}
          <Col lg={6} className="mb-5 mb-lg-0">
            <Badge bg="success" className="mb-3 px-3 py-2">
              ✔ Get 30% off on first enroll
            </Badge>

            <h1 className="fw-bold display-5 mb-3">
              Advance your <br />
              engineering skills with us.
            </h1>

            <p className="text-muted fs-5 mb-4">
              Build skills with our courses and mentor from world-class companies.
            </p>

            {/* SEARCH BOX */}
            <InputGroup className="mb-4 shadow-sm rounded-pill overflow-hidden">
              <Form.Control
                placeholder="Search courses..."
                className="border-0 ps-4 py-3"
              />
              <Button
                variant="primary"
                className="rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{ width: 48, height: 48 }}
              >
                <BsSearch />
              </Button>
            </InputGroup>

            {/* FEATURES */}
            <div className="d-flex gap-4">
              {["Flexible", "Learning path", "Community"].map((item) => (
                <div key={item} className="d-flex align-items-center gap-2">
                  <BsCheckCircleFill className="text-primary" />
                  <span className="fw-medium">{item}</span>
                </div>
              ))}
            </div>
          </Col>

          {/* RIGHT IMAGE */}
          <Col lg={6} className="text-center position-relative">
            <div
              className="rounded-4 p-4"
              style={{
                background: "linear-gradient(135deg, #cfe9ff, #e6dcff)",
              }}
            >
              <img
                src={mahila}
                alt="Student"
                className="img-fluid"
                style={{ maxHeight: 280 }}
              />
            </div>

            {/* FLOATING BADGES */}
            <div
              className="position-absolute bg-white shadow rounded-3 px-3 py-2"
              style={{ top: "10%", right: "10%" }}
            >
              <strong>50+</strong>
              <div className="text-muted small">Available courses</div>
            </div>

            <div
              className="position-absolute bg-white shadow rounded-3 px-3 py-2"
              style={{ bottom: "15%", right: "5%" }}
            >
              <div className="text-muted small">No of students</div>
              📊 📊 📊
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
