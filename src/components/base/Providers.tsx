"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  children: ReactNode;
  session: Session | null;
}

export default function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </SessionProvider>
  );
}
