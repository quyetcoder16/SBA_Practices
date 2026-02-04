import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';

import { BiSearch, BiPlus } from 'react-icons/bi';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';


const UserPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const data = await userService.getAll();
            setAccounts(data);
        };

        loadData();
    }, []);

    const loadData = async () => {
        const data = await userService.getAll();
        setAccounts(data);
    };



    const onSearch = async () => {
        const data = await userService.search(searchTerm);
        setAccounts(data);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    const handleSave = async (formData) => {
        await userService.save(formData);
        setIsModalOpen(false);
        loadData();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await userService.delete(id);
            loadData();
        }
    };

    return (
        <Container fluid className='p-4'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2 className='fw-bold'>Users</h2>
                <Button
                    variant="primary"
                    className="d-flex align-items-center gap-2"
                    onClick={() => { setCurrentAccount(null); setIsModalOpen(true); }}
                >
                    <BiPlus size={20} /> New User
                </Button>
            </div>
            <Row className='mb-4'>
                <Col md={5}>
                    <InputGroup className='shadow-sm'>
                        <InputGroup.Text className="bg-white border-end-0">
                            <BiSearch className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                            className="border-start-0 ps-0"
                            placeholder="Search User ..."
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

            <UserTable
                data={accounts}
                onEdit={(item) => {
                    setCurrentAccount(item);
                    setIsModalOpen(true);
                }}
                onDelete={handleDelete}
            />

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingUser={currentAccount}
            />

        </Container >
    );
};

export default UserPage;