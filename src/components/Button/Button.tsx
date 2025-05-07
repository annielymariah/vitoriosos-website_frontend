import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <div className="w-full">
      <button
        className={`text-base border-none rounded-[10px] text-white uppercase 
                   flex justify-center items-center w-full h-[50px] bg-[#0c0c0c]
                   hover:bg-[#31d92b] hover:text-[#0c0c0c] transition-all duration-400
                   leading-[1.2] ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};