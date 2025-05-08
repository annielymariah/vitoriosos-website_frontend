import { type ReactNode } from "react";
import "../../global.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

interface LayoutComponentsProps {
  children: ReactNode;
}

export const LayoutComponents = ({ children }: LayoutComponentsProps) => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-500 bg-cover bg-center"
      style={{
        backgroundImage:
          " url('src/assets/bg_texture.jpg')",
        backgroundBlendMode: "color-burn",
      }}
    >
      <Navbar/>
      <main className="flex-1 w-full flex items-center justify-center p-4">
        {children}
      </main>
      <Footer/>
    </div>
  );
};
