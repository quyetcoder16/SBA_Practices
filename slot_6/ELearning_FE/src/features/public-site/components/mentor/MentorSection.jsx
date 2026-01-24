import MentorCard from "./MentorCard";

const mentors = [
  {
    id: 1,
    name: "Shoo Thar Mien",
    role: "Senior UX Designer",
    avatar: "https://static.topcv.vn/cms/lap-trinh-web-la-gi-topcv-264b4a834cbb0c.jpg",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Shoo Thar Mien",
    role: "Senior UX Designer",
    avatar: "https://static.topcv.vn/cms/lap-trinh-web-la-gi-topcv-264b4a834cbb0c.jpg",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Shoo Thar Mien",
    role: "Senior UX Designer",
    avatar: "https://static.topcv.vn/cms/lap-trinh-web-la-gi-topcv-264b4a834cbb0c.jpg",
    linkedin: "#",
  },
];

export default function MentorSection() {
  return (
    <section className="py-5" style={{ backgroundColor: "#b1e2f5" }}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-4 text-start">
            <h1 className="fw-semibold">
              Meet with our <br />
              <span className="fw-semibold">mentor.</span>
            </h1>
          </div>
        </div>

        <div className="row justify-content-center g-5">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="col-md-4 col-sm-6">
              <MentorCard {...mentor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
