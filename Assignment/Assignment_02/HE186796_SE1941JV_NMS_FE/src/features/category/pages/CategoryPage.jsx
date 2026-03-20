import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BiPlus } from 'react-icons/bi';
import { categoryService } from '../services/category.service';
import CategoryModal from '../components/CategoryModal';
import CategoryTable from '../components/CategoryTable';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data || []);
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    };

    const handleSave = async (formData) => {
        try {
            await categoryService.save(formData);
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            alert(error.message || 'Save failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Deleting this category may affect linked articles. Proceed?")) {
            try {
                await categoryService.delete(id);
                loadData();
            } catch (error) {
                alert(error.message || 'Delete failed');
            }
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
                categories={categories}
            />
        </Container>
    );
};

export default CategoryPage;