import React from "react";

interface ProductWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const ProductWrapper: React.FC<ProductWrapperProps> = (props) => {
  return (
    <section className=" w-full mt-5">
      <div className="text-center my-8">
        <h2 className="text-2xl font-bold">{props.title}</h2>
        <div className="mt-2 h-1 w-12 bg-red-500 mx-auto"></div>
      </div>
      <p>{props.description}</p>

      <div className="max-w-7xl mx-auto container">{props.children}</div>
    </section>
  );
};

export default ProductWrapper;
