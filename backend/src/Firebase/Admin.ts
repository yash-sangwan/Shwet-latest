import dotenv from 'dotenv'
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

// Import the service account file
// Note: Make sure your tsconfig.json has "resolveJsonModule": true
// import serviceAccountKey from '../../firebase-config.json';

dotenv.config();

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID as string,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
};

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export default admin;