import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBzDBx0i1SdOspiAoTg2R8tWOQOMlnaejU",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "backend-test-d018b.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "backend-test-d018b",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "backend-test-d018b.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "33204621668",
    appId: process.env.FIREBASE_APP_ID || "1:33204621668:web:4a95ee37f2ec6851b62a71",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-T4ZWF9PRC2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };