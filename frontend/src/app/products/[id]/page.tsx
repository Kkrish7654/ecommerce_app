import React from "react";
import PageLayout from "@/components/core/Layout";
import ProductViewPage from "@/components/products/view/Index";
import axios from "@/lib/axiosConfig";

export default async function page() {
  return (
    <PageLayout>
      <ProductViewPage />
    </PageLayout>
  );
}
