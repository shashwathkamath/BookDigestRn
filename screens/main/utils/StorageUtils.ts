import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/User';

export const saveUserToStorage = async (user: User): Promise<void> => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('User saved successfully to local storage');
    } catch (error) {
        console.error('Error saving user to local storage:', error);
    }
};

export const getUserFromStorage = async (): Promise<User | null> => {
    try {
        const user = await AsyncStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error retrieving user from local storage:', error);
        return null;
    }
};

export const clearUserFromStorage = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem('user');
        console.log('User cleared from local storage');
    } catch (error) {
        console.error('Error clearing user from local storage:', error);
    }
};