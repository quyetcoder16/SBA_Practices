import { useCartDispatch } from '@/app/provider/CartProvider';
import React, { useState } from 'react'
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {


  const { addToCart } = useCartDispatch()

  return (
    <Card className="shadow-sm border-1 rounded-4 overflow-hidden my-3" style={{ width: "100%" }}>
      {/* Image + badge overlay */}
      <div className="position-relative">
        <Card.Img
          src={course.image}
          alt="cover"
          style={{ height: 170, objectFit: "cover" }}
        />

        <Badge
          bg="primary"
          className="position-absolute rounded-circle d-flex flex-column justify-content-center align-items-center text-center fw-bold"
          style={{
            width: 72,
            height: 72,
            right: 14,
            bottom: -18,
            lineHeight: 1.05,
          }}
        >
          BEST
          <br />
          SELLER
        </Badge>
      </div>

      <Card.Body className="p-3">
        <Card.Title className="fw-bold fs-4 mb-2">
          <Link to={`/courses/${course.id}`} className="text-decoration-none text-dark">
            {course.title}
          </Link>
        </Card.Title>



        <div className="d-flex justify-content-between align-items-end">
          <div>
            <div className="text-secondary small mb-2">{course?.author}</div>

            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-danger">{course?.rating}</span>
              {/* <Stars value={rating} /> */}
            </div>
          </div>

          <div className="fw-bold fs-4">${course?.price}</div>
        </div>

        <hr className="my-3 opacity-25" />

        <div className="d-flex justify-content-between text-secondary fw-semibold small">
          <div className="d-flex align-items-center gap-2">
            <span style={{ color: "#5b5bff" }}>📘</span>
            <span>{course?.classes} classes</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span style={{ color: "#5b5bff" }}>👥</span>
            <span>{course?.students} students</span>
          </div>

        </div>
      </Card.Body>
      <Card.Footer className="bg-white border-0 p-3">
        <Button size="sm" onClick={() => addToCart(course)}>Add to Cart</Button>
      </Card.Footer>
    </Card>
  )
}

export default CourseCard