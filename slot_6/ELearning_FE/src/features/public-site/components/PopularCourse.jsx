import {
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Badge,
} from "react-bootstrap";
import {
  BsStarFill,
  BsBook,
  BsPeople,
} from "react-icons/bs";

const courses = [
  {
    id: 1,
    title: "Design banner with Figma",
    author: "Colt stelle",
    price: 20,
    rating: 5,
    classes: 12,
    students: 120,
    image: "https://images.pexels.com/photos/267586/pexels-photo-267586.jpeg",
  },
  {
    id: 2,
    title: "We Launch Delia Webflow this Week!",
    author: "Colt stelle",
    price: 20,
    rating: 5,
    classes: 12,
    students: 150,
    image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg",
  },
  {
    id: 3,
    title: "We Launch Delia Webflow this Week!",
    author: "Colt stelle",
    price: 20,
    rating: 5,
    classes: 12,
    students: 150,
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
  },
  {
    id: 4,
    title: "Advanced UI UX Design",
    author: "Colt stelle",
    price: 25,
    rating: 5,
    classes: 14,
    students: 180,
    image: "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg",
  },
];

const chunk = (arr, size) =>
  arr.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);

const PopularCourse = () => {
  const slides = chunk(courses, 3);

  return (
    <section className="py-5">
      <Container>
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Popular courses.</h2>
          <a href="#" className="text-primary fw-medium text-decoration-none">
            Explore courses →
          </a>
        </div>

        {/* CAROUSEL */}
        <Carousel indicators={false}>
          {slides.map((group, index) => (
            <Carousel.Item key={index}>
              <Row className="g-4">
                {group.map((course) => (
                  <Col lg={4} md={6} key={course.id}>
                    <Card className="border-0 shadow-sm rounded-4 h-100">
                      {/* IMAGE */}
                      <div className="position-relative">
                        <Card.Img
                          variant="top"
                          src={course.image}
                          className="rounded-top-4"
                          style={{ height: 220, objectFit: "cover" }}
                        />
                        <Badge
                          bg="primary"
                          className="position-absolute top-100 start-50 translate-middle rounded-circle px-3 py-2"
                        >
                          BEST
                          <br />
                          SELLER
                        </Badge>
                      </div>

                      {/* BODY */}
                      <Card.Body className="pt-4">
                        <Card.Title className="fw-bold fs-5 mb-2">
                          {course.title}
                        </Card.Title>

                        <p className="text-muted mb-3">{course.author}</p>

                        {/* RATING + PRICE */}
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <span className="text-danger fw-bold">
                              {course.rating}
                            </span>
                            {[...Array(5)].map((_, i) => (
                              <BsStarFill key={i} className="text-warning" />
                            ))}
                          </div>
                          <span className="fw-bold fs-5">
                            ${course.price}
                          </span>
                        </div>

                        <hr />

                        {/* FOOTER */}
                        <div className="d-flex justify-content-between text-muted">
                          <div className="d-flex align-items-center gap-2">
                            <BsBook />
                            <span>{course.classes} classes</span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <BsPeople />
                            <span>{course.students} students</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
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

export default PopularCourse;
