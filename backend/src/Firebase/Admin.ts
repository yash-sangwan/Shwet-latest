import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

// Import the service account file
// Note: Make sure your tsconfig.json has "resolveJsonModule": true
import serviceAccountKey from '../../firebase-config.json';

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
});

export default admin;