import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

export default function UserModal({ isOpen, onClose, onSave, editingUser }) {

    const [formData, setFormData] = useState({
        accountName: '',
        accountEmail: '',
        accountRole: 2,
        accountPassword: ''
    })

    useEffect(() => {
        if (editingUser) {
            setFormData({
                ...editingUser,
                accountPassword: editingUser.accountPassword || ''
            });
        }
        else {
            setFormData({ accountName: '', accountEmail: '', accountRole: 2, accountPassword: '' });
        }
    }, [editingUser, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="fw-bold">
                    {formData?.accountId ? 'Edit User' : 'Add New User'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="p-4">
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Display Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter display name"
                            value={formData.accountName || ''}
                            onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={formData.accountEmail || ''}
                            onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })}
                            required
                        />
                    </Form.Group>

                    {!formData?.accountId && (
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={formData.accountPassword || ''}
                                onChange={(e) => setFormData({ ...formData, accountPassword: e.target.value })}
                                required
                            />
                        </Form.Group>
                    )}

                    <Form.Group>
                        <Form.Label className="fw-semibold">Role</Form.Label>
                        <Form.Select
                            value={formData.accountRole}
                            onChange={(e) => setFormData({ ...formData, accountRole: parseInt(e.target.value) })}
                        >
                            <option value={1}>Admin</option>
                            <option value={2}>Staff</option>
                        </Form.Select>
                    </Form.Group>
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
    )
}
