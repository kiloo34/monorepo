import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface EntityDialogProps<T> {
    open: boolean;
    onClose: () => void;
    onSave: (updatedEntity: T) => void;
    entity?: T;
    fields: Array<{
        name: keyof T;
        label: string;
        type: 'text' | 'number' | 'email';
        readonly?: boolean;
    }>;
}

const EntityDialog = <T extends object>({
    open,
    onClose,
    onSave,
    entity,
    fields,
}: EntityDialogProps<T>) => {
    const [entityData, setEntityData] = useState<T | null>(null);

    console.log(fields);

    useEffect(() => {
        if (entity) {
            setEntityData(entity);
        }
    }, [entity]);

    const handleChange = (field: keyof T, value: string) => {
        if (entityData) {
            setEntityData({ ...entityData, [field]: value });
        }
    };

    const handleSave = () => {
        if (entityData) {
            onSave(entityData);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{entity ? 'Edit Entity' : 'Add Entity'}</DialogTitle>
            <DialogContent>
                {entityData &&
                    fields.map((field) => {
                        console.log(field.readonly);
                        return (
                            <TextField
                                key={field.name as string}
                                label={field.label}
                                type={field.type}
                                value={entityData[field.name] as any}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                fullWidth
                                margin="normal"
                                inputProps={{
                                    readOnly: field.readonly || false,
                                }}
                            />
                        )
                    })}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EntityDialog;
