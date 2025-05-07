import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_vitoriosos_movimento.png";
import menuIcon from "../../assets/menu.svg";
import { Link } from "react-router-dom";

interface NavLinkProps {
  href: string;
  text: string;
  onClick?: () => void;
}

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthPage = ["/cadastro", "/login"].includes(location.pathname);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  const handleLoginClick = () => {
    toggleSidebar();
    navigate("/login");
  };

  const NavLink: React.FC<NavLinkProps> = ({ href, text, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      className="hover:text-green-500 text-white transition-colors duration-200 text-lg py-2"
    >
      {text}
    </a>
  );

  const Separator: React.FC = () => (
    <span className="font-extrabold text-purple-400">▪</span>
  );

  return (
    <>
      <nav className="bg-gradient-to-r from-black to-purple-950 flex justify-center items-center text-white w-full">
        <div className="w-[96%] flex justify-between">
          {/* Logo */}
          <div>
            <Link to="/">
              <img src={logo} alt="Logo" className="h-20" />
            </Link>
          </div>

          {/* Links */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-6 font-inter">
              <NavLink href="/" text="início" />
              <Separator />
              <NavLink href="/cursos" text="cursos" />
              <Separator />
              <NavLink href="/eventos" text="eventos" />
            </div>
          )}

          {/* Área do usuário / Menu mobile */}
          <div className="flex items-center gap-4">
            {!isAuthPage && isLoggedIn && (
              <div className="hidden md:flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center">
                  U
                </span>
                <span>Minha Conta</span>
              </div>
            )}

            {/* Botão do menu Mobile */}
            <button onClick={toggleSidebar}>
              <img src={menuIcon} alt="Menu" className="h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Barra lateral */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-gradient-to-b from-black to-purple-950 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-8">
            <img src={logo} alt="Logo" className="h-12" />
            <button onClick={toggleSidebar} className="text-white text-2xl">
              ×
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col gap-4 font-prompt text-white">
            <NavLink href="/" text="início" onClick={toggleSidebar} />
            <NavLink href="/cursos" text="cursos" onClick={toggleSidebar} />
            <NavLink href="/eventos" text="eventos" onClick={toggleSidebar} />
          </nav>

          {/* Seção de Login */}
          <div className="border-t border-purple-700 pt-4">
            {isLoggedIn ? (
              <>
                <NavLink
                  href="/perfil"
                  text="Meu Perfil"
                  onClick={toggleSidebar}
                />
                <button
                  onClick={() => {
                    toggleLogin();
                    toggleSidebar();
                  }}
                  className="w-full text-left text-white hover:text-green-500 transition-colors pt-2"
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className="w-full text-left text-white hover:text-green-500 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};