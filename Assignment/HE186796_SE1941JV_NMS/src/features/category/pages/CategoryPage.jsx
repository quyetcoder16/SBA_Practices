import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { BiSearch, BiPlus } from 'react-icons/bi';
import { categoryService } from '../services/category.service';
import CategoryModal from '../components/CategoryModal';
import CategoryTable from '../components/CategoryTable';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const data = await categoryService.getAll();
            setCategories(data);
        };
        loadData();
    }, []);

    const loadData = async () => {
        const data = await categoryService.getAll();
        setCategories(data);
    };

    const onSearch = async () => {
        const data = await categoryService.search(searchTerm);
        setCategories(data);
    };

    const handleKeyDown = (e) => { if (e.key === 'Enter') onSearch(); };

    const handleSave = async (formData) => {
        await categoryService.save(formData);
        setIsModalOpen(false);
        loadData();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Deleting this category may affect linked articles. Proceed?")) {
            await categoryService.delete(id);
            loadData();
        }
    };

    return (
        <Container fluid className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Categories</h2>
                <Button
                    variant="primary"
                    className="d-flex align-items-center gap-2"
                    onClick={() => { setCurrentCategory(null); setIsModalOpen(true); }}
                >
                    <BiPlus size={20} /> New Category
                </Button>
            </div>


            <Row className="mb-4">
                <Col md={5}>
                    <InputGroup className="shadow-sm">
                        <InputGroup.Text className="bg-white border-end-0">
                            <BiSearch className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                            className="border-start-0 ps-0"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button variant="outline-secondary" onClick={onSearch}>
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <CategoryTable
                data={categories}
                onEdit={(item) => {
                    setCurrentCategory(item);
                    setIsModalOpen(true);
                }}
                onDelete={handleDelete}
            />

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingCategory={currentCategory}
            />
        </Container>
    );
};

export default CategoryPage;