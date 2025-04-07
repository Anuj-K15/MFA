import { NextResponse } from 'next/server';

// This is a simple in-memory user store for demonstration purposes
// In a real application, you would use a database
export const users: { id: string; name: string; email: string; password: string }[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    password: 'password', // In a real app, this would be hashed
  },
];

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // In a real application, you would hash the password before storing
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password, // This would be hashedPassword in a real app
    };

    // Add to our in-memory store
    users.push(newUser);

    // Return success but don't include password
    return NextResponse.json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// This is for demonstration purposes only
// In a real application, you would not expose user data like this
export async function GET() {
  const safeUsers = users.map(({ password, ...user }) => user);
  return NextResponse.json(safeUsers);
}