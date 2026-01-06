import React from "react";
import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "../shared/lib/react-query";
import { prefetchProducts } from "../features/products";
import HomeClient from "./page.client";

export const dynamic = "force-dynamic";

export default async function Home(): Promise<React.ReactElement> {
  const queryClient = getQueryClient();

  prefetchProducts(queryClient).catch((error) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Home] Prefetch falló:', error);
    }
  });

  const dehydratedState = dehydrate(queryClient);

  return <HomeClient dehydratedState={dehydratedState} />;
}
