import { db, auth } from '../config/firebase';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export async function testFirebaseConnection(): Promise<{ success: boolean; message: string; details?: any }> {
  try {
    // Test Firestore connection
    const testCollection = collection(db, '_test_connection');
    const snapshot = await getDocs(testCollection);

    // Test Auth connection
    let authTestPassed = false;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      authTestPassed = true;
      unsubscribe();
    });

    // Wait a moment for auth state check
    await new Promise(resolve => setTimeout(resolve, 1000));
    unsubscribe();

    return {
      success: true,
      message: 'Firebase connection successful!',
      details: {
        firestoreConnected: true,
        authConnected: authTestPassed,
        projectId: auth.app?.options?.projectId || 'rtanbiriri',
        timestamp: Timestamp.now().toDate().toISOString()
      }
    };
  } catch (error) {
    return {
      success: false,
      message: 'Firebase connection failed',
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Timestamp.now().toDate().toISOString()
      }
    };
  }
}

// Auto-run test when module is imported in development
if (import.meta.env.DEV) {
  testFirebaseConnection().then(result => {
    console.log('🔥 Firebase Test Result:', result);
  });
}