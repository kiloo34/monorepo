import React, { useEffect, useState } from 'react';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AuthenticatedLayout from '@/layouts/authenticated';
import ListData from '@/components/ListData';
import { User, fetchUsers, createUserData, deleteUserData, updateUserData } from '@/store/userSlice';
import { Button, ButtonGroup, Snackbar } from '@mui/material';
import EntityDialog from '@/components/EntityDialog';
import * as yup from 'yup';

const userSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    age: yup.number().required('Age is required').min(18, 'Age must be at least 18'),
    email: yup.string().email('Invalid email').required('Email is required'),
});

const DashboardPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state: RootState) => state.user);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setDialogOpen(true);
        setIsCreating(false);
    };

    const handleCreateUser = () => {
        setSelectedUser(null);
        setDialogOpen(true);
        setIsCreating(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedUser(null);
    };

    const handleSaveUser = (user: Partial<User>) => {
        const userId = user.id ?? ''
        const action = user.id
            ? updateUserData({ userId, user })
            : createUserData({ user });

        dispatch(action)
            .then((response) => {
                setSnackbarOpen(true)
                setSnackbarMessage('User saved successfully!');
                handleDialogClose();
            })
            .catch((error) => {
                setSnackbarMessage(`Error: ${error.message}`);
                console.error('Failed to save user:', error.message);
                handleDialogClose();
            });
    };

    const handleDeleteUser = (id: string) => {
        dispatch(deleteUserData(id))
            .then((response) => {
                console.error(response);
                setSnackbarMessage('User Deleted successfully!');
                setSnackbarOpen(true)
            })
            .catch((error) => {
                console.error('Failed to delete user:', error.message);
                setSnackbarMessage('Failed to delete user:', error.message);
                setSnackbarOpen(true)
            });
    };

    const userFields = selectedUser
        ? [
            { name: 'id', label: 'Id', type: 'text', readonly: !isCreating },
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'age', label: 'Age', type: 'number' },
            { name: 'email', label: 'Email', type: 'email' },
        ]
        : [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'age', label: 'Age', type: 'number' },
            { name: 'email', label: 'Email', type: 'email' },
        ];

    const renderUserActions = (user: User) => (
        <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button color="primary" onClick={() => handleEditUser(user)}>Edit</Button>
            <Button color="error" onClick={() => handleDeleteUser(user)}>{loading ? 'Loading...' : 'Delete'}</Button>
        </ButtonGroup>
    );

    return (
        <AuthenticatedLayout>
            <h2>Welcome to the Dashboard</h2>

            {!loading && <Button variant="contained" color="primary" onClick={handleCreateUser}>
                Create User Data
            </Button>}


            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}

            {!loading && !error && (
                <ListData
                    data={users}
                    fields={userFields}
                    renderActions={renderUserActions}
                />
            )}

            <EntityDialog<User>
                open={dialogOpen}
                onClose={handleDialogClose}
                onSave={handleSaveUser}
                entity={selectedUser}
                fields={userFields}
                loading={loading}
                validationSchema={userSchema}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </AuthenticatedLayout>
    );
};

export default DashboardPage;