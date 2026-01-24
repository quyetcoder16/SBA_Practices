import React, { useEffect, useState } from "react";
import PopularCategory from "../components/PopularCategory";
import HeroSection from "../components/HeroSection";
import PopularCourse from "../components/PopularCourse";

const PublicHomePage = () => {
  const [isLoading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  // Call
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    }, 2000);
  }, [])

  return (
    <>
      <HeroSection />
      <PopularCourse isLoading={isLoading} />
      <PopularCategory />
    </>
  );
};

export default PublicHomePage;
