import React, { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import {
    Container, Row, Col, Card, Button, Badge,
    Accordion, Breadcrumb, ListGroup, Image
} from 'react-bootstrap';

// Helper component hiển thị sao (Dùng Unicode để không cần thư viện icon ngoài)
const StarRating = ({ rating, students }) => {
    // Tạo mảng 5 phần tử để map
    const stars = [...Array(5)].map((_, i) => {
        const isFull = i < Math.floor(rating);
        return <span key={i} style={{ color: '#f3ca8c' }}>{isFull ? '★' : '☆'}</span>;
    });

    return (
        <div className="d-flex align-items-center mb-2">
            <span className="fw-bold text-warning me-2">{rating}</span>
            <span className="me-2">{stars}</span>
            <small className="text-decoration-underline text-info">
                ({students} học viên)
            </small>
        </div>
    );
};

export default function PublicCourseDetail() {
    // Giả sử loader trả về object detail của 1 course. 
    // Nếu loader trả về list, bạn cần find() như ví dụ trước.
    const initialData = useLoaderData();
    const [course, setCourse] = useState(initialData || {});
    useEffect(() => {
        setCourse(initialData);
    }, [initialData]);
    if (!course || !course.id) return <Container className="p-5">Loading...</Container>;

    return (
        <>
            {/* --- HERO SECTION (Background Đen đặc trưng Udemy) --- */}
            <div className="bg-dark text-white py-4 mb-4">
                <Container>
                    <Row>
                        <Col lg={8}>
                            {/* Breadcrumb tùy chỉnh màu */}


                            <h1 className="fw-bold display-6 my-3">{course.title}</h1>
                            <p className="lead fs-6">
                                Học React bài bản từ đầu đến khi deploy. Khóa học chi tiết nhất dành cho người mới bắt đầu.
                            </p>

                            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
                                <Badge bg="warning" text="dark" className="p-2">Bestseller</Badge>
                                <StarRating rating={course.rating} students={course.students} />
                            </div>

                            <div className="text-light mb-3">
                                Được tạo bởi <a href="#author" className="text-info text-decoration-underline">{course.author}</a>
                            </div>

                            <div className="d-flex gap-4 text-secondary small">
                                <span>📅 Cập nhật lần cuối: 01/2026</span>
                                <span>🌐 Tiếng Anh</span>
                            </div>
                        </Col>
                        {/* Cột bên phải để trống trên Mobile/Desktop để Sidebar đè lên sau */}
                    </Row>
                </Container>
            </div>

            {/* --- MAIN CONTENT & STICKY SIDEBAR --- */}
            <Container className="pb-5">
                <Row>
                    {/* LEFT COLUMN: NỘI DUNG */}
                    <Col lg={8}>

                        {/* What you'll learn Box */}
                        <Card className="mb-4 border-secondary shadow-sm">
                            <Card.Body>
                                <Card.Title className="fw-bold mb-3">Bạn sẽ học được gì?</Card.Title>
                                <Row>
                                    <Col md={6}>
                                        <ul className="list-unstyled">
                                            <li className="mb-2">✓ Xây dựng ứng dụng React thực tế</li>
                                            <li className="mb-2">✓ Hiểu sâu về Hooks & Context</li>
                                        </ul>
                                    </Col>
                                    <Col md={6}>
                                        <ul className="list-unstyled">
                                            <li className="mb-2">✓ Quản lý State với Redux Toolkit</li>
                                            <li className="mb-2">✓ Deploy lên Vercel/Netlify</li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        {/* Course Content - Accordion */}
                        <div className="mb-4">
                            <h3 className="fw-bold mb-3">Nội dung khóa học</h3>
                            <div className="d-flex justify-content-between text-muted mb-2 small">
                                <span>{course.classes} bài giảng • Thời lượng tổng 12h 30m</span>
                                <span className="text-primary fw-bold" style={{ cursor: 'pointer' }}>Mở rộng tất cả</span>
                            </div>

                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><strong>Phần 1: Giới thiệu về React</strong></Accordion.Header>
                                    <Accordion.Body className="p-0">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center ps-4">
                                                <span>▶ Giới thiệu khóa học</span>
                                                <span className="text-muted small">05:20</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center ps-4">
                                                <span>▶ Cài đặt môi trường</span>
                                                <span className="text-muted small">10:15</span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><strong>Phần 2: Components & Props</strong></Accordion.Header>
                                    <Accordion.Body className="p-0">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="ps-4">▶ JSX là gì?</ListGroup.Item>
                                            <ListGroup.Item className="ps-4">▶ Tái sử dụng Component</ListGroup.Item>
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>

                        {/* Requirements */}
                        <div className="mb-4">
                            <h3 className="fw-bold mb-3">Yêu cầu</h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0">🔹 Kiến thức cơ bản về HTML, CSS, JS</li>
                                <li className="list-group-item px-0">🔹 Máy tính có kết nối Internet</li>
                            </ul>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="fw-bold mb-3">Mô tả</h3>
                            <Card.Text>
                                Khóa học này được thiết kế để đưa bạn từ con số 0 trở thành Hero trong React.
                                Chúng ta sẽ cùng nhau xây dựng 5 dự án thực tế, từ To-do list đơn giản đến
                                trang E-commerce phức tạp.
                            </Card.Text>
                        </div>
                    </Col>

                    {/* RIGHT COLUMN: SIDEBAR (Sticky) */}
                    {/* position-sticky + top-0 giúp nó dính lại khi cuộn */}
                    <Col lg={4} className="position-relative">
                        <div style={{ position: 'sticky', top: '20px', zIndex: 100 }}>
                            <Card className="shadow border-0 overflow-hidden">
                                {/* Video Preview Overlay effect */}
                                <div className="position-relative bg-dark text-center">
                                    <Card.Img
                                        variant="top"
                                        src={course.image}
                                        style={{ height: '200px', objectFit: 'cover', opacity: '0.9' }}
                                    />
                                    <div
                                        className="position-absolute top-50 start-50 translate-middle text-white"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="bg-white rounded-circle p-2 d-inline-block shadow">
                                            <span style={{ fontSize: '2rem', color: 'black', lineHeight: 0.5 }}>▶</span>
                                        </div>
                                        <div className="mt-2 fw-bold text-shadow">Xem thử</div>
                                    </div>
                                </div>

                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-end mb-3">
                                        <h2 className="fw-bold mb-0 me-2">${course.price}</h2>
                                        <span className="text-muted text-decoration-line-through me-2">
                                            ${(course.price * 1.5).toFixed(0)}
                                        </span>
                                        <span className="text-danger fw-bold small">Giảm 33%</span>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <Button variant="danger" size="lg" className="fw-bold">
                                            Thêm vào giỏ hàng
                                        </Button>
                                        <Button variant="outline-dark" size="lg" className="fw-bold">
                                            Mua ngay
                                        </Button>
                                    </div>

                                    <div className="text-center text-muted small mt-3 mb-3">
                                        Đảm bảo hoàn tiền trong 30 ngày
                                    </div>

                                    <div className="fw-bold mb-2">Khóa học bao gồm:</div>
                                    <ul className="list-unstyled text-muted small">
                                        <li className="mb-2">🎥 30 giờ video theo yêu cầu</li>
                                        <li className="mb-2">📄 5 bài viết chuyên sâu</li>
                                        <li className="mb-2">📱 Truy cập trên Mobile và TV</li>
                                        <li className="mb-2">♾️ Quyền truy cập trọn đời</li>
                                        <li className="mb-2">🏆 Chứng chỉ hoàn thành</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Link to={`/courses/${parseInt(course.id) + 1}`} className="text-decoration-none">
                    next course ➡️
                </Link>
            </Container>
        </>
    );
}