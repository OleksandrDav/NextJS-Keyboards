import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";

interface Props {
  onClickSignIn?: () => void;
  hasSearch?: boolean;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn, hasSearch }) => {
  const { data: session, status } = useSession();

  const getDisplayName = () => {
    if (!session?.user.firstName || session.user.firstName.length >= 10) {
      return "Profile";
    }

    const lastNameInitial = session.user.lastName[0] !== "*" ? " " + session.user.lastName[0] : "";

    return session.user.firstName + lastNameInitial;
  };

  return (
    <div className={className}>
      {!session ? (
        <Button
          loading={status === "loading"}
          onClick={onClickSignIn}
          variant="outline"
          className={cn("flex items-center gap-1 p-2 md:p-2.5", { "w-[90px]": status === "loading" })}
        >
          <User size={16} />
          <span className={cn({ "hidden md:inline": hasSearch })}>Sign In</span>
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2 p-3 md:px-4 md:py-2">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.firstName || "User"}
                width={16}
                height={16}
                className="rounded-full"
              />
            ) : (
              <CircleUser size={16} />
            )}
            <span className={cn({ "hidden md:inline": hasSearch })}>{getDisplayName()}</span>
          </Button>
        </Link>
      )}
    </div>
  );
};
