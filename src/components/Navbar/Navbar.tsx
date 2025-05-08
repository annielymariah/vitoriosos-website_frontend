import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_vitoriosos_movimento.png";

import { Link } from "react-router-dom";

interface NavLinkProps {
  href: string;
  text: string;
  onClick?: () => void;
}

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthPage = ["/cadastro", "/login"].includes(location.pathname);

  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const NavLink: React.FC<NavLinkProps> = ({ href, text, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      className="hover:text-[#31D92B] text-gray-300 transition-colors duration-200 text-lg font-light py-2"
    >
      {text}
    </a>
  );

  const Separator: React.FC = () => <span></span>;

  return (
    <nav
      className="fixed top-0 left-0 z-50 bg-black flex justify-center items-center text-white w-full border-b border-transparent bg-clip-border shadow-md"
      style={{
        borderImage: "linear-gradient(to right, #31D92B, #6829c6) 1",
      }}
    >
      <div className="w-[96%] flex justify-between">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-14 w-20 object-cover" />
          </Link>
        </div>

        {!isAuthPage && (
          <div className="hidden md:flex items-center gap-4 font-inter">
            <NavLink href="/" text="início" />
            <Separator />
            <NavLink href="/" text="quem somos" />
            <Separator />
            <NavLink href="/" text="missão" />
            <Separator />
            <NavLink href="/cursos" text="cursos" />
            <Separator />
            <NavLink href="/eventos" text="eventos" />
          </div>
        )}

        <div className="flex items-center gap-4">
          {!isAuthPage && (
            <>
              {isLoggedIn ? (
                <div className="hidden md:flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white">
                    U
                  </span>
                  <span>Minha Conta</span>
                </div>
              ) : (
                <button
                  className="flex items-center font-inter justify-center px-4 py-1 bg-transparent border border-[#6829c6] hover:border-[#31D92B] text-gray-300 font-normal rounded-md hover:text-gray-100 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                  onClick={handleLoginClick}
                >
                  Entrar
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
