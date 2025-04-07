import { NextResponse } from 'next/server';
import { signInUser, getUserByEmail } from '@/lib/firebase-service';

// Verify user credentials using Firebase Authentication
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { valid: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    try {
      // Attempt to sign in with Firebase Authentication
      await signInUser(email, password);
      
      // If we get here, the credentials are valid
      return NextResponse.json({ valid: true });
    } catch (error) {
      // Firebase authentication failed
      console.log('Authentication failed:', error);
      return NextResponse.json({ valid: false });
    }
  } catch (error) {
    console.error('Password verification error:', error);
    return NextResponse.json(
      { valid: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}