"use client";
import withAuth from "@/components/hoc";
import { signIn, signOut, useSession } from "next-auth/react";

function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <p>You are not logged in.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <p>Dashboard</p>
      <p>Welcome, {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export default withAuth(DashboardPage);
