export default function MentorCard({ name, role, avatar, linkedin }) {
  return (
    <div className="text-center">
      <div className="position-relative d-inline-block mb-3">
        <img
          src={avatar}
          alt={name}
          className="rounded-circle border border-4 border-white"
          width="140"
          height="140"
        />

        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          className="
            position-absolute bottom-0 end-0 translate-middle
            bg-white rounded-circle
            d-flex align-items-center justify-content-center
            shadow
          "
          style={{ width: 32, height: 32, color: "#0a66c2", fontWeight: "bold" }}
        >
          in
        </a>
      </div>

      <h5 className="fw-semibold mb-1">{name}</h5>
      <p className="text-muted small">{role}</p>
    </div>
  );
}
