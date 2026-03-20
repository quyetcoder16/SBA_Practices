import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BiPlus } from 'react-icons/bi';
import { newsService } from '../services/news.service';
import { categoryService } from '@/features/category/services/category.service';
import NewsTable from '../components/NewsTable';
import NewsModal from '../components/NewsModal';
import axiosClient from '@/shared/services/axiosClient';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("NewsPage component mounted");
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {

            const [catData, tagRes] = await Promise.allSettled([
                categoryService.getAll(),
                axiosClient.get(API_ENDPOINTS.TAG)
            ]);

            if (catData.status === 'fulfilled') setCategories(catData.value || []);
            if (tagRes.status === 'fulfilled') setTags(tagRes.value.data.result || []);


            try {

                console.log("Calling newsService.getAll()...");
                const newsData = await newsService.getAll();
                console.log("News Data received:", newsData);
                setNews(newsData || []);
            } catch (newsErr) {
                console.error("Failed to load news specifically:", newsErr);
                alert("Failed to load news articles. Check console.");
            }

        } catch (error) {
            console.error("General error loading page data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (formData) => {
        try {
            await newsService.save(formData);
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            alert(error.message || 'Save failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            try {
                await newsService.delete(id);
                loadData();
            } catch (error) {
                alert(error.message || 'Delete failed');
            }
        }
    };

    return (
        <Container fluid className="p-4 bg-light min-vh-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">News Articles</h2>
                <div className="d-flex gap-2">
                    {isLoading && <div className="spinner-border text-primary spinner-border-sm mt-2" role="status"></div>}
                    <Button
                        variant="primary"
                        className="d-flex align-items-center gap-2 px-4 shadow-sm"
                        onClick={() => { setEditingNews(null); setIsModalOpen(true); }}
                    >
                        <BiPlus size={20} /> Add News
                    </Button>
                </div>
            </div>

            <NewsTable
                data={news}
                onEdit={(item) => { setEditingNews(item); setIsModalOpen(true); }}
                onDelete={handleDelete}
            />

            <NewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingNews={editingNews}
                categories={categories}
                tags={tags}
            />
        </Container>
    );
};

export default NewsPage;