import { AppRouter } from "./routes/AppRouter";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    fetch("http://localhost:8080/api/usuarios")
      .then((response) => response.json())
      .then((data) => console.log("Usuários recebidos:", data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  }, []);

  return <AppRouter />;
};