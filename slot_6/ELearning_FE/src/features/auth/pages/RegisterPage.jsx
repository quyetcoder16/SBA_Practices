import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, Google, Facebook } from "react-bootstrap-icons";
import { auth } from "../services/auth.service";


const RegisterPage = () => {
    const navigate = useNavigate();

    // State quản lý form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // State quản lý UI
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Xóa lỗi khi người dùng gõ lại
    };

    // Xử lý Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validate phía Client
        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu nhập lại không khớp!");
            return;
        }
        if (formData.password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        const promise = auth.register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        });

        promise.then(async (response) => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Đăng ký thất bại. Vui lòng thử lại.");
            }
            // Đăng ký thành công
            navigate("/login", { replace: true });
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        });
        setLoading(true);

    };

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={5}>
                        <Card className="shadow-sm border-0 rounded-4">
                            <Card.Body className="p-5">
                                {/* Logo & Header */}
                                <div className="text-center mb-4">
                                    <h3 className="fw-bold text-dark">Tạo tài khoản mới</h3>
                                    <p className="text-muted">Tham gia cộng đồng E-learning ngay hôm nay</p>
                                </div>

                                {/* Thông báo lỗi */}
                                {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

                                <Form onSubmit={handleSubmit}>
                                    {/* Full Name */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold small">Họ và tên</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Ví dụ: Nguyễn Văn A"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="py-2 bg-light border-0"
                                        />
                                    </Form.Group>

                                    {/* Email */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold small">Địa chỉ Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="py-2 bg-light border-0"
                                        />
                                    </Form.Group>

                                    {/* Password */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold small">Mật khẩu</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="••••••••"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="py-2 bg-light border-0 pe-5"
                                            />
                                            <span
                                                className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer text-muted"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeSlash /> : <Eye />}
                                            </span>
                                        </div>
                                    </Form.Group>

                                    {/* Confirm Password */}
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold small">Nhập lại mật khẩu</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="••••••••"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="py-2 bg-light border-0"
                                        />
                                    </Form.Group>

                                    {/* Submit Button */}
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100 py-2 fw-bold mb-3"
                                        style={{ backgroundColor: "#6f4ef6", borderColor: "#6f4ef6" }}
                                        disabled={loading}
                                    >
                                        {loading ? <Spinner as="span" animation="border" size="sm" /> : "Đăng ký tài khoản"}
                                    </Button>

                                    {/* Divider */}
                                    <div className="d-flex align-items-center mb-3">
                                        <hr className="flex-grow-1" />
                                        <span className="mx-2 text-muted small">hoặc đăng ký với</span>
                                        <hr className="flex-grow-1" />
                                    </div>

                                    {/* Social Login */}
                                    <div className="d-flex gap-2 mb-4">
                                        <Button variant="outline-secondary" className="w-50 d-flex align-items-center justify-content-center gap-2">
                                            <Google /> Google
                                        </Button>
                                        <Button variant="outline-secondary" className="w-50 d-flex align-items-center justify-content-center gap-2">
                                            <Facebook /> Facebook
                                        </Button>
                                    </div>

                                    {/* Footer */}
                                    <div className="text-center small">
                                        Đã có tài khoản?{" "}
                                        <Link to="/login" className="fw-bold text-decoration-none" style={{ color: "#6f4ef6" }}>
                                            Đăng nhập ngay
                                        </Link>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegisterPage;