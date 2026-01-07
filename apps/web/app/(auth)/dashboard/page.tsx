import React from "react";
import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "../../shared/lib/react-query";
import { getUserIdFromSession } from "../../shared/lib/auth";
import { prefetchUser } from "../../shared/lib/prefetchUser";
import DashboardClient from "./page.client";

export default async function DashboardPage(): Promise<React.ReactElement> {
  const queryClient = getQueryClient();

  await prefetchUser(queryClient);

  const userId = await getUserIdFromSession();
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2">Bienvenido a tu panel de control</p>
      <DashboardClient
        dehydratedState={dehydratedState}
        userId={userId ?? ""}
      />
    </div>
  );
}
