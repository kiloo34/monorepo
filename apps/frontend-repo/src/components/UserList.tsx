import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface ListDataProps {
    data: any[];
    fields: { name: string; label: string }[];
    renderActions: (item: any) => React.ReactNode;
}

const ListData: React.FC<ListDataProps> = ({ data, fields, renderActions }) => {
    const renderTableHeaders = () => (
        <TableRow>
            <TableCell>#</TableCell> {/* Index column header */}
            {fields.map((field) => (
                <TableCell key={field.name}>{field.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
        </TableRow>
    );

    const renderTableRows = () => (
        data.map((item, index) => (
            <TableRow key={String(item[fields[0].name])}>
                <TableCell>{index + 1}</TableCell> {/* Displaying the index as row number */}
                {fields.map((field) => (
                    <TableCell key={field.name}>{item[field.name]}</TableCell>
                ))}
                <TableCell>{renderActions(item)}</TableCell>
            </TableRow>
        ))
    );

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>{renderTableHeaders()}</TableHead>
                <TableBody>{renderTableRows()}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default ListData;
