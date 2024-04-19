'use server'
import { signIn } from "../firebase/config";

 
export async function authenticate(formData) {
  try {
    return await signIn('credentials', formData)
  } catch (error) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}