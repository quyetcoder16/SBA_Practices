import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CategoryModal = ({ isOpen, onClose, onSave, editingCategory }) => {
    const [formData, setFormData] = useState({ CategoryName: '', CategoryDescription: '', IsActive: 1 });

    useEffect(() => {
        if (editingCategory) setFormData(editingCategory);
        else setFormData({ CategoryName: '', CategoryDescription: '', IsActive: 1 });
    }, [editingCategory, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="fw-bold">
                    {editingCategory?.id ? 'Edit Category' : 'Add New Category'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="p-4">
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Category Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category name"
                            value={formData.CategoryName}
                            onChange={(e) => setFormData({ ...formData, CategoryName: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Brief description..."
                            value={formData.CategoryDescription}
                            onChange={(e) => setFormData({ ...formData, CategoryDescription: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Check
                        type="switch"
                        id="isActiveSwitch"
                        label="Active Category"
                        checked={formData.IsActive === 1}
                        onChange={(e) => setFormData({ ...formData, IsActive: e.target.checked ? 1 : 0 })}
                    />
                </Modal.Body>
                <Modal.Footer className="bg-light border-0">
                    <Button variant="secondary" className="px-4" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" className="px-4">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CategoryModal;