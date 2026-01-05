"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { DehydratedState } from "@tanstack/react-query";
import { SearchBar } from "../features/search";
import {
  ProductList,
  useProducts,
  ProductsHydrationBoundary,
} from "../features/products";

interface HomeClientProps {
  dehydratedState?: DehydratedState;
}

const HomeClient = ({ dehydratedState }: HomeClientProps) => {
  return (
    <ProductsHydrationBoundary dehydratedState={dehydratedState}>
      <HomeContentWrapper />
    </ProductsHydrationBoundary>
  );
};

const HomeContentWrapper = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { filteredProducts, isLoading, error } = useProducts({ searchQuery });
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (slugOrId: string) => {
    // Navegar a la página del producto usando el slug
    router.push(`/producto/${slugOrId}`);
  };

  const handleContactSeller = (linkSeller: string) => {
    router.push(`${linkSeller}`);
  };

  return (
    <div className="w-full max-w-310 p-4 mx-auto">
      <SearchBar
        query={searchQuery}
        onSearchChange={handleSearchChange}
        className=""
        isDisabled={true}
      />
      <ProductList
        products={filteredProducts}
        isLoading={isLoading}
        error={error}
        searchQuery={searchQuery}
        actions={{
          first: {
            onClick: handleViewDetails,
            label: "Ver detalles",
            icon: "info",
            backgroundColor: "BLUE",
            tooltip: "Ver detalles del producto",
          },
          second: {
            onClick: handleContactSeller,
            label: "Contactar al vendedor",
            backgroundColor: "GREEN",
          },
        }}
      />
    </div>
  );
};

export default HomeClient;
