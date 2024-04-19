"use client";
import React, { useState } from "react";
import { cssClasses } from "@/lib/cssClasses";
import { Button, Input } from "@nextui-org/react";
import { TbPasswordUser } from "react-icons/tb";
import { SendIcon } from "lucide-react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast("Email is required", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast("Password reset email sent. Check your email.", {
        type: "success",
      });
      router.push("/auth/login");
    } catch (error) {
      toast(
        "Failed to send password reset email. Check your email and try again.",
        { type: "error" }
      );
      console.error("Error sending password reset email", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="max-w-xs mx-auto">
          <div className="text-xl font-bold flex items-center space-x-2">
            <TbPasswordUser size={30} />
            <p>Forgot Password</p>
          </div>
          <form className="mt-4 space-y-6" onSubmit={onSubmit}>
            <div className="mb-4">
              <Input label="Email" value={email} onValueChange={setEmail} />
            </div>
            <Button
              isLoading={loading}
              className={`${cssClasses.secondaryButton} w-full rounded-xl items-center text-sm flex space-x-2 justify-center`}
              type="submit"
            >
              <SendIcon size={15} />
              <p>Send link</p>
            </Button>
          </form>
          <div className="mt-4">
            <p className="text-gray-600">
              Remember your password?{" "}
              <Link href="/auth/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
