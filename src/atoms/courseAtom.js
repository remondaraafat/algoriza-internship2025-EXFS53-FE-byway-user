import { atom } from 'jotai';

// Course data atom
export const courseDataAtom = atom(null);

// Lectures data atom
export const lecturesDataAtom = atom(null);

// Loading states
export const courseLoadingAtom = atom(false);
export const lecturesLoadingAtom = atom(false);

// Error states
export const courseErrorAtom = atom(null);
export const lecturesErrorAtom = atom(null);

// Current course ID atom
export const currentCourseIdAtom = atom(null);

