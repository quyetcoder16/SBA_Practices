import { useCart } from "@/app/provider/CartProvider";
import React from "react";
import { Container, Row, Col, Table, Button, Image, Card } from "react-bootstrap";
import { Trash, Plus, Dash, ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const CartPage = () => {
    const { items, stats, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();

    if (items.length === 0) return (
        <Container className="py-5 text-center">
            <h2 className="text-muted mb-4">Your cart is empty 🛒</h2>
            <Link to="/courses" className="btn btn-primary">Go Shopping</Link>
        </Container>
    );

    return (
        <Container className="py-5">
            <h2 className="mb-4">Shopping Cart</h2>
            <Row>
                <Col lg={8}>
                    <Table hover className="align-middle bg-white shadow-sm rounded">
                        <thead className="bg-light">
                            <tr><th>Course</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="d-flex align-items-center gap-3">
                                            <Image src={item.image} rounded style={{ width: 60, height: 45, objectFit: "cover" }} />
                                            <div><div className="fw-bold">{item.title}</div><small className="text-muted">{item.category}</small></div>
                                        </div>
                                    </td>
                                    <td>${item.price}</td>
                                    <td>
                                        <div className="d-flex border rounded d-inline-flex">
                                            <Button variant="link" size="sm" onClick={() => decreaseQty(item.id)}><Dash /></Button>
                                            <span className="mx-2 fw-bold my-auto">{item.quantity}</span>
                                            <Button variant="link" size="sm" onClick={() => increaseQty(item.id)}><Plus /></Button>
                                        </div>
                                    </td>
                                    <td className="fw-bold text-primary">${item.price * item.quantity}</td>
                                    <td><Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}><Trash /></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between mt-3">
                        <Link to="/courses" className="btn btn-outline-secondary"><ArrowLeft className="me-2" /> Continue Shopping</Link>
                        <Button variant="outline-danger" onClick={clearCart}>Clear Cart</Button>
                    </div>
                </Col>
                <Col lg={4}>
                    <Card className="shadow-sm border-0 bg-white">
                        <Card.Body className="p-4">
                            <h4 className="card-title mb-4">Summary</h4>
                            <div className="d-flex justify-content-between mb-2"><span>Subtotal:</span><span>${stats.total}</span></div>
                            <div className="d-flex justify-content-between mb-3"><span>Tax (10%):</span><span>${(stats.total * 0.1).toFixed(2)}</span></div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4 fs-4 fw-bold text-success"><span>Total:</span><span>${(stats.total * 1.1).toFixed(2)}</span></div>
                            <Button variant="primary" size="lg" className="w-100">Checkout</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default CartPage;