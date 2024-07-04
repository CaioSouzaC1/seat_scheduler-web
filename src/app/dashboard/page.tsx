"use client";
import withAuth from "@/components/hoc";
import { signOut, useSession } from "next-auth/react";

function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return;
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
