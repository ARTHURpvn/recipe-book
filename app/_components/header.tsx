"use client";
import { SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getUserId } from "../_utils/getUserId";
import { useEffect, useState } from "react";

const Header = () => {
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setUserId(userId as string);
    };

    fetchUserId();
  });
  return (
    <header className="flex w-full py-4 px-6 border-b-[1px] justify-between">
      <div className="flex gap-12 items-center justify-center">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <nav className="flex gap-4">
          <Link href="/"> Inicio </Link>
          <Link href="/recipes"> Receitas</Link>
          <Link href="/"> Minhas Receitas</Link>
        </nav>
      </div>
      {!userId ? (
        <SignUpButton />
      ) : (
        <div className="flex items-center py-1 pr-1 rounded-full bg-white/5 border border-white/10">
          <UserButton
            showName
            appearance={{ variables: { spacingUnit: "2rem" } }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
