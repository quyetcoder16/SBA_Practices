import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { BiSearch, BiPlus } from 'react-icons/bi';
import { newsService } from '../services/news.service';
import { categoryService } from '@/features/category/services/category.service';
import NewsTable from '../components/NewsTable';
import NewsModal from '../components/NewsModal';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [newsData, catData] = await Promise.all([
                    newsService.getAll(),
                    categoryService.getAll()
                ]);
                setNews(newsData || []);
                setCategories(catData || []);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        };
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [newsData, catData] = await Promise.all([
                newsService.getAll(),
                categoryService.getAll()
            ]);
            setNews(newsData || []);
            setCategories(catData || []);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
    };

    const handleSearch = async () => {
        const data = await newsService.search(searchTerm);
        setNews(data);
    };

    const handleSave = async (formData) => {
        await newsService.save(formData);
        setIsModalOpen(false);
        loadData();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await newsService.delete(id);
            loadData();
        }
    };

    return (
        <Container fluid className="p-4 bg-light min-vh-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-dark">News</h2>

                </div>
                <Button
                    variant="primary"
                    className="d-flex align-items-center gap-2 px-4 shadow-sm"
                    onClick={() => { setEditingNews(null); setIsModalOpen(true); }}
                >
                    <BiPlus size={20} /> Add News
                </Button>
            </div>

            <Row className="mb-4">
                <Col md={5}>
                    <InputGroup className="shadow-sm">
                        <InputGroup.Text className="bg-white border-end-0 text-muted">
                            <BiSearch size={20} />
                        </InputGroup.Text>
                        <Form.Control
                            className="border-start-0 ps-0 py-2"
                            placeholder="Search News ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button variant="outline-primary" onClick={handleSearch}>Search</Button>
                    </InputGroup>
                </Col>
            </Row>

            <NewsTable
                data={news}
                categories={categories}
                onEdit={(item) => { setEditingNews(item); setIsModalOpen(true); }}
                onDelete={handleDelete}
            />

            <NewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingNews={editingNews}
                categories={categories}
            />
        </Container>
    );
};

export default NewsPage;