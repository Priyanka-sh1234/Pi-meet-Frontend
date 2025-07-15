import { atom } from 'jotai';

// Store token
export const secretKeyAtom = atom('');

// Store role
export const roleAtom = atom('');

// Store full user data (id, name, email, etc.)
export const userAtom = atom(null);
