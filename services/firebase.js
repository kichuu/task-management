import admin from 'firebase-admin';
import serviceAccount from '../firebase-adminsdk.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://task-manage-6d6d5-default-rtdb.asia-southeast1.firebasedatabase.app', // Realtime Database URL
});

const db = admin.database(); // Initialize Realtime Database
const ref = db.ref('tasks'); // Access Realtime Database reference for 'tasks'

// Example: Fetching tasks from Realtime Database
ref.once('value', (snapshot) => {
  const tasks = snapshot.val();
  console.log(tasks);
});


export { db };
