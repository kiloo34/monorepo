import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig.js';

const COLLECTION_NAME = 'users';

export const findAll = async () => {
    try {
        const usersCol = collection(db, COLLECTION_NAME);
        const userSnapshot = await getDocs(usersCol);
        return userSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error in findAll:', error);
        throw error;
    }
};

export const findById = async (id) => {
    try {
        const userDoc = doc(db, COLLECTION_NAME, id);
        const userSnapshot = await getDoc(userDoc);
        if (!userSnapshot.exists()) {
            return null;
        }
        return {
            id: userSnapshot.id,
            ...userSnapshot.data()
        };
    } catch (error) {
        console.error('Error in findById:', error);
        throw error;
    }
};

export const create = async (userData) => {
    try {
        const newUserRef = doc(collection(db, COLLECTION_NAME));
        console.log('create', userData);
        await setDoc(newUserRef, userData);
        return {
            id: newUserRef.id,
            ...userData
        };
    } catch (error) {
        console.error('Error in create:', error);
        throw error;
    }
};

export const update = async (id, userData) => {
    try {
        const userDoc = doc(db, COLLECTION_NAME, id);
        await setDoc(userDoc, userData, { merge: true });
        return {
            id,
            ...userData
        };
    } catch (error) {
        console.error('Error in update:', error);
        throw error;
    }
};

export const remove = async (id) => {
    try {
        const userDoc = doc(db, COLLECTION_NAME, id);
        await deleteDoc(userDoc);
        return true;
    } catch (error) {
        console.error('Error in remove:', error);
        throw error;
    }
};