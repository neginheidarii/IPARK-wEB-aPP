import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebase";

export async function signInCredentials(email, password, role = "owner") {
  try {
      const userCreds = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCreds.user.getIdToken();

      const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken, role }),
      });
      const resBody = await response.json();
      if (response.ok && resBody.ok) {
          return true;
      } else return false;
  } catch (error) {
      console.error("Error signing in with email and password", error);
      return false;
  }
}

export async function signUpCredentials(email, password) {
  try {
      const userCreds = await createUserWithEmailAndPassword(auth, email, password);
      return userCreds?.user;
  } catch (error) {
      console.error("Error signing up with email and password", error);
      return false;
  }
}

export async function signOut() {
  try {
    await auth.signOut();
    
  const response = await fetch("/api/auth/sign-out", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resBody = (await response.json());
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing out with Google", error);
    return false;
  }
}