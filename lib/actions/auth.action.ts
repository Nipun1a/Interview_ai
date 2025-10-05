'use server';

import { db, auth } from "@/Firebase/admin"; // ✅ Import BOTH from admin
import { cookies } from "next/headers";
import { use } from "react";
import { id } from "zod/v4/locales";

const ONE_WEEK = 60 * 60 * 24 * 7;

export interface SignUpParams {
  uid: string;
  name: string;
  email: string;
}

export interface SignInParams {
  email: string;
  idToken: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
}

export async function signUp(params: SignUpParams): Promise<AuthResponse> {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists, please sign in",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (e: any) {
    console.error("Error creating user profile", e);
    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already in use",
      };
    }
    return {
      success: false,
      message: e.message,
    };
  }
}

export async function signIn(params: SignInParams): Promise<AuthResponse> {
  const { email, idToken } = params;

  try {
    const snapshot = await db.collection("users").where("email", "==", email).get();

    if (snapshot.empty) {
      return {
        success: false,
        message: "User does not exist, please sign up",
      };
    }

    await setSession(idToken);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (e: any) {
    console.error("Error signing in", e);
    return {
      success: false,
      message: e.message,
    };
  }
}

export async function setSession(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}





