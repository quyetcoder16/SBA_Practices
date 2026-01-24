import { Container, Row, Col, Image, Carousel } from "react-bootstrap";
import { BsLinkedin } from "react-icons/bs";

const mentors = [
  {
    id: 1,
    name: "Shoo Thar Mien",
    role: "Senior UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Shoo Thar Mien",
    role: "Senior UX Designer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Shoo Thar Mien",
    role: "Senior UX Designer",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    name: "Shoo Thar Mien",
    role: "Senior UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    name: "Shoo Thar Mien",
    role: "Senior UX Designer",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 6,
    name: "Shoo Thar Mien",
    role: "Senior UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

/* Chia mentor thành từng slide (4 mentor / slide) */
const chunk = (arr, size) =>
  arr.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);

const MentorFavoris = () => {
  const slides = chunk(mentors, 4);

  return (
    <section
      className="py-5"
      style={{ backgroundColor: "#dff3fb" }}
    >
      <Container>
        {/* TITLE */}
        <h2 className="fw-bold mb-5" style={{ maxWidth: 320 }}>
          Meet with our <br /> mentor.
        </h2>

        {/* CAROUSEL */}
        <Carousel indicators={false}>
          {slides.map((group, index) => (
            <Carousel.Item key={index}>
              <Row className="justify-content-center text-center gx-5">
                {group.map((mentor) => (
                  <Col
                    key={mentor.id}
                    lg={3}
                    md={4}
                    sm={6}
                    className="mb-4"
                  >
                    <div className="position-relative d-inline-block mb-3">
                      {/* AVATAR */}
                      <Image
                        src={mentor.avatar}
                        roundedCircle
                        className="shadow"
                        style={{
                          width: 140,
                          height: 140,
                          objectFit: "cover",
                          border: "6px solid white",
                        }}
                      />

                      {/* LINKEDIN */}
                      <span
                        className="position-absolute bottom-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center shadow"
                        style={{
                          width: 36,
                          height: 36,
                          transform: "translate(20%, 20%)",
                        }}
                      >
                        <BsLinkedin className="text-primary fs-5" />
                      </span>
                    </div>

                    {/* NAME */}
                    <h5 className="fw-bold mb-1">
                      {mentor.name}
                    </h5>

                    {/* ROLE */}
                    <p className="text-muted mb-0">
                      {mentor.role}
                    </p>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default MentorFavoris;
