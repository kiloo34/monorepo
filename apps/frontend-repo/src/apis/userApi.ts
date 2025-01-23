import apiClient from '@/apis/apiClient';
import { User } from '@my-app/entities';

export const getUsers = async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
};

export const createUser = async (user: Partial<User>): Promise<User> => {
    console.log('createUser');
    console.log(user.user);
    const response = await apiClient.post('/users', user.user);
    console.log('response');
    console.log(response);
    return response.data;
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
    const response = await apiClient.put(`/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
};
