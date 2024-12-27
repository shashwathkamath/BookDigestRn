// userStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/User';

const USER_STORAGE_KEY = '@user_info';

export const storeUserData = async (userData: User): Promise<void> => {
    try {
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
        console.error('Error storing user data:', error);
    }
};

export const getUserData = async (): Promise<User | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(USER_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error reading user data:', error);
        return null;
    }
};
