"use client";

import React from "react";
import Image from "next/image";
import axios from "@/lib/axiosConfig";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "@/types/index";

const ProductViewPage = () => {
  const searchParam = useSearchParams();

  const id = searchParam.get("id");

  async function getData() {
    try {
      const res = await axios({
        url: `/products?id=${id}`,
        method: "GET",
      });

      const data = res?.data;
      return data;
    } catch (error) {
      return error;
    }
  }

  const { isFetching, isLoading, data } = useQuery({
    queryKey: [id],
    queryFn: getData,
  });
  // console.log(data.data);
  if (isFetching) {
    return <span>Loading...</span>;
  }
  const product: ProductType = data?.data;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div className="lg:flex lg:items-start">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={500}
            className="object-cover object-center rounded-lg"
          />
        </div>
        <div className="mt-8 lg:mt-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {product.title}
          </h1>
          <p className="mt-4 text-xl text-gray-900 dark:text-gray-100">
            ${product.price}
          </p>

          <p className="mt-4 text-gray-700 dark:text-gray-200">
            {product.description}
          </p>
          <div className="mt-6">
            <h3 className="text-sm text-gray-600 dark:text-gray-200">Color</h3>
            <div className="flex items-center mt-2">
              <span className="w-8 h-8 bg-orange-300 rounded-full cursor-pointer border border-gray-300"></span>
              <span className="w-8 h-8 bg-orange-400 rounded-full cursor-pointer border border-gray-300"></span>
              <span className="w-8 h-8 bg-orange-500 rounded-full cursor-pointer border border-gray-300"></span>
              <span className="w-8 h-8 bg-orange-600 rounded-full cursor-pointer border border-gray-300"></span>
              <span className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer border border-gray-300"></span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm text-gray-600 dark:text-gray-200">Size</h3>
            <div className="flex items-center mt-2">
              <span className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer">
                M
              </span>
              <span className="ml-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer">
                S
              </span>
              <span className="ml-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer">
                L
              </span>
              <span className="ml-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer">
                SL
              </span>
              <span className="ml-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer">
                XL
              </span>
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <button className="px-4 py-2 border border-gray-300 rounded-md">
              -
            </button>
            <input
              type="number"
              value="2"
              className="mx-2 w-12 text-center border border-gray-300 rounded-md"
            />
            <button className="px-4 py-2 border border-gray-300 rounded-md">
              +
            </button>
          </div>
          <div className="mt-6 flex space-x-4">
            <button className="p-2 border border-gray-300 rounded-full">
              {/* Replace with your icons */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button className="p-2 border border-gray-300 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12H9m6 0a3 3 0 00-6 0h6z"
                />
              </svg>
            </button>
            <button className="p-2 border border-gray-300 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.034A7.5 7.5 0 118.25 6.75"
                />
              </svg>
            </button>
            <button className="p-2 border border-gray-300 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h18v18H3V3z"
                />
              </svg>
            </button>
          </div>
          <div className="mt-4 ">
            <div className="grid grid-cols-4 gap-2">
              <Image
                src="https://template.hasthemes.com/hurst-v1/hurst/img/single-product/medium/3.jpg" // Replace with your image paths
                alt="Product image 1"
                width={150}
                height={150}
                className="object-cover object-center rounded-lg"
              />
              <Image
                src="https://template.hasthemes.com/hurst-v1/hurst/img/single-product/medium/3.jpg" // Replace with your image paths
                alt="Product image 2"
                width={150}
                height={150}
                className="object-cover object-center rounded-lg"
              />
              <Image
                src="https://template.hasthemes.com/hurst-v1/hurst/img/single-product/medium/3.jpg" // Replace with your image paths
                alt="Product image 3"
                width={150}
                height={150}
                className="object-cover object-center rounded-lg"
              />
              <Image
                src="https://template.hasthemes.com/hurst-v1/hurst/img/single-product/medium/3.jpg" // Replace with your image paths
                alt="Product image 4"
                width={150}
                height={150}
                className="object-cover object-center rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage;
