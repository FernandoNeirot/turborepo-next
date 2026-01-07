import React from "react";
import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "../shared/lib/react-query";
import HomeClient from "./page.client";

export const dynamic = "force-dynamic";

export default async function Home(): Promise<React.ReactElement> {
  const queryClient = getQueryClient();

  const dehydratedState = dehydrate(queryClient);

  return <HomeClient dehydratedState={dehydratedState} />;
}
