import React from "react";
import { Badge, Button, Form } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

const CourseFilter = ({ filters, onFilterChange }) => {

  const handleLevel = (lvl, checked) => {
    const current = filters.level;
    const next = checked ? [...current, lvl] : current.filter((l) => l !== lvl);
    onFilterChange("level", next);
  };

  return (
    <>
      <Badge className="py-3 w-100 my-3">Filter</Badge>
      <h4 className="mt-4">Categories</h4>
      <Form style={{ fontSize: "10px !important" }}>
        <Form.Select
          onChange={(e) => onFilterChange("category", e.target.value)}
          size="lg" className="mt-3 py-2">
          <option value="All">All Categories</option>
          <option value="FE">Front End</option>
          <option value="BE">Back End</option>
        </Form.Select>

        <h4 className="mt-5">Ratings</h4>
        {[4, 3, 2, 1].map((star) => (
          <Form.Check
            key={star} type="radio" name="rating"
            checked={filters.minRating === star}
            onChange={() => onFilterChange("minRating", star)}
            label={<><span className="text-warning me-1">{star}.0+</span><StarFill className="text-warning" size={12} /></>}
            className="mb-2"
          />
        ))}

        <h4 className="mt-5">Levels</h4>

        {["Beginner", "Intermediate", "Expert"].map((lvl) => (
          <Form.Check
            key={lvl} type="checkbox" label={lvl}
            checked={filters.level.includes(lvl)}
            onChange={(e) => handleLevel(lvl, e.target.checked)}
            className="mb-2"
          />
        ))}


        <h4 className="mt-5">Prices</h4>
        <div className="d-flex">
          <span>0 ($)</span>
          <Form.Label></Form.Label>
          <Form.Range
            min={0} max={100} step={5}
            value={filters.priceRange}
            onChange={(e) => onFilterChange("priceRange", Number(e.target.value))}
          />
          <span>10000 ($)</span>
        </div>
      </Form>

      <Button variant="outline-danger" className="w-100 mt-3" onClick={() => onFilterChange("reset")}>Clear All</Button>
    </>
  )
}

export default CourseFilter