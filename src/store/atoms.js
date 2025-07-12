import { atom } from 'jotai';

export const secretKeyAtom = atom(localStorage.getItem('secretKey') || null);
export const roleAtom = atom(localStorage.getItem('role') || null);
