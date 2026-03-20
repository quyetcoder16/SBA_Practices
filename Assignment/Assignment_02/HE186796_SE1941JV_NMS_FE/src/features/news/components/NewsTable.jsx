import React from 'react';
import { Table, Button, Badge, Card } from 'react-bootstrap';
import { BiEdit, BiTrash, BiCalendar } from 'react-icons/bi';

const NewsTable = ({ data, onEdit, onDelete }) => {
    if (!Array.isArray(data)) {
        console.error("NewsTable received non-array data:", data);
        data = [];
    }
    return (
        <Card className="shadow-sm border-0">
            <Table hover responsive align="middle" className="mb-0">
                <thead className="table-light">
                    <tr>
                        <th className="ps-4">ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Tags</th>
                        <th>Status</th>
                        <th className="text-end pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.newsArticleId}>
                            <td className="ps-4 text-muted fw-bold">#{item.newsArticleId}</td>
                            <td>
                                <div className="fw-bold text-dark">{item.newsTitle}</div>
                                <div className="text-muted small d-flex align-items-center gap-1">
                                    <BiCalendar size={14} />
                                    {item.createdDate ? new Date(item.createdDate).toLocaleDateString() : 'N/A'}
                                </div>
                            </td>
                            <td>
                                {item.categoryName
                                    ? <Badge bg="info" className="bg-opacity-10 text-info border border-info-subtle px-2 py-1">{item.categoryName}</Badge>
                                    : <span className="text-muted">—</span>
                                }
                            </td>
                            <td className="text-muted small">{item.createdByName || '—'}</td>
                            <td>
                                <div className="d-flex flex-wrap gap-1">
                                    {item.tags && item.tags.slice(0, 3).map(tag => (
                                        <Badge key={tag.tagId} bg="secondary" className="fw-normal">{tag.tagName}</Badge>
                                    ))}
                                    {item.tags && item.tags.length > 3 && (
                                        <Badge bg="light" className="text-dark fw-normal">+{item.tags.length - 3}</Badge>
                                    )}
                                </div>
                            </td>
                            <td>
                                {item.newsStatus ? (
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
                                    onClick={() => onDelete(item.newsArticleId)}
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