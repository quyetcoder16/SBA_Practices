import React from 'react';
import { Table, Button, Badge, Card } from 'react-bootstrap';
import { BiEdit, BiTrash, BiCalendar } from 'react-icons/bi';

const NewsTable = ({ data, categories, onEdit, onDelete }) => {
    const getCategoryName = (catId) => {
        const category = categories.find(c => c.CategoryID === catId);
        return category ? category.CategoryName : 'Unknown';
    };

    return (
        <Card className="shadow-sm border-0">
            <Table hover responsive align="middle" className="mb-0">
                <thead className="table-light">
                    <tr>
                        <th className="ps-4">ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th className="text-end pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="ps-4 text-muted fw-bold">#{item.NewsArticleID}</td>
                            <td>
                                <div className="fw-bold text-dark">{item.NewsTitle}</div>
                                <div className="text-muted small d-flex align-items-center gap-1">
                                    <BiCalendar size={14} /> {new Date(item.CreatedDate).toLocaleDateString()}
                                </div>
                            </td>
                            <td>
                                <Badge bg="info" className="bg-opacity-10 text-info border border-info-subtle px-2 py-1">
                                    {getCategoryName(item.CategoryID)}
                                </Badge>
                            </td>
                            <td>
                                {item.NewsStatus === 1 ? (
                                    <Badge pill bg="success-subtle" className="text-success border border-success-subtle">Published</Badge>
                                ) : (
                                    <Badge pill bg="secondary-subtle" className="text-secondary border border-secondary-subtle">Draft</Badge>
                                )}
                            </td>
                            <td className="text-end pe-4">
                                <Button
                                    variant="link"
                                    className="p-1 me-2 text-primary border-0"
                                    onClick={() => onEdit(item)}
                                >
                                    <BiEdit size={20} />
                                </Button>
                                <Button
                                    variant="link"
                                    className="p-1 text-danger border-0"
                                    onClick={() => onDelete(item.id)}
                                >
                                    <BiTrash size={20} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {data.length === 0 && (
                <div className="text-center p-5 text-muted bg-light">No news articles found.</div>
            )}
        </Card>
    );
};

export default NewsTable;