export type UserRole = 'worker' | 'doctor' | 'admin';

export interface User {
  id: string;
  username: string;
  password: string; // In a real app, this would be hashed
  role: UserRole;
  name: string;
}

// Initial mock users
export const users: User[] = [
  {
    id: '1',
    username: 'worker1',
    password: 'password123', // This will be hashed during the first login attempt or pre-hashed
    role: 'worker',
    name: 'John Doe',
  },
  {
    id: '2',
    username: 'doctor1',
    password: 'password123',
    role: 'doctor',
    name: 'Dr. Smith',
  },
  {
    id: '3',
    username: 'admin1',
    password: 'password123',
    role: 'admin',
    name: 'System Admin',
  },
];
