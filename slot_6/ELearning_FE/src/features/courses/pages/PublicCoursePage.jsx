import React, { useEffect, useMemo, useState } from "react";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import CourseFilter from "../components/CourseFilter";
import CourseList from "../components/CourseList";
import { useLoaderData, useSearchParams } from "react-router-dom";
import courseService from "../services/course.service";

const PublicCoursePage = () => {
  // const courses = useLoaderData();
  const [courses, setCourses] = useState(useLoaderData());
  const [searchParams, setSearchParams] = useSearchParams();



  const filters = useMemo(() => ({
    category: searchParams.get("category") || "All",
    minRating: Number(searchParams.get("minRating")) || 0,
    priceRange: Number(searchParams.get("priceRange")) || 100,
    level: searchParams.getAll("level"),
  }), [searchParams]);

  const handleFilterChange = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (key === "reset") return new URLSearchParams();

      if (key === "level") {
        next.delete("level");
        value.forEach((v) => next.append("level", v));
      } else {
        if (value === "All" || value === 0 || (key === "priceRange" && value === 100))
          next.delete(key);
        else
          next.set(key, value);
      }
      return next;
    });
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const apiParams = new URLSearchParams();
        if (filters.category !== "All") apiParams.append("category", filters.category);
        if (filters.minRating > 0) apiParams.append("rating_gte", filters.minRating);
        apiParams.append("price_lte", filters.priceRange);
        filters.level.forEach(l => apiParams.append("level", l));

        const data = await courseService.findAll(apiParams);
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    };

    const timeout = setTimeout(fetchApi, 300);
    return () => clearTimeout(timeout);
  }, [filters]);


  return (
    <section className="bg-light p-4 my-5">
      <Container>
        <Row className="">
          <Col md={3} xl={4} className="bg-white p-4 rounded-3">
            <CourseFilter filters={filters} onFilterChange={handleFilterChange} />
          </Col>
          <Col md={9} xl={8} className="bg-white">
            <CourseList courses={courses} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PublicCoursePage;
