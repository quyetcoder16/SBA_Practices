import React from 'react'
import { Badge, Button, Card, Table } from 'react-bootstrap'
import { BiCheckCircle, BiEdit, BiTrash, BiXCircle } from 'react-icons/bi';

export default function UserTable({ data, onEdit, onDelete }) {
    return (
        <Card className='shadow-sm border-0'>
            <Table hover responsive align='middle'>
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className="text-end pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => {
                        return (<tr key={item.AccountID}>
                            <td className="fw-bold text-dark">{item.AccountName}</td>
                            <td className="text-muted" >
                                <div className="text-truncate">{item.AccountEmail}</div>
                            </td>
                            <td>
                                {item.AccountRole === 1 ? (
                                    <Badge pill bg="success-subtle" className="text-success border border-success-subtle px-3 py-2">
                                        Admin
                                    </Badge>
                                ) : (
                                    <Badge pill bg="danger-subtle" className="text-danger border border-danger-subtle px-3 py-2">
                                        Staff
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
                        </tr>)
                    })
                    }

                </tbody>

            </Table>
            {data.length === 0 && (
                <div className="text-center p-5 text-muted bg-light">
                    No User found.
                </div>
            )}
        </Card>
    )
}
