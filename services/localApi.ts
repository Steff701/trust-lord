import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

const USER_KEY = 'trustlord_user';
const TENANT_LEASE_KEY = 'trustlord_tenant_lease';

export const localApi = {
  // Generic operations
  setItem: async (key: string, value: any): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving item with key ${key} to AsyncStorage:`, error);
      throw error;
    }
  },

  getItem: async (key: string): Promise<any | null> => {
    try {
      const itemString = await AsyncStorage.getItem(key);
      return itemString ? JSON.parse(itemString) : null;
    } catch (error) {
      console.error(`Error getting item with key ${key} from AsyncStorage:`, error);
      return null;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item with key ${key} from AsyncStorage:`, error);
      throw error;
    }
  },

  // Specific operations (can now use generic ones internally)
  saveUser: async (user: User): Promise<void> => {
    return localApi.setItem(USER_KEY, user);
  },

  getUser: async (): Promise<User | null> => {
    return localApi.getItem(USER_KEY);
  },

  clearUser: async (): Promise<void> => {
    return localApi.removeItem(USER_KEY);
  },

  saveTenantLease: async (leaseData: any): Promise<void> => {
    return localApi.setItem(TENANT_LEASE_KEY, leaseData);
  },

  getTenantLease: async (): Promise<any | null> => {
    return localApi.getItem(TENANT_LEASE_KEY);
  },

  clearTenantLease: async (): Promise<void> => {
    return localApi.removeItem(TENANT_LEASE_KEY);
  },
};