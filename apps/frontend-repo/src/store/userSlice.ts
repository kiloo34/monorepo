
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers, createUser, updateUser, deleteUser } from '@/apis/userApi';
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
        startLoading(state) {
            state.loading = true;
            state.error = null;
        },
        errorLoading(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        fetchSuccess(state, action: PayloadAction<User[]>) {
            state.loading = false;
            state.users = action.payload;
        },
        addItem(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
            state.loading = false;
        },
        updateItem(state, action: PayloadAction<User>) {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...action.payload };
            }
            state.loading = false;
        },
        removeItem(state, action: PayloadAction<string>) {
            console.log('Before:', state.users); // Log the current state
            state.users = state.users.filter((user) => user.id !== action.payload);
            console.log('After:', state.users); // Log the updated state
            state.loading = false;
        },
    },
});

export const {
    startLoading,
    errorLoading,
    fetchSuccess,
    addItem,
    updateItem,
    removeItem,
} = userSlice.actions;

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
        const users = await getUsers();
        dispatch(fetchSuccess(users));
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'An unknown error occurred';
        dispatch(errorLoading(errorMessage));
    }
};

export const createUserData = (user: User) => async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
        const newUser = await createUser(user);
        dispatch(addItem(newUser));
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'An unknown error occurred';
        dispatch(errorLoading(errorMessage));
    }
};


export const updateUserData = (id: string, user: User) => async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
        const updatedUser = await updateUser(id.userId, id.user);
        dispatch(updateItem({ id, ...updatedUser }));
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'An unknown error occurred';
        dispatch(errorLoading(errorMessage));
    }
};

export const deleteUserData = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
        await deleteUser(id.id);
        dispatch(removeItem(id.id))
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'An unknown error occurred';
        dispatch(errorLoading(errorMessage));
    }
};

export default userSlice.reducer;