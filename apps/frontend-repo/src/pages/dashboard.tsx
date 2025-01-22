import React, { useEffect, useState } from 'react';
import { fetchUsers } from '@/store/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import AuthenticatedLayout from '@/layouts/authenticated';
import ListData from '@/components/ListData';
import { User } from '@/store/userSlice';
import { Button } from '@mui/material';
import EntityDialog from '@/components/EntityDialog';

const DashboardPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state: RootState) => state.user);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedUser(null);
    };

    const handleSaveUser = (updatedUser: User) => {
        console.log('Updated User:', updatedUser);
        handleDialogClose();
    };

    const userFields = [
        { name: 'id', label: 'Id', type: 'text', readonly: true },
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'age', label: 'Age', type: 'number' },
        { name: 'email', label: 'Email', type: 'email' },
    ];

    const renderUserActions = (user: User) => (
        <Button variant="contained" color="primary" onClick={() => handleEditUser(user)}>
            Edit
        </Button>
    );

    return (
        <AuthenticatedLayout>
            <h2>Welcome to the Dashboard</h2>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}

            {!loading && !error && (
                <ListData
                    data={users}
                    fields={userFields}
                    renderActions={renderUserActions}
                />
            )}

            {selectedUser && (
                <EntityDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    onSave={handleSaveUser}
                    entity={selectedUser}
                    fields={userFields}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default DashboardPage;