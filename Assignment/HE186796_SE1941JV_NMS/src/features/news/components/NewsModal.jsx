import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const NewsModal = ({ isOpen, onClose, onSave, editingNews, categories }) => {
    const [formData, setFormData] = useState({
        NewsTitle: '',
        Headline: '',
        NewsContent: '',
        NewsSource: '',
        CategoryID: '',
        NewsStatus: 1
    });

    useEffect(() => {
        if (editingNews) {
            setFormData(editingNews);
        } else {
            setFormData({
                NewsTitle: '',
                Headline: '',
                NewsContent: '',
                NewsSource: '',
                CategoryID: categories[0]?.CategoryID || '',
                NewsStatus: 1
            });
        }
    }, [editingNews, isOpen, categories]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal show={isOpen} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="fw-bold">
                    {formData?.id ? 'Edit News' : 'Add New News'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="p-4">
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Label className="fw-bold">News Title</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={formData.NewsTitle}
                                onChange={(e) => setFormData({ ...formData, NewsTitle: e.target.value })}
                            />
                        </Col>
                        <Col md={12} className="mb-3">
                            <Form.Label className="fw-bold">Headline (Summary)</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={formData.Headline}
                                onChange={(e) => setFormData({ ...formData, Headline: e.target.value })}
                            />
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Label className="fw-bold">Category</Form.Label>
                            <Form.Select
                                value={formData.CategoryID}
                                onChange={(e) => setFormData({ ...formData, CategoryID: parseInt(e.target.value) })}
                            >
                                {categories.map(cat => (
                                    <option key={cat.CategoryID} value={cat.CategoryID}>
                                        {cat.CategoryName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Label className="fw-bold">News Source</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={formData.NewsSource}
                                onChange={(e) => setFormData({ ...formData, NewsSource: e.target.value })}
                            />
                        </Col>
                        <Col md={12} className="mb-3">
                            <Form.Label className="fw-bold">News Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={formData.NewsContent}
                                onChange={(e) => setFormData({ ...formData, NewsContent: e.target.value })}
                            />
                        </Col>
                        <Col md={12}>
                            <Form.Check
                                type="switch"
                                label="Publish News"
                                checked={formData.NewsStatus === 1}
                                onChange={(e) => setFormData({ ...formData, NewsStatus: e.target.checked ? 1 : 0 })}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="bg-light border-0">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" type="submit">Save News</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default NewsModal;