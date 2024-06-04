"use client";

import React from "react";
import { CardWrapper, ProductCard } from "@/components/helper/ui/CardWrapper";
import ProductWrapper from "@/components/helper/ui/ProductWrapper";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { slugify } from "@/components/helper/common";
import { ProductProps } from "@/types";

const Featured: React.FC<ProductProps> = (props) => {
  const { user, isAuthenticate } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <section className="mt-12">
      <ProductWrapper title="Featured Products">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <div className="grid grid-cols-3 gap-4 mt-5 w-full">
            {props.data?.map((product, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <CardWrapper
                  title={product.title}
                  description={product.description}
                >
                  <Link
                    href={`/products/${slugify(product.title)}?id=${
                      product.id
                    }`}
                  >
                    <ProductCard
                      image={product.image || ""}
                      price={product.price}
                    />
                  </Link>
                </CardWrapper>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ProductWrapper>
    </section>
  );
};

export default Featured;
