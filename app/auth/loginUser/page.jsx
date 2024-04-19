"use client";
import React, { useState } from "react";
import { signInCredentials } from "@/lib/firebase/auth";
import { toast } from "sonner";
import { cssClasses } from "@/lib/cssClasses";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";

function LoginPage() {
  const [email, setEmail] = useState("altalaie@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await signInCredentials(email, password, "user");
    if (!success) {
      toast("Failed to sign in. Check your credentials and try again.", {
        type: "error",
      });
      setError("Failed to sign in. Check your credentials and try again.");
      setLoading(false);
      return;
    }
    router.replace("/dashboard/user");
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="max-w-xs w-80 mx-auto">
          <h2 className="text-2xl font-bold flex space-x-2 items-center">
            <FaSignInAlt />
            <p>Login</p>
          </h2>
          <form className="mt-7" onSubmit={handleLogin}>
            <div className="mb-4">
              <Input
                label="Email"
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1`}
                onValueChange={setEmail}
                value={email}
              />
            </div>
            <div className="mb-8">
              <Input
                label="Password"
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1 mb-2`}
                type="password"
                onValueChange={setPassword}
                value={password}
              />
              <Link
                  href="/auth/forgot-password"
                  className="text-blue-500 hover:underline text-gray-600 text-sm font-light"
                >
                  forgot password?
                </Link>
            </div>
            <Button
              isLoading={loading}
              className={cssClasses.secondaryButton + " flex space-x-1"}
              type="submit"
            >
              <FaSignInAlt />
              <span>Login</span>
            </Button>
            <div className="mt-4 text-gray-600 text-sm font-light space-x-2 flex">
                <p>Don't have an account?</p>
                <Link
                  href="/auth/signup"
                  className="text-blue-500 hover:underline"
                >
                  Sign up
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
