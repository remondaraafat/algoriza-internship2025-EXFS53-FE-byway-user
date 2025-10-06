// src/atoms/authAtoms.js
import { atom } from "jotai";

// One atom for all form fields
export const formAtom = atom({
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// Auth token atom
export const authAtom = atom(
  typeof window !== "undefined" ? localStorage.getItem("token") || null : null
);

//User info atom (to store decoded username/email)
export const userAtom = atom(
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null
);
