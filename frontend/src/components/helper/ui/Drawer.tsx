import React from "react";
import { motion } from "framer-motion";

type DrawerProps = {
  children: React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = (props) => {
  return (
    <>
      <motion.div
        initial={{ x: "100%" }} // Start fully off-screen to the right
        animate={{ x: 0 }} // Move to its natural position
        exit={{ x: "100%" }} // Move back off-screen when exiting
        transition={{ duration: 0.4, ease: [0.42, 1, 0.58, 1] }} // Custom cubic-bezier for smoothness
        className="fixed w-[30rem] h-screen top-0 right-0 dark:bg-gray-900 shadow-lg z-50"
      >
        <div className="w-full h-full relative">
          <span className="absolute top-5 right-5 text-xl">X</span>
          {props.children}
        </div>
      </motion.div>
    </>
  );
};

export default Drawer;
