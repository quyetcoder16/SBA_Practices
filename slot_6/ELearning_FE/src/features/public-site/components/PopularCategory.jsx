import CategoryCard from "@/shared/components/CategoryCard";
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const PopularCategory = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      categoryName: "Design & Creative",
      availablePosition: 10,
      numberInterested: 50,
    },
    {
      id: 2,
      categoryName: "Web Developement",
      availablePosition: 60,
      numberInterested: 50,
    },
    {
      id: 3,
      categoryName: "Marketing",
      availablePosition: 8,
      numberInterested: 150,
    },
    {
      id: 4,
      categoryName: "UI/UX",
      availablePosition: 9,
      numberInterested: 200,
    },
    {
      id: 5,
      categoryName: "Administration",
      availablePosition: 11,
      numberInterested: 90,
    },
    {
      id: 6,
      categoryName: "Telemarketing",
      availablePosition: 12,
      numberInterested: 100,
    },
    {
      id: 7,
      categoryName: "Engineering",
      availablePosition: 16,
      numberInterested: 190,
    },
  ]);

  const [searchCategories, setSearchCategories] = useState(categories);

  // Call API
  const search = (keyword) => {

    if (!keyword?.trim()) {
      setSearchCategories(categories);
    } else {
      const searchResult = categories.filter((item) =>
        item.categoryName.toLowerCase().includes(keyword?.trim().toLowerCase())
      );
      setSearchCategories(searchResult);
    }
  };

  const handleInterest = (id) => {
    const updatedCategories = categories.map((item)=> {
        if(item.id === id) return {...item, numberInterested: item.numberInterested + 1};

        return item;
    });

    setSearchCategories(updatedCategories);
    setCategories(updatedCategories);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <h1>Popular Categories</h1>
          <Form.Control
            className="my-3"
            type="search"
            id="keyword"
            onChange={(e) => {
              search(e.target.value);
            }}
            placeholder="Search job title, skill or category"
            aria-describedby="passwordHelpBlock"
          />
          <Row>
            {searchCategories.map((category) => (
              <Col key={category.id} md={3} className="mb-3">
                <CategoryCard category={category} handleInterest = {handleInterest} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PopularCategory;
