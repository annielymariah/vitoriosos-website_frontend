import type { InputHTMLAttributes } from "react";
import { useState } from "react";

interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  error,
  value,
  type,
  className = "",
  placeholder = " ",
  showPasswordToggle = type === "password",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isFilled = typeof value === "string" && value.length > 0;

  return (
    <div>
      <div className={`relative mb-[16px] ${className}`}>
        <input
          id={id}
          className={`peer w-full h-[45px] bg-transparent px-[5px] text-base text-[#0c0c0c] font-inter
                   focus:outline-none ${error ? "border-red-500" : ""}
                   placeholder-transparent ${
                     showPasswordToggle ? "pr-10" : ""
                   }`}
          value={value}
          placeholder={placeholder}
          type={showPasswordToggle && showPassword ? "text" : type}
          {...props}
        />

        {/* Label flutuante */}
        <span
          className={`absolute block w-full h-full top-[2px] left-0 pointer-events-none font-inter
                    before:content-[''] before:block before:absolute before:bottom-[-2px] before:left-0 
                    before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-[#6829c6] before:to-[#31d92b] 
                    before:transition-all before:duration-400 peer-focus:before:w-full
                    after:content-[attr(data-label)] after:block after:w-full after:absolute
                    after:left-0 after:pl-[5px] after:text-base after:text-[#999999]
                    after:leading-[1.2] after:transition-all after:duration-400
                    ${
                      isFilled
                        ? "after:top-[-16px] after:text-sm"
                        : "after:top-4"
                    }
                    peer-focus:after:top-[-16px] peer-focus:after:text-sm`}
          data-label={label}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <span className="text-xl">👁️</span>
            ) : (
              <span className="text-xl">👁️‍🗨️</span>
            )}
          </button>
        )}
      </div>
      {error && <p className=" mb-6 text-base text-red-600">{error}</p>}
    </div>
  );
};
