

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface ListDataProps<T> {
    data: T[];
    fields: { label: string; name: keyof T }[];
    renderActions: (item: T) => React.ReactNode;
}

// const ListData = <T extends object>({ data, fields, renderActions }: ListDataProps<T>) => {
//     if (data.length === 0) {
//         return <div>No data available</div>;
//     }

//     return (
//         <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         {fields.map((field) => (
//                             <TableCell key={field.name as string}>{field.label}</TableCell>
//                         ))}
//                         <TableCell>Actions</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {data.map((item) => (
//                         <TableRow key={String(item[fields[0].name])}>
//                             {fields.map((field) => (
//                                 <TableCell key={field.name as string}>{item[field.name] as any}</TableCell>
//                             ))}
//                             <TableCell>{renderActions(item)}</TableCell> {/* Custom action rendering */}
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

const ListData: React.FC<ListDataProps> = ({ data, fields, renderActions }) => {
    const renderTableHeaders = () => (
        <TableRow>
            {fields.map((field) => (
                <TableCell key={field.name}>{field.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
        </TableRow>
    );

    const renderTableRows = () => (
        data.map((item) => (
            <TableRow key={String(item[fields[0].name])}>
                {fields.map((field) => (
                    <TableCell key={field.name}>{item[field.name]}</TableCell>
                ))}
                <TableCell>{renderActions(item)}</TableCell>
            </TableRow>
        ))
    );

    if (data.length === 0) {
        return <div>No data available</div>;
    }

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
