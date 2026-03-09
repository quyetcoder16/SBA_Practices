import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import orchidService from '../services/orchidService';

const EditOrchid = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            orchidID: 0,
            orchidName: '',
            isNatural: false,
            orchidDescription: '',
            orchidCategory: '',
            isAttractive: false,
            orchidURL: ''
        }
    });

    useEffect(() => {
        const fetchOrchid = async () => {
            try {
                const orchid = await orchidService.getById(id);

                if (orchid) {
                    Object.keys(orchid).forEach(key => {
                        if (key === 'isNatural' || key === 'natural') {
                            setValue('isNatural', !!orchid[key]);
                        } else if (key === 'isAttractive' || key === 'attractive') {
                            setValue('isAttractive', !!orchid[key]);
                        } else {
                            setValue(key, orchid[key]);
                        }
                    });
                    setLoading(false);
                } else {
                    toast.error('Orchid not found');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching orchid details:', error);
                toast.error('Failed to load orchid details');
                navigate('/');
            }
        };

        fetchOrchid();
    }, [id, setValue, navigate]);

    const onSubmit = async (data) => {
        try {
            await orchidService.update(id, data);
            toast.success('Orchid updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating orchid:', error);
            toast.error('Failed to update orchid!');
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading orchid details...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4 mb-5 pb-5">
            <Card className="shadow-lg border-0">
                <Card.Header className="bg-primary text-white py-3">
                    <h3 className="mb-0 text-center">Update Orchid (ID: {id})</h3>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md={7}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Orchid Name</Form.Label>
                                    <Controller
                                        name="orchidName"
                                        control={control}
                                        rules={{ required: 'Orchid name is required' }}
                                        render={({ field }) => (
                                            <Form.Control
                                                {...field}
                                                type="text"
                                                placeholder="Enter orchid name"
                                                isInvalid={!!errors.orchidName}
                                            />
                                        )}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.orchidName?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Controller
                                        name="orchidCategory"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Control
                                                {...field}
                                                type="text"
                                                placeholder="Enter category"
                                            />
                                        )}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Image URL</Form.Label>
                                    <Controller
                                        name="orchidURL"
                                        control={control}
                                        rules={{
                                            required: 'Image URL is required'
                                        }}
                                        render={({ field }) => (
                                            <Form.Control
                                                {...field}
                                                type="text"
                                                placeholder="https://example.com/image.jpg"
                                                isInvalid={!!errors.orchidURL}
                                            />
                                        )}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.orchidURL?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={5}>
                                <div className="p-3 border rounded h-100 bg-light text-center">
                                    <Form.Label className="fw-bold mb-3 d-block">Preview Image</Form.Label>
                                    <Controller
                                        name="orchidURL"
                                        control={control}
                                        render={({ field }) => (
                                            <img
                                                src={field.value || 'https://via.placeholder.com/200'}
                                                alt="Preview"
                                                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=Invalid+Image'; }}
                                            />
                                        )}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3 mt-3">
                            <Form.Label>Description</Form.Label>
                            <Controller
                                name="orchidDescription"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        {...field}
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter orchid description"
                                    />
                                )}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center gap-4 py-3 bg-light rounded mb-4">
                            <Controller
                                name="isNatural"
                                control={control}
                                render={({ field: { value, onChange, ...rest } }) => (
                                    <Form.Check
                                        {...rest}
                                        type="switch"
                                        id="switch-isNatural"
                                        label="Natural Species"
                                        checked={value}
                                        onChange={(e) => onChange(e.target.checked)}
                                    />
                                )}
                            />
                            <Controller
                                name="isAttractive"
                                control={control}
                                render={({ field: { value, onChange, ...rest } }) => (
                                    <Form.Check
                                        {...rest}
                                        type="switch"
                                        id="switch-isAttractive"
                                        label="Attractive Orchid"
                                        checked={value}
                                        onChange={(e) => onChange(e.target.checked)}
                                    />
                                )}
                            />
                        </div>

                        <div className="d-flex gap-2 justify-content-center border-top pt-4">
                            <Button variant="secondary" size="lg" onClick={() => navigate('/')}>
                                Cancel
                            </Button>
                            <Button variant="primary" size="lg" type="submit">
                                Update Orchid
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditOrchid;
