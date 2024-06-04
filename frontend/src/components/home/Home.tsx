import React from "react";

import { Carousel, CarouselItem } from "@/components/helper/Features/Carousel";
import dynamic from "next/dynamic";
import axios from "@/lib/axiosConfig";

async function getData() {
  try {
    const res = await axios({
      url: "/products",
      method: "GET",
    });

    const data = res?.data;
    return data;
  } catch (error) {
    return error;
  }
}

const Home = async () => {
  const data = await getData();

  if (!data) {
    return <span>No data found</span>;
  }

  const Featured = dynamic(() => import("./segments/Featured"), {
    loading: () => <span>Loading</span>,
  });

  return (
    <main className=" w-full h-full flex flex-col items-center justify-center">
      <Carousel>
        <CarouselItem>
          <div className="w-full h-full  bg-blue-500 flex items-center justify-center">
            <h2 className="text-white text-2xl">Slide 1</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="w-full h-[50vh] bg-red-500 flex items-center justify-center">
            <h2 className="text-white text-2xl">Slide 2</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="w-full h-[50vh] bg-green-500 flex items-center justify-center">
            <h2 className="text-white text-2xl">Slide 3</h2>
          </div>
        </CarouselItem>
      </Carousel>

      <section>{<Featured data={data?.data} />}</section>
    </main>
  );
};

export default Home;
