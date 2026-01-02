"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader } from "@fernando_neirot2/ui";

function LoaderContent() {
  const searchParams = useSearchParams();
  const isLoading = searchParams.get("loading") === "true";
  const message = searchParams.get("message")
    ? decodeURIComponent(searchParams.get("message") || "")
    : "Cargando...";

  return <Loader isLoading={isLoading} message={message} />;
}

export function GlobalLoader() {
  return (
    <Suspense fallback={null}>
      <LoaderContent />
    </Suspense>
  );
}
