import React from "react";
import CourseCard from "@/shared/components/CourseCard";
import Carousel from "react-bootstrap/Carousel";
import { Col, Container, Row } from "react-bootstrap";
import withLoading from "@/shared/hoc/withLoading";


const PopularCourseSection = () => {

  // Call API

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xl={9}>
             <h3>Popular Courses</h3>
          <Carousel
            indicators={false}
            controls
            interval={null}
            className="py-4"
          >
            <Carousel.Item>
              <Row>
                <Col md={4}>
                  <CourseCard />
                </Col>
                <Col md={4}>
                  <CourseCard />
                </Col>
                <Col md={4}>
                  <CourseCard />
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};


export default withLoading(PopularCourseSection);
