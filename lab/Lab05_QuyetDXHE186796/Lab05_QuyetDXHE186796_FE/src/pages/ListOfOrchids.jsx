import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Image, Badge, Modal, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import orchidService from '../services/orchidService';

const ListOfOrchids = () => {
    const [orchids, setOrchids] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            orchidName: '',
            isNatural: false,
            orchidDescription: '',
            orchidCategory: '',
            isAttractive: false,
            orchidURL: ''
        }
    });

    const fetchOrchids = async () => {
        try {
            const data = await orchidService.getAll();
            if (data && Array.isArray(data)) {
                data.sort((a, b) => b.orchidID - a.orchidID);
                setOrchids(data);
            } else {
                setOrchids([]);
            }
        } catch (error) {
            console.error('Error fetching orchids:', error);
            toast.error('Failed to fetch orchids!');
        }
    };

    useEffect(() => {
        fetchOrchids();
    }, []);

    const handleDelete = async (orchidID) => {
        if (window.confirm('Are you sure you want to delete this orchid?')) {
            try {
                await orchidService.delete(orchidID);
                toast.success('Orchid deleted successfully!');
                fetchOrchids();
            } catch (error) {
                console.error('Error deleting orchid:', error);
                toast.error('Failed to delete orchid!');
            }
        }
    };

    const onSubmit = async (data) => {
        try {
            await orchidService.create(data);
            toast.success('Orchid added successfully!');
            setShowModal(false);
            reset();
            fetchOrchids();
        } catch (error) {
            console.error('Error adding orchid:', error);
            toast.error('Failed to add orchid!');
        }
    };

    const handleClose = () => {
        setShowModal(false);
        reset();
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Orchid Management</h2>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    <i className="bi bi-plus-circle me-1"></i> Add New Orchid
                </Button>
            </div>

            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="table-dark text-center">
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Attributes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center align-middle">
                    {orchids.map((orchid) => (
                        <tr key={orchid.orchidID}>
                            <td>{orchid.orchidID}</td>
                            <td>
                                <Image
                                    src={orchid.orchidURL}
                                    thumbnail
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                    alt={orchid.orchidName}
                                    className="thumbnail"
                                />
                            </td>
                            <td>
                                <strong>{orchid.orchidName}</strong>
                                <br />
                                <small className="text-muted">{orchid.orchidDescription}</small>
                            </td>
                            <td>{orchid.orchidCategory}</td>
                            <td>
                                <div className="d-flex flex-column gap-1 align-items-center">
                                    {(orchid.isNatural || orchid.natural) ? (
                                        <Badge bg="success">Natural</Badge>
                                    ) : (
                                        <Badge bg="info">Industry</Badge>
                                    )}
                                    {(orchid.isAttractive || orchid.attractive) && (
                                        <Badge bg="warning" text="dark">Attractive</Badge>
                                    )}
                                </div>
                            </td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => navigate(`/edit/${orchid.orchidID}`)}
                                >
                                    <i className="bi bi-pencil-square"></i>
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(orchid.orchidID)}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {orchids.length === 0 && (
                        <tr>
                            <td colSpan="6">No orchids found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Orchid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Orchid Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter orchid name"
                                        isInvalid={!!errors.orchidName}
                                        {...register('orchidName', { required: 'Orchid name is required' })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.orchidName?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="E.g. Phalaenopsis"
                                        {...register('orchidCategory')}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                isInvalid={!!errors.orchidURL}
                                {...register('orchidURL', {
                                    required: 'Image URL is required'
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.orchidURL?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Enter description"
                                {...register('orchidDescription')}
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        id="isNatural-checkbox"
                                        label="Is Natural Species?"
                                        {...register('isNatural')}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        id="isAttractive-checkbox"
                                        label="Is Attractive?"
                                        {...register('isAttractive')}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end gap-2 border-top pt-3">
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Create Orchid
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ListOfOrchids;
