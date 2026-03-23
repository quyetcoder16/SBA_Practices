import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CategoryModal = ({ isOpen, onClose, onSave, editingCategory, categories = [] }) => {
    const [formData, setFormData] = useState({
        categoryName: '',
        categoryDesciption: '',
        parentCategoryId: '',
        isActive: true
    });

    useEffect(() => {
        if (editingCategory) {
            setFormData({
                ...editingCategory,
                parentCategoryId: editingCategory.parentCategoryId || '',
            });
        } else {
            setFormData({ categoryName: '', categoryDesciption: '', parentCategoryId: '', isActive: true });
        }
    }, [editingCategory, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            parentCategoryId: formData.parentCategoryId ? parseInt(formData.parentCategoryId) : null,
        };
        onSave(payload);
    };


    const parentOptions = categories.filter(c => c.categoryId !== formData.categoryId);

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="fw-bold">
                    {formData?.categoryId ? 'Edit Category' : 'Add New Category'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="p-4">
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Category Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category name"
                            value={formData.categoryName || ''}
                            onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Brief description..."
                            value={formData.categoryDesciption || ''}
                            onChange={(e) => setFormData({ ...formData, categoryDesciption: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Parent Category</Form.Label>
                        <Form.Select
                            value={formData.parentCategoryId || ''}
                            onChange={(e) => setFormData({ ...formData, parentCategoryId: e.target.value })}
                        >
                            <option value="">-- None (Top Level) --</option>
                            {parentOptions.map(cat => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Check
                        type="switch"
                        id="isActiveSwitch"
                        label="Active Category"
                        checked={formData.isActive === true}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
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