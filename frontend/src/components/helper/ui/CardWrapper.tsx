import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import Rating from "./Rating";
import { motion } from "framer-motion";

interface CardWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

interface ProductCardProps {
  image: string;
  price: number;
}

export const CardWrapper: React.FC<CardWrapperProps> = (props) => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription className=" line-clamp-2">
          {props.description}
        </CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  return (
    <>
      <motion.div whileHover="hover">
        <div className="relative">
          <Image
            src={props.image}
            alt={"Iphone 15 pro max "}
            width={250}
            height={100}
            objectFit="cover"
          />
          <div className="flex items-center justify-between py-2">
            <Rating />
            <p className="text-lg font-semibold">${props.price}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, visibility: "hidden" }}
            variants={{
              hover: {
                opacity: 1,
                y: 0,
                visibility: "visible",
              },
            }}
            transition={{ duration: 0.3, ease: "linear" }}
          >
            <div className="absolute w-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-xl bottom-12">
              <span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width=""
                  version="1"
                  viewBox="0 0 48 48"
                  enable-background="new 0 0 48 48"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#F44336"
                    d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"
                  ></path>
                </svg>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
