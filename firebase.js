import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBBIwZrz0QBAL1RmeyqIaBK2W0Ccr06-8",
  authDomain: "millyunhas.firebaseapp.com",
  projectId: "millyunhas",
  storageBucket: "millyunhas.firebasestorage.app",
  messagingSenderId: "822777329206",
  appId: "1:822777329206:web:5276641c3451bcce5eca97"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);