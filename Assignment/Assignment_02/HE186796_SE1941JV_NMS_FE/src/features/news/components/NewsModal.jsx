import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const NewsModal = ({ isOpen, onClose, onSave, editingNews, categories = [], tags = [] }) => {
    const [formData, setFormData] = useState({
        newsTitle: '',
        headline: '',
        newsContent: '',
        newsSource: '',
        categoryId: '',
        tagIds: [],
        newsStatus: true
    });

    useEffect(() => {
        if (editingNews) {
            setFormData({
                newsArticleId: editingNews.newsArticleId,
                newsTitle: editingNews.newsTitle || '',
                headline: editingNews.headline || '',
                newsContent: editingNews.newsContent || '',
                newsSource: editingNews.newsSource || '',
                categoryId: editingNews.categoryId || '',
                tagIds: editingNews.tags ? editingNews.tags.map(t => t.tagId) : [],
                newsStatus: editingNews.newsStatus ?? true,
            });
        } else {
            setFormData({
                newsTitle: '',
                headline: '',
                newsContent: '',
                newsSource: '',
                categoryId: categories[0]?.categoryId || '',
                tagIds: [],
                newsStatus: true
            });
        }
    }, [editingNews, isOpen, categories]);

    const handleTagToggle = (tagId) => {
        setFormData(prev => ({
            ...prev,
            tagIds: prev.tagIds.includes(tagId)
                ? prev.tagIds.filter(id => id !== tagId)
                : [...prev.tagIds, tagId]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
        };
        onSave(payload);
    };

    return (
        <Modal show={isOpen} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="fw-bold">
                    {formData?.newsArticleId ? 'Edit News Article' : 'Add New News Article'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="p-4">
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Label className="fw-bold">News Title <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={formData.newsTitle || ''}
                                onChange={(e) => setFormData({ ...formData, newsTitle: e.target.value })}
                            />
                        </Col>
                        <Col md={12} className="mb-3">
                            <Form.Label className="fw-bold">Headline (Summary) <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={formData.headline || ''}
                                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                            />
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Label className="fw-bold">Category</Form.Label>
                            <Form.Select
                                value={formData.categoryId || ''}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.categoryId} value={cat.categoryId}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Label className="fw-bold">News Source</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.newsSource || ''}
                                onChange={(e) => setFormData({ ...formData, newsSource: e.target.value })}
                            />
                        </Col>
                        <Col md={12} className="mb-3">
                            <Form.Label className="fw-bold">News Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={formData.newsContent || ''}
                                onChange={(e) => setFormData({ ...formData, newsContent: e.target.value })}
                            />
                        </Col>

                        {tags.length > 0 && (
                            <Col md={12} className="mb-3">
                                <Form.Label className="fw-bold">Tags</Form.Label>
                                <div className="d-flex flex-wrap gap-2">
                                    {tags.map(tag => (
                                        <Form.Check
                                            key={tag.tagId}
                                            type="checkbox"
                                            id={`tag-${tag.tagId}`}
                                            label={tag.tagName}
                                            checked={formData.tagIds.includes(tag.tagId)}
                                            onChange={() => handleTagToggle(tag.tagId)}
                                            className="me-3"
                                        />
                                    ))}
                                </div>
                            </Col>
                        )}

                        <Col md={12}>
                            <Form.Check
                                type="switch"
                                label="Publish News"
                                checked={formData.newsStatus === true}
                                onChange={(e) => setFormData({ ...formData, newsStatus: e.target.checked })}
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