# Firebase Integration Setup

## Overview
This project now uses Firebase for authentication and database storage. The integration allows for:
- User registration with email and password
- User login with email and password
- Storing user data in Firestore database
- OAuth providers (Google, Facebook, GitHub) continue to work through NextAuth.js

## Setup Instructions

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Enable Authentication with Email/Password method
4. Create a Firestore database in test mode

### 2. Get Firebase Configuration
1. In your Firebase project, go to Project Settings
2. Scroll down to "Your apps" section and click the web icon (</>) to add a web app
3. Register your app with a nickname (e.g., "MFA App")
4. Copy the Firebase configuration object (apiKey, authDomain, etc.)

### 3. Configure Environment Variables
1. Create a `.env.local` file in the root of your project
2. Add the Firebase configuration variables from the `.env.local.example` file
3. Fill in the values with your Firebase project details

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 4. Restart Your Development Server
After setting up the environment variables, restart your development server:

```bash
npm run dev
```

## How It Works

### User Registration
When a user registers:
1. The form data is sent to the `/api/auth/register` endpoint
2. Firebase creates a new user with email/password
3. User data is stored in Firestore database
4. User is automatically signed in

### User Login
When a user logs in:
1. Credentials are verified against Firebase Authentication
2. NextAuth.js creates a session for the user
3. User is redirected to the dashboard

### Database Structure
User data is stored in Firestore with the following structure:

```
users/
  {userId}/
    id: string
    name: string
    email: string
    createdAt: timestamp
```

## Troubleshooting

### Authentication Issues
- Ensure your Firebase project has Email/Password authentication enabled
- Check that your environment variables are correctly set
- Look for errors in the browser console or server logs

### Database Issues
- Verify that Firestore is set up in your Firebase project
- Check security rules to ensure they allow read/write operations
- Ensure your application has the correct permissions