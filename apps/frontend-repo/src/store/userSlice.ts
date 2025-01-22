import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '@/apis/userApi';
import { AppDispatch } from '@/store';
import { User } from '@my-app/entities';

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
            state.loading = false;
        },
        fetchUserError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserError } = userSlice.actions;

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    dispatch(fetchUserStart());
    try {
        const users = await getUsers();
        dispatch(fetchUserSuccess(users));
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'An unknown error occurred';
        dispatch(fetchUserError(errorMessage));
    }
};

export default userSlice.reducer;
