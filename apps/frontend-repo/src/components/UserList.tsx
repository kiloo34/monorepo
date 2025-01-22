// src/components/UserList.tsx

import React, { useState } from 'react';
import { User } from '@my-app/entities';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import EntityDialog from '@/components/EntityDialog';

interface UserListProps {
    users: User[];
    updateUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, updateUser }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedUser(null);
    };

    const handleSaveUser = (updatedUser: User) => {
        updateUser(updatedUser);
        handleDialogClose();
    };

    const userFields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'age', label: 'Age', type: 'number' },
        { name: 'email', label: 'Email', type: 'email' },
    ];

    if (users.length === 0) {
        return <div>No users available</div>;
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.age}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* UserDialog for editing */}
            <EntityDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onSave={handleSaveUser}
                entity={selectedUser}
                fields={userFields}
            />
        </>
    );
};

export default UserList;
