"use client";

import React, { useState } from "react";
import Header from "./Header";
import { Providers } from "@/app/provider";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Providers>
        <main>
          <div>
            <Header />
            <section>{children}</section>
          </div>
        </main>
      </Providers>
    </>
  );
};

export default PageLayout;
