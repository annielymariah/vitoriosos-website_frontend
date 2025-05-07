import { type ReactNode } from "react";
import "../../global.css";
import { Navbar } from "../Navbar/Navbar";

interface LayoutComponentsProps {
  children: ReactNode;
}

export const LayoutComponents = ({ children }: LayoutComponentsProps) => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-950">
      <Navbar/>
      <main className="flex-1 w-full flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
};
