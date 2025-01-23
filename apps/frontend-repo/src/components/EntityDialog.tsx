import React, { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
    loading: boolean;
    validationSchema: any;
}

const EntityDialog = <T extends object>({
    open,
    onClose,
    onSave,
    entity,
    fields,
    loading,
    validationSchema,
}: EntityDialogProps<T>) => {
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<T>({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (entity) {
            fields.forEach((field) => {
                if (entity[field.name] !== undefined) {
                    setValue(field.name, entity[field.name] as any);
                }
            });
        } else {
            reset();
        }
    }, [entity, fields, setValue, reset]);


    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    const handleSave = (data: T) => {
        onSave(data);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{entity ? 'Edit Entity' : 'Add Entity'}</DialogTitle>
            <DialogContent>
                {fields.map((field) => (
                    <Controller
                        key={String(field.name)}
                        name={field.name as string}
                        control={control}
                        defaultValue={entity ? entity[field.name] : ''}
                        render={({ field: controllerField }) => (
                            <TextField
                                {...controllerField}
                                label={fields.find((f) => f.name === controllerField.name)?.label || 'Unnamed Field'}
                                type={fields.find((f) => f.name === controllerField.name)?.type || 'text'}
                                fullWidth
                                margin="normal"
                                inputProps={{
                                    readOnly: fields.find((f) => f.name === controllerField.name)?.readonly || false,
                                }}
                                error={!!errors[controllerField.name]}
                                helperText={errors[controllerField.name]?.message}
                            />
                        )}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" disabled={loading}>
                    {loading ? 'Loading...' : 'Cancel'}
                </Button>
                <Button onClick={handleSubmit(handleSave)} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EntityDialog;