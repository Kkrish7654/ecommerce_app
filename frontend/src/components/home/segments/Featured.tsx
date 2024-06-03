import React from "react";
import { CardWrapper, ProductCard } from "@/components/helper/ui/CardWrapper";
import ProductWrapper from "@/components/helper/ui/ProductWrapper";
import { motion } from "framer-motion";

const Featured = () => {
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
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <CardWrapper
                  title={`Iphone 15 pro max ${index}`}
                  description={`Description for product ${index}`}
                >
                  <ProductCard
                    image="https://template.hasthemes.com/hurst-v1/hurst/img/product/5.jpg"
                    price={50}
                  />
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
