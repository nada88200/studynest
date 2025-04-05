import React from "react";
import { FaAward } from "react-icons/fa";

export const About = () => {
  return (
   <div className="pt-16 pb-16">
    {/* define grid */}
    <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
    {/* 1st part */}
    <div>
        <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center flex-col"> 
                <FaAward/>
            </div>

        </div>
    </div>
    {/* 2nd part */}
    <div></div>

    </div>
   </div>
  );
}