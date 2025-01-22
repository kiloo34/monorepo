import React from 'react';
import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { fetchUserData } from '@/apis/userApi';
import { RootState } from '@/store';

const UpdateButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state: RootState) => state.user);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                // onClick={() => dispatch(fetchUserData())}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Fetch User Data'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            {/* {data && <Typography>Welcome, {data}!</Typography>} */}
        </div>
    );
};

export default UpdateButton;