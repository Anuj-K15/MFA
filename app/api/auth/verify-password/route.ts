import { NextResponse } from 'next/server';
import { users } from '../register/route';

// In a real application, this would query your database and use proper password hashing
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

    // Use the imported users array directly
    // In a real app, this would be a database query
    
    // Find the user
    const user = users.find((user: any) => user.email === email);
    if (!user) {
      // Don't reveal that the user doesn't exist for security reasons
      return NextResponse.json({ valid: false });
    }

    // In a real application, you would use bcrypt.compare or similar
    // to compare the password with the stored hash
    // const isValid = await bcrypt.compare(password, user.password);
    
    // For this demo, we'll do a simple check
    // This is NOT secure and should NOT be used in production
    const isValid = password === 'password'; // Only for demo purposes

    return NextResponse.json({ valid: isValid });
  } catch (error) {
    console.error('Password verification error:', error);
    return NextResponse.json(
      { valid: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}