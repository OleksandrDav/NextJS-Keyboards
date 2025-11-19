import { Button } from "@/shared/components/ui";
import { signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";

interface Props {
  className?: string;
}

export const OAuth: React.FC<Props> = ({ className }) => {
  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/", redirect: true });
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/", redirect: true });
  };

  return (
    <div className={className}>
      <Button
        variant="secondary"
        className="gap-2 h-12 p-2 flex-1"
        type="button"
        onClick={handleGithubSignIn}
      >
        <Image 
          className="w-6 h-6" 
          src="https://github.githubassets.com/favicon.ico" 
          alt="Github"
          width={24}
          height={24}
        />
        Github
      </Button>
      <Button
        variant="secondary"
        className="gap-2 h-12 p-2 flex-1"
        type="button"
        onClick={handleGoogleSignIn}
      >
        <Image 
          className="w-6 h-6" 
          src="https://www.google.com/favicon.ico" 
          alt="Google"
          width={24}
          height={24}
        />
        Google
      </Button>
    </div>
  );
};