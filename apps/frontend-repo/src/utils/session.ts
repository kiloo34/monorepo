export const hasSession = (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
};
