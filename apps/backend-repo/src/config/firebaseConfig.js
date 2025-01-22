import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "your_api_key",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your_auth_domain",
    projectId: process.env.FIREBASE_PROJECT_ID || "your_project_id",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your_storage_bucket",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "your_messaging_sender_id",
    appId: process.env.FIREBASE_APP_ID || "your_app_id",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "your_measurement_id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };