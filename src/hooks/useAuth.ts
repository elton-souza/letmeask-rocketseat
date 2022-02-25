import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  // criando hook pra acessar os dados do context sem precisar importar useContext e AuthContext toda vez
  const hook = useContext(AuthContext);

  return hook;
}
