export function showLoader(message?: string): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.set("loading", "true");
  if (message) {
    url.searchParams.set("message", encodeURIComponent(message));
  }
  window.history.pushState({}, "", url.toString());
}

export function hideLoader(): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.delete("loading");
  url.searchParams.delete("message");
  window.history.pushState({}, "", url.toString());
}

export function useLoaderWithRouter(router: any, message?: string) {
  return {
    showLoader: () => {
      const params = new URLSearchParams(router.query || {});
      params.set("loading", "true");
      if (message) {
        params.set("message", encodeURIComponent(message));
      }
      router.push({ query: params.toString() }, undefined, { shallow: true });
    },
    hideLoader: () => {
      const params = new URLSearchParams(router.query || {});
      params.delete("loading");
      params.delete("message");
      router.push({ query: params.toString() }, undefined, { shallow: true });
    },
  };
}
