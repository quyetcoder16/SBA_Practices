import React from 'react';
import { Table, Button, Badge, Card } from 'react-bootstrap';
import { BiEdit, BiTrash, BiCheckCircle, BiXCircle } from 'react-icons/bi';

const CategoryTable = ({ data, onEdit, onDelete }) => {
    return (
        <Card className="shadow-sm border-0">
            <Table hover responsive align="middle" className="mb-0">
                <thead className="table-light">
                    <tr>
                        <th className="ps-4">ID</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th className="text-end pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="ps-4 text-muted fw-bold">#{item.CategoryID}</td>
                            <td className="fw-bold text-dark">{item.CategoryName}</td>
                            <td className="text-muted" style={{ maxWidth: '300px' }}>
                                <div className="text-truncate">{item.CategoryDescription || '---'}</div>
                            </td>
                            <td>
                                {item.IsActive === 1 ? (
                                    <Badge pill bg="success-subtle" className="text-success border border-success-subtle px-3 py-2">
                                        <BiCheckCircle className="me-1" /> Active
                                    </Badge>
                                ) : (
                                    <Badge pill bg="danger-subtle" className="text-danger border border-danger-subtle px-3 py-2">
                                        <BiXCircle className="me-1" /> Inactive
                                    </Badge>
                                )}
                            </td>
                            <td className="text-end pe-4">
                                <Button
                                    variant="link"
                                    className="text-primary me-2 p-0 border-0"
                                    onClick={() => onEdit(item)}
                                >
                                    <BiEdit size={18} />
                                </Button>
                                <Button
                                    variant="link"
                                    className="text-danger p-0 border-0"
                                    onClick={() => onDelete(item.id)}
                                >
                                    <BiTrash size={18} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {data.length === 0 && (
                <div className="text-center p-5 text-muted bg-light">
                    No categories found.
                </div>
            )}
        </Card>
    );
};

export default CategoryTable;