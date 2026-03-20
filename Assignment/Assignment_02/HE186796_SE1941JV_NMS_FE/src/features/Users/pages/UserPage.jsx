import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';

import { BiPlus } from 'react-icons/bi';
import { Button, Container } from 'react-bootstrap';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';

const UserPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await userService.getAll();
            setAccounts(data || []);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };

    const handleSave = async (formData) => {
        try {
            await userService.save(formData);
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            alert(error.message || 'Save failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await userService.delete(id);
                loadData();
            } catch (error) {
                alert(error.message || 'Delete failed');
            }
        }
    };

    return (
        <Container fluid className='p-4 bg-light min-vh-100'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2 className='fw-bold text-dark'>System Accounts</h2>
                <Button
                    variant="primary"
                    className="d-flex align-items-center gap-2 px-4 shadow-sm"
                    onClick={() => { setCurrentAccount(null); setIsModalOpen(true); }}
                >
                    <BiPlus size={20} /> New User
                </Button>
            </div>

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