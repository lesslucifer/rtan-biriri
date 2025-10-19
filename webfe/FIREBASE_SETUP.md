# Firebase Setup Guide

This project has been configured with Firebase for authentication and Firestore database operations.

## Prerequisites

1. A Firebase project (create one at https://console.firebase.google.com/)
2. Firebase configuration credentials

## Setup Instructions

### 1. Environment Variables

Copy the `.env.example` file to `.env` and fill in your Firebase configuration:

```bash
cp .env.example .env
```

Update the `.env` file with your Firebase project credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

### 2. Get Firebase Configuration

1. Go to your Firebase Console
2. Click on the gear icon ⚙️ and select "Project settings"
3. In the "General" tab, scroll down to "Your apps" section
4. Click on the "</>" icon to add a web app
5. Register your app and copy the configuration object
6. Use the values from this configuration to populate your `.env` file

### 3. Enable Authentication Methods

1. In Firebase Console, go to "Authentication" > "Sign-in method"
2. Enable the authentication methods you want to use:
   - Email/Password
   - Google
   - GitHub
   - etc.

### 4. Set Up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose your preferred security rules (start with test mode for development)
4. Select your database location

## Usage

### Authentication

```typescript
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, signInWithEmail, signOut } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmail('user@example.com', 'password');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}
    </div>
  );
}
```

### Firestore Operations

```typescript
import { useFirebase } from './hooks/useFirebase';

interface MyDocument {
  id?: string;
  title: string;
  content: string;
}

function MyComponent() {
  const { data, loading, error, create, update, delete: deleteDoc } = useFirebase<MyDocument>({
    collectionName: 'my_collection'
  });

  const handleCreate = async () => {
    try {
      await create({ title: 'New Document', content: 'Hello World' });
    } catch (error) {
      console.error('Create failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.map(doc => (
        <div key={doc.id}>
          <h3>{doc.title}</h3>
          <p>{doc.content}</p>
        </div>
      ))}
      <button onClick={handleCreate}>Create Document</button>
    </div>
  );
}
```

### Direct Service Usage

For more complex operations, you can use the services directly:

```typescript
import { createFirebaseService } from './services/firebaseService';
import { authService } from './services/authService';

// Firestore operations
const service = createFirebaseService('my_collection');
const documents = await service.getAll();
const doc = await service.getById('doc_id');
await service.create({ title: 'New Doc' });

// Authentication
const user = await authService.signInWithEmail('email', 'password');
await authService.signOut();
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never expose service account files** (like the one mentioned in your path `./webfe/.key/rtanbiriri-firebase-adminsdk-fbsvc-35bc7062f3.json`) to the frontend. These are for server-side use only.

2. **Use Firebase Security Rules** to protect your data:
   - Set up proper Firestore security rules
   - Configure authentication requirements for sensitive operations
   - Validate data on the client side

3. **Environment Variables** prefixed with `VITE_` are exposed to the client. Only include non-sensitive configuration data.

## Testing

A test component `FirebaseTest.tsx` has been created to verify your Firebase integration. You can import and use it in your app:

```typescript
import { FirebaseTest } from './components/FirebaseTest';

function App() {
  return (
    <div>
      <FirebaseTest />
    </div>
  );
}
```

This component demonstrates:
- User authentication (sign up/in/out)
- Firestore CRUD operations
- Real-time data updates
- Error handling

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your API key is correctly set in the `.env` file
   - Ensure the `.env` file is in the project root
   - Restart your development server after changes

2. **"Permission denied" errors**
   - Check your Firestore security rules
   - Ensure the user is properly authenticated
   - Verify the collection/document paths

3. **"Collection not found"**
   - Create the collection in Firebase Console first
   - Or let Firebase auto-create it when you add the first document

### Getting Help

- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Review the [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks) for additional patterns
- Ensure your Firebase project has the necessary APIs enabled

## Next Steps

1. Set up proper Firestore security rules for production
2. Implement proper error handling and loading states
3. Add form validation for user inputs
4. Consider implementing offline persistence
5. Set up proper logging and monitoring