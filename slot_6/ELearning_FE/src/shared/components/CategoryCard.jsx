import React from "react";
import { Button, Card } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";

const CategoryCard = ({ category, handleInterest }) => {
  return (
    <Card style={{ width: "100%" }} className="p-2">
      <Card.Body>
        <Card.Title>{category.categoryName}</Card.Title>
        <div className="d-flex py-2">
          <span className="bg-light">{category.availablePosition}</span>{" "}
          Available Position
        </div>
        <div className="d-flex py-2">
          <PersonFill /> {category.numberInterested} Interested
        </div>
        <Button variant="primary" className="w-100" onClick={()=>{handleInterest(category.id)}}>
          Interested
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
