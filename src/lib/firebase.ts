import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "studio-2311355741-a0fea",
  appId: "1:868434098330:web:f6d356dafc4278e0f74723",
  apiKey: "AIzaSyBlIDjDuLdrRTDe4JA8dxqPLp4LqAwAMPo",
  authDomain: "studio-2311355741-a0fea.firebaseapp.com",
  storageBucket: "studio-2311355741-a0fea.firebasestorage.app",
  messagingSenderId: "868434098330"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-fitnessclubmanag-cfebbbe6-f47b-42df-b93c-150046290b22");

// Secondary app for admin tasks
export const secondaryApp = initializeApp(firebaseConfig, "Secondary");
export const secondaryAuth = getAuth(secondaryApp);
