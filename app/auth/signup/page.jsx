"use client";
import React, { useEffect, useState } from "react";
import { cssClasses } from "@/lib/cssClasses";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { FaWpforms } from "react-icons/fa6";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { signUpCredentials } from "@/lib/firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const css = {
  error: "text-red-500 text-xs",
};

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) return;
      setLoading(true);
      const signedUpUser = await signUpCredentials(email, password);
      if (!signedUpUser) {
        toast("Failed to sign up. Check your credentials and try again.", {
          type: "error",
        });
        setLoading(false);
        return;
      }
      await setDoc(doc(db, "Owners", signedUpUser?.uid), {
        firstName,
        lastName,
        email,
        uid: signedUpUser?.uid,
      });
      toast("Profile created successfully!", { type: "success" });
      router.push("/auth/login");
    } catch (error) {
      console.error("Error signing up with email and password", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errors = {};
    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (!repeatPassword) errors.repeatPassword = "Repeat password is required";
    if (password !== repeatPassword)
      errors.repeatPassword = "Passwords do not match";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    setErrors({});
  }, [firstName, lastName, email, password, repeatPassword]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="max-w-xs mx-auto">
          <div className="text-2xl font-bold mb-10 flex space-x-2 items-center">
            <FaWpforms />
            <p>Sign Up</p>
          </div>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4 flex space-x-4">
              <div className="w-full">
                <Input
                  className={`rounded-xl shadow`}
                  type="text"
                  label="First Name"
                  value={firstName}
                  onValueChange={setFirstName}
                  isInvalid={
                    errors?.firstName != null && errors?.firstName != ""
                  }
                />
                <label className={css.error}>{errors?.firstName}</label>
              </div>
              <div className="w-full">
                <Input
                  className={`rounded-xl shadow`}
                  label="Last Name"
                  value={lastName}
                  onValueChange={setLastName}
                  isInvalid={errors?.lastName != null && errors?.lastName != ""}
                />
                <label className={css.error}>{errors?.lastName}</label>
              </div>
            </div>
            <div className="mb-4">
              <Input
                className={`rounded-xl shadow`}
                label="Email"
                value={email}
                onValueChange={setEmail}
                isInvalid={errors?.email != null && errors?.email != ""}
              />
              <label className={css.error}>{errors?.email}</label>
            </div>
            <div className="mb-4">
              <Input
                className={`rounded-xl shadow`}
                type="password"
                label="Password"
                value={password}
                onValueChange={setPassword}
                isInvalid={errors?.password != null && errors?.password != ""}
              />
              <label className={css.error}>{errors?.password}</label>
            </div>
            <div className="mb-4">
              <Input
                className={`rounded-xl shadow`}
                type="password"
                label="Repeat password"
                value={repeatPassword}
                onValueChange={setRepeatPassword}
                isInvalid={
                  errors?.repeatPassword != null && errors?.repeatPassword != ""
                }
              />
              <label className={css.error}>{errors?.repeatPassword}</label>
            </div>
            <Button
                isLoading={loading}
              className={`${cssClasses.secondaryButton} w-full rounded-xl`}
              style={{ width: "full" }}
              type="submit"
            >
              Sign up
            </Button>
          </form>
          <div className="mt-4 text-gray-600 text-sm font-light space-x-2 flex">
            <p>Already have an account?</p>
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
